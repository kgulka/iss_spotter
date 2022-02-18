const { nextISSTimesForMyLocation } = require('./iss_promised.js');


nextISSTimesForMyLocation()
  .then((passTimes) => {
    //printPassTimes(passTimes);
    console.log(passTimes);
  });
 // .catch((error) => {
 //   console.log("It didn't work: ", error.message);
 // });

