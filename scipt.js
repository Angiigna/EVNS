let map;
let activeInfoWindow = null; // Track the currently open info window

const PONDICHERRY_UNIVERSITY_BOUNDS = {
  north: 12.0364005,
  south: 12.013273,
  east: 79.8615224,
  west: 79.8432404,
};
const PONDICHERRY_CENTER = { lat: 12.0273, lng: 79.852 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: PONDICHERRY_CENTER,
    restriction: {
      latLngBounds: PONDICHERRY_UNIVERSITY_BOUNDS,
      strictBounds: true,
    },
    zoom: 16,
    mapTypeId: "satellite",
  });

  // All plant markers, the works tag refers to the markers that show on the map. the rest dont. we need to look into this.
  const plantLocations = [
    /*{
      name: "Bamboo",
      lat: 12.030723,
      lng: 79.858859,
      description: "A native bamboo species near the main library.",
      images: ["Plants/Bamboo/Bamboo1.jpg", "Plants/Bamboo/Bamboo2.jpg"], // same coordinates as sausage tree for some reason, need to look into this
    },*/
    {
      name: "Sausage Tree, Kigelia Africana",
      lat: 12.030723,
      lng: 79.858859,
      description: "Tagged plants: 19871, 19873, 19872, 19866",
      images: [
        "Plants/Sausage Tree, Kigelia Africana/1.jpg",
        "Plants/Sausage Tree, Kigelia Africana/unnamed.jpg",
      ],
    },
    {
      name: "Touch Me Not, Mimosa Pudica",
      lat: 12.030723,
      lng: 79.858859,
      description: "Sensitive plant known for its leaf movements.",
      images: [
        "Plants/Touch Me Not, Mimosa Pudica/1.jpg",
        "Plants/Touch Me Not, Mimosa Pudica/2.jpg", //works
      ],
    },
    {
      name: "Copper Pod, Peltophorum pterocarpum",
      lat: 12.030633,
      lng: 79.85888,
      description: "Number of trees: 2",
      images: [
        "Plants/CopperLeaf, Red Amaranth, Acalypha/1.jpg",
        "Plants/CopperLeaf, Red Amaranth, Acalypha/unnamed.jpg", //works
      ],
    },
    {
      name: "Spathodea campanulata",
      lat: 12.03151,
      lng: 79.860296,
      description: "Tagged plants: 19898, 19959, 19954",
      images: ["Plants/Spathodea campanulata.jpg"], //works
    },
    {
      name: "Parkia Biglandulosa",
      lat: 12.033173,
      lng: 79.859959,
      description: "Commonly found near academic buildings.",
      images: [
        "Plants/Parkia Biglandulosa/1.jpg",
        "Plants/Parkia Biglandulosa/2.jpg",
        "Plants/Parkia Biglandulosa/3.jpg",
        "Plants/Parkia Biglandulosa/4.jpg",
      ],
    },
    {
      name: "Empress Tree, Paulownia tomentosa",
      lat: 12.033173,
      lng: 79.859959,
      description: "Tag: 19896",
      images: ["Plants/Empress Tree, Paulownia tomentosa.jpg"], //works
    },
    {
      name: "Neem Tree, Azadirachta Indica",
      lat: 12.034057,
      lng: 79.857298,
      description: "Number of trees: 2",
      images: [
        "Plants/Neem Tree, Azadirachta Indica/1.jpg",
        "Plants/Neem Tree, Azadirachta Indica/unnamed.jpg", //works
      ],
    },
    {
      name: "Indian Cork Tree, Millingtonia Hortensis",
      lat: 12.03406,
      lng: 79.856588,
      description: "Too tall to take a picture.",
      images: ["Plants/Indian Cork Tree, Millingtonia Hortensis.jpg"],
    },
    {
      name: "Ashoka Tree, Saraca Asoca",
      lat: 12.03406,
      lng: 79.856588,
      description: "Symbolic tree in Indian culture.",
      images: [
        "Plants/Ashoka Tree, Saraca Asoca/1.jpg",
        "Plants/Ashoka Tree, Saraca Asoca/unnamed.jpg",
      ],
    },
    {
      name: "African Tulip Tree",
      lat: 12.017323,
      lng: 79.853045,
      description: "Bright orange flowers.",
      images: ["Plants/African.jpg"], //works
    },
    {
      name: "Indian Butter Tree",
      lat: 12.01731,
      lng: 79.85265,
      description: "Oil-producing tree.", //works
      images: ["Plants/ButterTree.jpg"],
    },
    {
      name: "Mango Tree",
      lat: 12.0161,
      lng: 79.853523,
      description: "Produces delicious mangoes.",
      images: ["Plants/MangoTree.jpg"],
      //works
    },
    {
      name: "Cherry Tree",
      lat: 12.016149,
      lng: 79.85415,
      description: "Beautiful flowering tree.",
      images: ["Plants/cherryplant.jpg"], //works
    },
    {
      name: "Gliricidia sepium",
      lat: 12.03406,
      lng: 79.856588,
      description: "Madre de cacao",
      images: ["Plants/Gliricidia sepium.jpg"], //works
    },
    {
      name: "Ficus benghalensis",
      lat: 12.01636,
      lng: 79.85378,
      description: "Banyan Tree",
      images: ["Plants/banyan tree.jpg"], //works
    },
    {
      name: "Streculia feotida",
      lat: 12.015963,
      lng: 79.854473,
      description: "Wild Indian Almond",
      images: ["Plants/WildIndianAlmond.jpg"], //works
    },
    {
      name: "Ceiba pentandra",
      lat: 12.017323,
      lng: 79.853045,
      description: "Kapok Tree / Silk Cotton Tree",
      images: ["Plants/KapokTree.jpg"], //works
    },
    {
      name: "Ficus virens",
      lat: 12.0166,
      lng: 79.85318,
      description: "Pilkhan Tree",
      images: ["Plants/PilkanTree.jpg"], //works
    },
    {
      name: "Azadirachta indica",
      lat: 12.015922,
      lng: 79.853212,
      description: "Neem Tree",
      images: ["Plants/neemtree.jpg"], //works
    },
    {
      name: "Tectona grandis",
      lat: 12.015774,
      lng: 79.854724,
      description: "Teak",
      images: ["Plants/Teak.jpg"], //works
    },
    {
      name: "Delonix regia",
      lat: 12.016723,
      lng: 79.85354,
      description: "Flame Tree",
      images: ["Plants/Flametree.jpg"], //works
    },
  ];
  // if possible can you send the photos of the plants y'all took to me along with the plant names?
  // i tried adding google drive links instead of using a separate folder but apparently google drive links are not allowed.
  // so i made a folder with the images and added the links to the images in the code. not sure if it would slow down the loading time of the map or not.
  // we also need to verify if the map is slowing down the site or not.
  // Loop through plant locations and add markers
  plantLocations.forEach((plant) => {
    const marker = new google.maps.Marker({
      position: { lat: plant.lat, lng: plant.lng },
      map: map,
      title: plant.name,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      },
    });

    // Apply different pixelOffset for "Gliricidia sepium" and "Neem Tree".
    // the gallery popped up too much in the top so the name got cut off so set an offset.
    // apparently there is no other fix because showing on the top is googles default option.
    const offsetY =
      plant.name === "Gliricidia sepium" ||
      plant.name === "Neem Tree, Azadirachta Indica"
        ? 200
        : 0;

    const infoWindow = new google.maps.InfoWindow({
      content: generateInfoWindowContent(plant),
      pixelOffset: new google.maps.Size(0, offsetY),
    });

    marker.addListener("click", () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;
    });
  });
}

// Function to generate InfoWindow content (with image gallery). Some landscape images are being weirdly stretched out. need to look into this.
// Open Gallery Modal
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

// Generate Info Window Content
function generateInfoWindowContent(plant) {
  let galleryPreview = "";
  if (plant.images && plant.images.length > 0) {
    galleryPreview = `
      <div class="info-gallery">
        <img src="${plant.images[0]}" alt="${
      plant.name
    }" class="info-thumbnail">
        <button class="view-gallery-btn" onclick='openGallery(${JSON.stringify(
          plant.images
        )})'>View Gallery</button>
      </div>`;
  }

  return `<div class="info-window-content">
      <b>${plant.name}</b><br>${plant.description}<br>
      ${galleryPreview}
    </div>`;
}

window.initMap = initMap;
