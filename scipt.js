let map;
const PONDICHERRY_UNIVERSITY_BOUNDS = {
  north: 12.0364005,
  south: 12.013273,
  east: 79.8615224,
  west: 79.8432404,
};
const PONDICHERRY_CENTER = { lat: 12.0273, lng: 79.8520 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: PONDICHERRY_CENTER,
    restriction: {
      latLngBounds: PONDICHERRY_UNIVERSITY_BOUNDS,
      strictBounds: true, // Set to true to enforce strict boundaries
    },
    zoom: 16, // Higher zoom level for a university campus
    mapTypeId: 'satellite' // For satellite view
  });
}

window.initMap = initMap;
