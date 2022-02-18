const request = require('request-promise-native');

const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = 'https://freegeoip.app/json/' + ip + "?apikey=XXXXXXXXXXXXXX";
  return request(url);
};

const fetchISSFlyOverTimes = function(body){
  const lat = JSON.parse(body).latitude;
  const long = JSON.parse(body).longitude;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const data = {};
      data.response = JSON.parse(body).response;
      return data.response;
    });
};

module.exports = { nextISSTimesForMyLocation };


//const data = {};
//data.latitude = JSON.parse(body).latitude;
//data.longitude = JSON.parse(body).longitude;