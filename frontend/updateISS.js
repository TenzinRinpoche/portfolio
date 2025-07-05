// fetch the coordinates of ISS
/*******  12d13b7c-6937-4726-b1dd-68202e4d31dd  *******/

let positionVector = null;

function updateISSCoordinate() {
  fetch('https://api.wheretheiss.at/v1/satellites/25544') // fetch the API data
    .then(res => res.json())
    .then(resData => {
      // use the parsed data
      
      const lat = resData.latitude.toFixed(2);
      const long = resData.longitude.toFixed(2);
      const altModifier = 1/100
      const alt = resData.altitude.toFixed(1)*altModifier;
      const latRad = lat*Math.PI/180;
      const longRad = long*Math.PI/180;
      const X = alt*Math.cos(latRad)*Math.sin(longRad);
      const Y = alt*Math.cos(latRad)*Math.cos(longRad);
      const Z = alt*Math.sin(latRad);

      document.getElementById('x').textContent = `X: ${X}°`;
      document.getElementById('y').textContent = `Y: ${Y}°`;
      document.getElementById('z').textContent = `X: ${Z}°`;
      positionVector = new THREE.Vector3(X, Y, Z);

      document.getElementById('iss-lat').textContent = `Lat: ${resData.latitude.toFixed(2)}°`;
      document.getElementById('iss-lon').textContent = `Lon: ${resData.longitude.toFixed(2)}°`;
      document.getElementById('iss-alt').textContent = `Alt: ${resData.altitude.toFixed(1)} km`;
    })
    .catch(function(err) {
      console.error('Failed to fetch ISS data', err);
    });
}

// Update every 5 seconds
setInterval(updateISSCoordinate, 100);

// Call once immediately
updateISSCoordinate();
