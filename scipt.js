

let map;
const PONDICHERRY_UNIVERSITY_BOUNDS = {
  north: 12.0364005,
  south: 12.013273,
  east: 79.8615224,
  west: 79.8432404,
};
const PONDICHERRY_CENTER = { lat: 12.030723, lng: 79.858859 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
      center: PONDICHERRY_CENTER,
      restriction: {
          latLngBounds: PONDICHERRY_UNIVERSITY_BOUNDS,
          strictBounds: true,
      },
      zoom: 16,
      mapTypeId: 'satellite'
  });


  const bambooMarker = new google.maps.Marker({
    position: { lat: 12.030723, lng: 79.858859 },
    map: map,
    title: "Bamboo Tree",  // Tooltip when hovering
    icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green marker for plants
    }
});

const infoWindow = new google.maps.InfoWindow({
    content: "<b>Bamboo Tree</b><br>Native species near the main library."
});

bambooMarker.addListener("click", () => {
    infoWindow.open(map, bambooMarker);
});


}


window.initMap = initMap;

