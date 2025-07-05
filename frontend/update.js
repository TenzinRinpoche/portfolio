// fetch the coordinates of ISS

function updateISSCoordinate() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(res => res.json())
    .then(data => {
      document.getElementById('iss-lat').textContent = `Lat: ${data.latitude.toFixed(2)}°`;
      document.getElementById('iss-lon').textContent = `Lon: ${data.longitude.toFixed(2)}°`;
      document.getElementById('iss-alt').textContent = `Alt: ${data.altitude.toFixed(1)} km`;
    })
    .catch(err => {
      console.error('Failed to fetch ISS data', err);
    });
}

// Update every 5 seconds
setInterval(updateISSCoordinate, 500);

// Call once immediately
updateISSCoordinate();