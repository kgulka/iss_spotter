/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = function(callback) {
  // this will use the request to fetch IP address from JSON API
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    let ip = null;
    if (!response) {
      const errorMsg = "Error connecting to IP web api";
      callback(Error(errorMsg), null);
      return;
    }
    if (body === "[]" || body === "{}") {
      const errorMsg = "Error connecting to IP web api";
      callback(Error(errorMsg), null);
      return;
    }
    if (response.statusCode >= 300 && response.statusCode < 200) {
      const errorMsg = `Error connecting to IP web api. Code: ${response.statusCode}`;
      callback(Error(errorMsg), null);
      return;
    }
    const data = JSON.parse(body);
    ip = data["ip"];
    callback(error, ip);
    return;
  });
};

//this function takes an ip address as an input and
//returns the lat and long for that ip
const fetchCoordsByIP = function(ip, callback) {
  let url = 'https://freegeoip.app/json/' + ip + "?apikey=XXXXXXXXXXXXXX";
  request(url, (error, response, body) => {
    if (!response) {
      const errorMsg = "Error connecting to location web api";
      callback(Error(errorMsg), null);
      return;
    }
    if (body === "[]" || body === "{}") {
      const errorMsg = "Error connecting to location web api";
      callback(Error(errorMsg), null);
      return;
    }
    if (response.statusCode >= 300 || response.statusCode < 200) {
      const errorMsg = `Error connecting to location web api. Code: ${response.statusCode}`;
      callback(errorMsg, null);
      return;
    }
    const data = {};
    data.latitude = JSON.parse(body).latitude;
    data.longitude = JSON.parse(body).longitude;
    callback(error, data);
    return;
  });

};


//this function takes an ip address as an input and
//returns the lat and long for that ip
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (!response) {
      const errorMsg = "Error connecting to iss web api";
      callback(Error(errorMsg), null);
      return;
    }
    if (body === "[]" || body === "{}") {
      const errorMsg = "Error connecting to iss web api";
      callback(Error(errorMsg), null);
      return;
    }
    if (response.statusCode >= 300 || response.statusCode < 200) {
      const errorMsg = `Error connecting to iss web api. Code: ${response.statusCode}`;
      callback(errorMsg, null);
      return;
    }
    const data = {};
    data.response = JSON.parse(body).response;
    callback(error, data.response);
    return;
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      fetchISSFlyOverTimes(data, (error, passes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        callback(error, passes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
