//We'll be making API requests to three different services to solve this problem.
//Fetch our IP Address
//Fetch the geo coordinates (Latitude & Longitude) for our IP
//Fetch the next ISS flyovers for our geo coordinates
// This app will output the pass times for the ISS for your IP's location.

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work", error);
  }
  for (let pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }  
});

