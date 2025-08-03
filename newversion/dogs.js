let map;
const markers = {};
let currentDogLat = 12.022884311796183;
let currentDogLng = 79.84816914861624;

const mapContainer = document.querySelector(".map-container");

const dogDetailsData = {
  dog1: {
    name: "NARMADA HOSTEL",
    lat: 12.022917784146761,
    lng: 79.8468363524608,
    description: "No. of dogs: 6",
    image: "../Dogs/Girls/kannagi.jpg",
  },
  dog2: {
    name: "KANNAGI HOSTEL",
    lat: 12.024334401832427,
    lng: 79.84595658789404,
    description: "5 dogs and 2 puppies",
    image: "../Dogs/Girls/kannagi.jpg",
  },
  dog3: {
    name: "MOTHER THERESA MESS",
    lat: 12.022261940087793,
    lng: 79.84806212197712,
    description: "8 dogs and 3 puppies",
    image: "../Dogs/campus/mess.jpg",
  },
  dog4: {
    name: "GANGA HOSTEL",
    lat: 12.02227303907133,
    lng: 79.84942976214973,
    description: "No. of dogs: 3",
    image: "../Dogs/Girls/kannagi.jpg",
  },
  dog5: {
    name: "MADAM CURIE HOSTEL",
    lat: 12.022884311796183,
    lng: 79.84816914861624,
    description: "No. of dogs: 4",
    image: "../Dogs/Girls/kannagi.jpg",
  },
  dog6: {
    name: "YAMUNA HOSTEL",
    lat: 12.022498675635342,
    lng: 79.84865731065663,
    description: "No. of dogs: 3",
    image: "../Dogs/Girls/kannagi.jpg",
  },
  dog7: {
    name: "SARASWATI HOSTEL",
    lat: 12.02150703726073,
    lng: 79.84973555868204,
    description: "No. of dogs: 4",
    image: "../Dogs/Girls/saraswati.jpg",
  },
  dog8: {
    name: "KAVERI HOSTEL",
    lat: 12.020339627597007,
    lng: 79.85028541152809,
    description: "6 dogs and 2 puppies",
    image: "../Dogs/Girls/kannagi.jpg",
  },
  dog9: {
    name: "GIRL’S TEA TIME",
    lat: 12.02327944111214,
    lng: 79.84694698064703,
    description: "3 dogs",
    image: "../Dogs/campus/girlstea1.jpg",
  },
  dog10: {
    name: "KABIR DAS HOSTEL",
    lat: 12.029370766606938,
    lng: 79.84931225246086,
    description: "No. of dogs: 3",
    image: "../Dogs/Boys/kannadhasan.jpg",
  },
  dog11: {
    name: "THIRUVALLUR STADIUM",
    lat: 12.027691842933573,
    lng: 79.84818572466193,
    description: "No. of dogs: 5",
    image: "../Dogs/Boys/thiruvallur.jpg",
  },
  dog12: {
    name: "MAKA HOSTEL",
    lat: 12.029780002663266,
    lng: 79.84873289530712,
    description: "No. of dogs: 2",
    image: "../Dogs/Boys/maka.jpg",
  },
  dog13: {
    name: "KAMBAN HOSTEL",
    lat: 12.02986394843738,
    lng: 79.85198373266854,
    description: "No. of dogs: 3",
    image: "../Dogs/Boys/kamban1.jpg",
  },
  dog14: {
    name: "BIRSA MUNDA HOSTEL",
    lat: 12.030216211741985,
    lng: 79.85338539478852,
    description: "No. of dogs: 3",
    image: "../Dogs/Boys/birsa.jpg",
  },
  dog15: {
    name: "AUROBINDO HOSTEL",
    lat: 12.029449153041673,
    lng: 79.8531848506076,
    description: "4 dogs and 7 puppies",
    image: "../Dogs/Boys/auro7.jpg",
  },
  dog16: {
    name: "KALIDAS HOSTEL",
    lat: 12.03029967187246,
    lng: 79.8495002711638,
    description: "3 dogs",
    image: "../Dogs/Boys/kalidas1.jpg",
  },
  dog17: {
    name: "VALMIKI HOSTEL",
    lat: 12.02947624762929,
    lng: 79.85167443127524,
    description: "2 dogs",
    image: "../Dogs/Boys/valmiki.jpg",
  },
  dog18: {
    name: "SUBRAMANIAN BHARATI HOSTEL",
    lat: 12.028716334345024,
    lng: 79.85294887361006,
    description: "1 dog",
    image: "../Dogs/Boys/subramaninan.jpg",
  },
  dog19: {
    name: "PAVENDAR BHARATHIDASAN HOSTEL",
    lat: 12.02947624762929,
    lng: 79.85167443127524,
    description: "1 dog",
    image: "../Dogs/Boys/pavendar bharadhidasan.jpg",
  },
  dog20: {
    name: "CV RAMAN HOSTEL",
    lat: 12.027097574866822,
    lng: 79.85297411778491,
    description: "2 dogs",
    image: "../Dogs/Boys/cv raman1.jpg",
  },
  dog21: {
    name: "ILLANGO HOSTEL",
    lat: 12.028213481492733,
    lng: 79.85311116011296,
    description: "2 dogs",
    image: "../Dogs/Boys/ilango.jpg",
  },
  dog22: {
    name: "TAGORE HOSTEL",
    lat: 12.029515087476772,
    lng: 79.85110886690792,
    description: "2 dogs",
    image: "../Dogs/Boys/ilango.jpg",
  },
  dog23: {
    name: "SILVER JUBILEE CAMPUS",
    lat: 12.033552359904611,
    lng: 79.85818007203719,
    description: "9 dogs",
    image: "../Dogs/campus/sj.jpg",
  },
};

function initMap() {
  map = L.map("flora-map").setView([12.022884311796183, 79.84816914861624], 16);

  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
    }
  ).addTo(map);

  const satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri",
    }
  );

  const toner = L.tileLayer(
    "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
    {
      attribution: "Map tiles by Stamen Design",
    }
  );

  const baseMaps = {
    OpenStreetMap: osm,
    Satellite: satellite,
    Toner: toner,
  };

  L.control.layers(baseMaps).addTo(map);

  for (const dogId in dogDetailsData) {
    const dog = dogDetailsData[dogId];
    if (dog.lat && dog.lng) {
      const marker = L.marker([dog.lat, dog.lng])
        .addTo(map)
        .bindPopup(
          `<strong>${dog.name}</strong><br>${dog.description}<br><img src="${dog.imageUrl}" style="width:150px; border-radius:6px;">`
        );

      markers[dogId] = marker;
    }
  }
}

function showDetails(dogId) {
  const dog = dogDetailsData[dogId];
  if (!dog) return;

  currentDogLat = dog.lat;
  currentDogLng = dog.lng;

  document.getElementById("plant-name").innerText = dog.name;
  document.getElementById("plant-description").innerText = dog.description;
  document.getElementById("plant-image").src = dog.imageUrl;
  document.getElementById("plant-origin").innerText = "";
  document.getElementById("plant-location").innerText = "";
  document.getElementById("scientific-name").innerText =
    "Scientific Name: Canis familiaris";

  document.getElementById("plantModal").style.display = "block";
  mapContainer.style.display = "none";
}

function closeModal() {
  document.getElementById("plantModal").style.display = "none";
  mapContainer.style.display = "block";
}

function showLocationOnMap() {
  map.setView([currentDogLat, currentDogLng], 17);
  L.marker([currentDogLat, currentDogLng]).addTo(map).openPopup();
}

// Scroll + zoom to marker on button click
const viewButtons = document.querySelectorAll(".view-on-map-btn");
viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document
      .getElementById("map-section")
      .scrollIntoView({ behavior: "smooth" });
    const dogId = button.getAttribute("data-plant-id");
    const marker = markers[dogId];
    if (marker) {
      map.setView(marker.getLatLng(), 17);
      marker.openPopup();
    }
  });
});

window.onload = function () {
  initMap();

  const filterDropdown = document.getElementById("plant-filter");
  const dogCards = document.querySelectorAll(".flora-card");

  filterDropdown.addEventListener("change", function () {
    const selectedCategory = this.value;

    dogCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      card.style.display =
        selectedCategory === "all" || cardCategory === selectedCategory
          ? "block"
          : "none";
    });
  });
};
let searchTimeout;
function filterPlants() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = document.querySelector(".search-bar").value.toLowerCase();
    const dogCards = document.querySelectorAll(".flora-card");

    dogCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  }, 150); // Debounce delay
}
function goBack() {
  if (document.referrer) {
    // Referrer exists — go back normally
    window.history.back();
  } else {
    // No referrer — fallback to default
    window.location.href = "new.html";
  }
}
document.getElementById("plant-filter").addEventListener("change", function () {
  const selected = this.value;
  if (selected === "poco") {
    window.location.href = "kingpoco.html";
  }
});
