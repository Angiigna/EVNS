let map;
let markers = {}; // Global marker storage
let currentHotspotId; // Store current hotspot ID for modal
const mapContainer = document.querySelector('.map-container');

// Initialize the map
function initMap() {
  map = L.map('avian-map').setView([12.01676, 79.85325], 16);

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

  // Add markers for crow hotspots
  for (const hotspotId in crowDetailsData) {
    const hotspot = crowDetailsData[hotspotId];
    if (hotspot.start && hotspot.start.lat && hotspot.start.lng) {
      const marker = L.marker([hotspot.start.lat, hotspot.start.lng]).addTo(map)
        .bindPopup(`<strong>Hotspot ${hotspotId}</strong><br>Count: ${hotspot.count || 'Unknown'}`)
        .on('click', () => showDetails(hotspotId));
      markers[hotspotId] = marker;
    } else {
      console.warn(`Hotspot data missing lat/lng for ID: ${hotspotId}`);
    }
  }
}

// Function to focus on a specific hotspot
function focusHotspot(hotspotId) {
  const marker = markers[hotspotId];
  if (marker) {
    map.setView(marker.getLatLng(), 17);
    marker.openPopup();
  } else {
    alert("Hotspot not found on map!");
  }
}

// Function to show location on the map in the modal
function showLocationOnMap(hotspotId) {
  const hotspot = crowDetailsData[hotspotId];
  if (hotspot && hotspot.start && hotspot.start.lat && hotspot.start.lng) {
    map.setView([hotspot.start.lat, hotspot.start.lng], 17);
    mapContainer.style.display = 'block'; // Show map
    document.getElementById('avianModal').style.display = 'none'; // Hide modal
    L.marker([hotspot.start.lat, hotspot.start.lng]).addTo(map)
      .bindPopup(`<b>Hotspot ${hotspotId}</b><br>Count: ${hotspot.count || 'Unknown'}`)
      .openPopup();
  } else {
    alert("Hotspot location not found!");
  }
}

// Show the modal with hotspot details
function showDetails(hotspotId) {
  const hotspot = crowDetailsData[hotspotId];
  if (!hotspot) {
    alert("Hotspot details not found!");
    return;
  }

  currentHotspotId = hotspotId; // Store current hotspot ID
  document.getElementById('hotspot-name').innerText = `Hotspot ${hotspotId}`;
  document.getElementById('hotspot-count').innerText = `Count: ${hotspot.count || 'Unknown'}`;
  document.getElementById('hotspot-images').innerHTML = hotspot.images && hotspot.images.length > 0
  ? `
    <div class="image-gallery">
      ${hotspot.images.map(img => `
        <div class="gallery-image">
          <img src="${img}" alt="Hotspot image">
        </div>
      `).join('')}
    </div>`
  : 'No images available';


  document.getElementById('avianModal').style.display = 'block';
  mapContainer.style.display = 'none'; // Hide the map container
}

// Close the modal
function closeModal() {
  document.getElementById('avianModal').style.display = 'none';
  mapContainer.style.display = 'block'; // Show the map container again
}

// Function to filter hotspot cards
function filterHotspots() {
  let searchQuery = document.querySelector('.search-bar').value.toLowerCase();
  let hotspotCards = document.querySelectorAll('.avian-card');

  hotspotCards.forEach(card => {
    let hotspotName = card.querySelector('h3').textContent.toLowerCase();
    if (hotspotName.includes(searchQuery)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// View on Map button click event
document.querySelectorAll('.view-on-map-btn').forEach(button => {
  button.addEventListener('click', function () {
    const hotspotId = this.getAttribute('data-hotspot-id');
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
    focusHotspot(hotspotId);
  });
});

// View Details button click event
document.querySelectorAll('.view-details-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const hotspotId = e.target.getAttribute('data-hotspot-id');
    showDetails(hotspotId);
  });
});

function createCrowCards() {
  const galleryContainer = document.getElementById('crow-gallery');
  if (!galleryContainer) return;

  for (const hotspotId in crowDetailsData) {
    const hotspot = crowDetailsData[hotspotId];

    // Use first image if available, otherwise fallback image
    const imageSrc = (hotspot.images && hotspot.images.length > 0)
      ? hotspot.images[0]
      : '/crows/default.jpg';

    // Optional: derive location name from ID or give a fallback name
    const locationName = `Hotspot ${hotspotId.replace('hotspot', '')}`;

    const card = document.createElement('div');
    card.className = 'flora-card';
    card.innerHTML = `
  <img src="${imageSrc}" alt="${locationName}" />
  <h3>${locationName}</h3>
  <div class="button-group">
    <button class="view-details-btn" data-hotspot-id="${hotspotId}">Details</button>
    <button class="view-on-map-btn" data-hotspot-id="${hotspotId}">Map</button>
  </div>
`;


    galleryContainer.appendChild(card);
  }

  // Attach event listeners AFTER cards are added
  document.querySelectorAll('.view-on-map-btn').forEach(button => {
    button.addEventListener('click', function () {
      const hotspotId = this.getAttribute('data-hotspot-id');
      document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
      focusHotspot(hotspotId);
    });
  });

  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', function () {
      const hotspotId = this.getAttribute('data-hotspot-id');
      showDetails(hotspotId);
    });
  });
}

window.onload = function () {
  initMap();
  createCrowCards(); 
};