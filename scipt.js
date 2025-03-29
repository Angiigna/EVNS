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
      //strictBounds: true,
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
      name: "Kapok Tree, Pajni Maram",
      lat: 12.017323,
      lng: 79.853045,
      description: "Tall and fast-growing species.",
    },
    {
      name: "African Tulip Tree",
      lat: 12.017323,
      lng: 79.853045,
      description: "Bright orange flowers.", //works
    },
    {
      name: "Indian Butter Tree",
      lat: 12.017324,
      lng: 79.852544,
      description: "Oil-producing tree.", //works
    },
    {
      name: "Mango Tree",
      lat: 12.0161,
      lng: 79.853523,
      description: "Produces delicious mangoes.", //works
    },
    {
      name: "Cherry Tree",
      lat: 12.016149,
      lng: 79.85415,
      description: "Beautiful flowering tree.", //works
    },
    {
      name: "Gliricidia sepium",
      lat: 12.03406,
      lng: 79.856588,
      description: "Madre de cacao",
      images: ["Plants/Gliricidia sepium.jpg"], //works
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
// The images are being stretched out because the width and height of the image are not set.
function generateInfoWindowContent(plant) {
  let gallery = "";
  if (plant.images && plant.images.length > 0) {
    gallery =
      `<div class="info-window-gallery" style="display: flex; gap: 5px; margin-top: 5px;">` +
      plant.images
        .map(
          (img) =>
            `<img src="${img}" alt="${plant.name}" style="width: 80px; height: auto; border-radius: 5px;">`
        )
        .join("") +
      `</div>`;
  }

  return `<div style="max-width: 200px;">
      <b>${plant.name}</b><br>${plant.description}<br>
      ${gallery}
    </div>`;
}

window.initMap = initMap;
