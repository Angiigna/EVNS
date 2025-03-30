function initializeFaunaMap() {
  const bounds = {
    north: 12.0364005,
    south: 12.013273,
    east: 79.8615224,
    west: 79.8432404,
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 12.02972, lng: 79.85199 },
    zoom: 15,
    restriction: { latLngBounds: bounds, strictBounds: true },
  });

  const locations = [
    {
      name: "Kamban Hostel",
      lat: 12.02972,
      lng: 79.85199,
      images: ["Dogs/Boys/kamban.jpg", "Dogs/Boys/kamban1.jpg"],
    },
    {
      name: "Maka Hostel",
      lat: 12.02971,
      lng: 79.84873,
      images: ["Dogs/Boys/maka.jpg", "Dogs/Boys/maka.jpg"],
    },
    {
      name: "Thiruvallur Stadium",
      lat: 12.02762223457783,
      lng: 79.84820856929633,
      images: [
        "Dogs/Boys/thiruvalllur3.jpg",
        "Dogs/Boys/thiruvallur2.jpg",
        "Dogs/Boys/thiruvallur1.jpg",
        "Dogs/Boys/thiruvallur.jpg",
      ],
    },
    {
      name: "Kannadhasan hostel",
      lat: 12.029389447571857,
      lng: 79.85027985798224,
      images: [
        "Dogs/Boys/Kannadhasan.jpg",
        "Dogs/Boys/Kannadhasan2.jpg",
        "Dogs/Boys/kannadhasan3.jpg",
      ],
    },
    {
      name: "Kannagi hostel",
      lat: 12.02432,
      lng: 79.84603,
      images: [
        "Dogs/Girls/kannagi.jpg",
        "Dogs/Girls/kannagi1.jpg",
        "Dogs/Girls/kannagi2.jpg",
        "Dogs/Girls/kannagi3.jpg",
      ],
    },
  ];

  const pawIcon = {
    url: "Dogs/dog marker.png",
    scaledSize: new google.maps.Size(30, 30),
  };

  locations.forEach((place) => {
    const marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      title: place.name,
      icon: pawIcon,
    });

    let galleryHtml = `<h3>${place.name}</h3><div style='display:flex;'>`;
    place.images.forEach((img) => {
      galleryHtml += `<img src='${img}' style='width:100px; height:100px; margin:5px;'>`;
    });
    galleryHtml += "</div>";

    const infoWindow = new google.maps.InfoWindow({
      content: generateInfoWindowContent(place),
    });

    marker.addListener("click", () => {
      // Close the currently open info window
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;
    });
  });
  addHeatmapLayer(map);
  return map;
}
// Open Gallery Modal
function openGallery(images) {
  let modal = document.getElementById("gallery-modal");
  let modalImg = document.getElementById("gallery-modal-img");
  let currentIndex = 0;

  if (!images || images.length === 0) {
    alert("No images available.");
    return;
  }

  modal.style.display = "flex";
  modalImg.src = images[currentIndex];

  document.getElementById("gallery-next").onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex];
  };

  document.getElementById("gallery-prev").onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
  };

  document.getElementById("gallery-close").onclick = () => {
    modal.style.display = "none";
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}
function generateInfoWindowContent(place) {
  let galleryPreview = "";
  if (place.images && place.images.length > 0) {
    galleryPreview = `
        <div class="info-gallery">
          <img src="${place.images[0]}" alt="${
      place.name
    }" class="info-thumbnail">
          <button class="view-gallery-btn" onclick='openGallery(${JSON.stringify(
            place.images
          )})'>View Gallery</button>
        </div>`;
  }

  return `<div class="info-window-content">
        <b>${place.name}</b><br>
        ${galleryPreview}
      </div>`;
}

// Attach function to window so it can be called globally
window.openGallery = openGallery;

function addHeatmapLayer(map) {
  const heatmapData = [
    {
      location: new google.maps.LatLng(12.02763, 79.8533),
      weight: 10,
    },
    {
      location: new google.maps.LatLng(12.02432, 79.84603), // Kannagi Hostel
      weight: 8,
    },
  ];

  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map: map,
    radius: 100, // Small localized area
    opacity: 0.7, // Slight transparency
    gradient: [
      "rgba(0, 255, 0, 0)",
      "rgba(255, 165, 0, 1)",
      "rgba(255, 0, 0, 1)",
    ],
  });

  return heatmap;
}

// Attach function to window so we can call it dynamically
window.initializeFaunaMap = initializeFaunaMap;
