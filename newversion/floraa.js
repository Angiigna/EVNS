

let map;
let currentPlantLat = 12.9716;
let currentPlantLng = 77.5946;
const markers = {}; // Global marker storage

const mapContainer = document.querySelector('.map-container'); // Get the map container

// Initialize the map
function initMap() {
  map = L.map('flora-map').setView([12.01676, 79.85325], 16);

  // Define different tile layers
  let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenTopoMap contributors'
  });

  let carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
  });

  let stamenToner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    attribution: '&copy; Stamen Design'
  });

  let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics'
  });

  // Add default layer
  osm.addTo(map);

  // Base layers object
  let baseMaps = {
    "OpenStreetMap": osm,
    "OpenTopoMap": topo,
    "Carto Light": carto,
    "Stamen Toner": stamenToner,
    "Satellite": satellite
  };

  // Add layer control to map
  L.control.layers(baseMaps).addTo(map);

  // ✅ Add markers here after map is initialized
  for (const plantId in plantDetailsData ) {
    const plant = plantDetailsData[plantId];
    if (plant && plant.lat && plant.lng) {
      const marker = L.marker([plant.lat, plant.lng]).addTo(map)
        .bindPopup(`<strong>${plant.name}</strong><br>${plant.location}`);
      markers[plantId] = marker;
    } else {
      console.warn(`Plant data missing lat/lng for ID: ${plantId}`);
    }
  }
}

function focusPlant(plantId) {
  const marker = markers[plantId];
  if (marker) {
    map.setView(marker.getLatLng(), 17);
    marker.openPopup();
  } else {
    alert("Plant not found on map!");
  }
}

// Function to show location on the map in the modal
function showLocationOnMap() {
  map.setView([currentPlantLat, currentPlantLng], 17);
  L.marker([currentPlantLat, currentPlantLng]).addTo(map)
    .bindPopup("<b>Plant Name</b><br>Location Description")
    .openPopup();
}

// Show the modal with the plant's details
function showDetails(plantId) {
  const plantDetails = plantDetailsData[plantId];
  if (!plantDetails) {
    alert("Plant details not found!");
    return;
  }

  document.getElementById('plant-name').innerText = plantDetails.name;
  document.getElementById('plant-description').innerText = plantDetails.description;
  document.getElementById('plant-image').src = plantDetails.imageUrl;
  document.getElementById('plant-origin').innerText = plantDetails.origin;
  document.getElementById('plant-location').innerText = `Location: ${plantDetails.location}`;
  document.getElementById('scientific-name').innerText = `Scientific Name: ${plantDetails.scientificName}`;

  currentPlantLat = plantDetails.lat;
  currentPlantLng = plantDetails.lng;

  document.getElementById('plantModal').style.display = 'block';
  mapContainer.style.display = 'none'; // Hide the map container
}

// Close the modal
function closeModal() {
  document.getElementById('plantModal').style.display = 'none';
  mapContainer.style.display = 'block'; // Show the map container again
}

// Function to filter plant cards
function filterPlants() {
  let searchQuery = document.querySelector('.search-bar').value.toLowerCase();
  let plantCards = document.querySelectorAll('.flora-card');

  plantCards.forEach(card => {
    let plantName = card.querySelector('h3').textContent.toLowerCase();

    if (plantName.includes(searchQuery)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// "View Details" button click event
document.querySelectorAll('.view-details-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const plantId = e.target.getAttribute('data-plant-id');
    showDetails(plantId);
  });
});

// "View on Map" button click event
// "View on Map" button click event
// Store markers along with their categories
  // key: plantId, value: { marker, category }

// Store markers along with their categories
 // key: plantId, value: { marker, category }

// Initialize the markers on the map
function initializeMarkers() {
  // Clear all markers from the map before re-adding
  Object.keys(markers).forEach(plantId => {
    const markerData = markers[plantId];
    const marker = markerData.marker;
    
    // Add marker to the map based on its category
    if (map.hasLayer(marker)) {
      map.removeLayer(marker); // Remove marker first if already on the map
    }
    const selectedCategory = document.getElementById('plant-filter').value;

    if (selectedCategory === 'all' || selectedCategory === markerData.category) {
      map.addLayer(marker); // Add the marker if category matches
    }
  });
}

// "View on Map" button click event
document.querySelectorAll('.view-on-map-btn').forEach(button => {
  button.addEventListener('click', function () {
    const plantId = this.getAttribute('data-plant-id');
    const plant = plantdetailsdata[plantId];

    // Get the category from the parent div
    const plantCard = this.closest('.flora-card');
    const category = plantCard.getAttribute('data-category');

    if (plant) {
      const { lat, lng, name, scientificName } = plant;

      // Create the marker with default icon
      const marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>${name}</b><br>${scientificName}`)
        .on('click', function() {
          showDetails(plantId); // Show details when clicking the marker
        });

      // Store the marker and its category
      markers[plantId] = { marker, category };
    } else {
      alert("Plant location not found!");
    }
  });
});

// Plant category filter dropdown
document.getElementById('plant-filter').addEventListener('change', function () {
  // Re-initialize markers based on the selected category
  initializeMarkers();
});


// Plant category filter dropdown
document.getElementById('plant-filter').addEventListener('change', function () {
  let selectedCategory = this.value;
  let plantCards = document.querySelectorAll('.flora-card');

  plantCards.forEach(card => {
    let cardCategory = card.getAttribute('data-category');

    if (selectedCategory === 'all' || selectedCategory === cardCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Smooth scroll & marker popup for "View on Map" buttons
const viewOnMapButtons = document.querySelectorAll('.view-on-map-btn');

viewOnMapButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });

    const plantId = button.getAttribute('data-plant-id');

    if (markers[plantId]) {
      const marker = markers[plantId];
      map.setView(marker.getLatLng(), 14);
      marker.openPopup();
    }
  });
});

// Initialize the map when the page loads
window.onload = initMap;