
// const { fetchMyIP , fetchCoordsByIP , fetchISSFlyOverTimes , nextISSTimesForMyLocation} = require('./iss');

const {nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });


// const TestIp = "8.8.4.4";
// fetchCoordsByIP(TestIp,(error,Coordinates) =>{
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , Coordinates);
// });

// const coords = { latitude: '26.0112014', longitude: '-80.1494901' };
// fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
//   if (error) {
//     console.error('Error fetching ISS flyover times:', error);
//   } else {
//     console.log('ISS flyover times:', flyOverTimes);
//   }
// });

const printResult = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printResult(passTimes);
});