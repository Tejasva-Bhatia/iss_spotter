const request = require('request');


const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {

    if (error) {
      callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {

  const apiUrl = `http://ipwho.is/${ip}`;
  request(apiUrl, (error, response, body) => {

    if (error) {
      callback(error, null);
    }
    
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    callback(null, { latitude: data.latitude, longitude: data.longitude });

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  const apiUrl = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(apiUrl, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, flyOverTimes);
      });
    });
  });

};

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

module.exports = { nextISSTimesForMyLocation };