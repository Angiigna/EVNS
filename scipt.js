//let map;
let activeInfoWindow = null; // Track the currently open info window

const PONDICHERRY_UNIVERSITY_BOUNDS = {
  north: 12.0364005,
  south: 12.013273,
  east: 79.8615224,
  west: 79.8432404,
};
const PONDICHERRY_CENTER = { lat: 12.01676, lng: 79.85325 };

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
      lat: 12.03063,
      lng: 79.85733,
      description: "Tagged plants: 19871, 19873, 19872, 19866",
      images: [
        "Plants/Sausage Tree, Kigelia Africana/1.jpg",
        "Plants/Sausage Tree, Kigelia Africana/unnamed.jpg",
      ],//works 1
    },
    {
      name: "Touch Me Not, Mimosa Pudica",
      lat: 12.030723,
      lng: 79.858859,
      description: "Sensitive plant known for its leaf movements.",
      images: [
        "Plants/Touch Me Not, Mimosa Pudica/1.jpg",
        "Plants/Touch Me Not, Mimosa Pudica/2.jpg", //works 2
      ],
    },
    {
      name: "Copper Pod, Peltophorum pterocarpum",
      lat: 12.030633,
      lng: 79.85888,
      description: "Number of trees: 2",
      images: [
        "Plants/CopperLeaf, Red Amaranth, Acalypha/1.jpg",
        "Plants/CopperLeaf, Red Amaranth, Acalypha/unnamed.jpg", //works 3
      ],
    },
    {
      name: "Spathodea campanulata",
      lat: 12.03151,
      lng: 79.860296,
      description: "Tagged plants: 19898, 19959, 19954",
      images: ["Plants/Spathodea campanulata.jpg"], //works 4
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
      images: ["Plants/Empress Tree, Paulownia tomentosa.jpg"], //works 5
    },
    {
      name: "Neem Tree, Azadirachta Indica",
      lat: 12.034057,
      lng: 79.857298,
      description: "Number of trees: 2",
      images: [
        "Plants/Neem Tree, Azadirachta Indica/1.jpg",
        "Plants/Neem Tree, Azadirachta Indica/unnamed.jpg", //works 6
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
      name: "Spathodea campanulata ",
      lat: 12.033025,
      lng: 79.855487,
      description: "African Tulip Tree",
      images: [
        "Plants/african tulip tree/africantulip.jpg",
        "Plants/african tulip tree/africantulipsmall.jpg",
        "Plants/african tulip tree/africantulipleaf.jpg",
        "Plants/african tulip tree/africantulipflower.jpg",    
      ], //works 7
    },
    {
      name: "Indian Butter Tree",
      lat: 12.01731,
      lng: 79.85265,
      description: "Oil-producing tree.", //works 8
      images: ["Plants/ButterTree.jpg"],
    },
    {
      name: "Mango Tree",
      lat: 12.0161,
      lng: 79.853523,
      description: "Produces delicious mangoes.",
      images: ["Plants/MangoTree.jpg"],
      //works 9
    },
    {
      name: "Cherry Tree",
      lat: 12.016149,
      lng: 79.85415,
      description: "Beautiful flowering tree.",
      images: ["Plants/cherryplant.jpg"], //works 10
    },
    {
      name: "Gliricidia sepium",
      lat: 12.03406,
      lng: 79.856588,
      description: "Madre de cacao",
      images: ["Plants/Gliricidia sepium.jpg"], //works 11
    },
    {
      name: "Ficus benghalensis",
      lat: 12.01636,
      lng: 79.85378,
      description: "Banyan Tree",
      images: ["Plants/banyan tree.jpg"], //works 12
    },
    {
      name: "Streculia feotida",
      lat: 12.015963,
      lng: 79.854473,
      description: "Wild Indian Almond",
      images: ["Plants/WildIndianAlmond.jpg"], //works 13
    },
    {
      name: "Ceiba pentandra",
      lat: 12.017323,
      lng: 79.853045,
      description: "Kapok Tree / Silk Cotton Tree",
      images: ["Plants/KapokTree.jpg"], //works 14
    },
    {
      name: "Ficus virens",
      lat: 12.0166,
      lng: 79.85318,
      description: "Pilkhan Tree",
      images: ["Plants/PilkanTree.jpg"], //works 15
    },
    {
      name: "Azadirachta indica",
      lat: 12.015922,
      lng: 79.853212,
      description: "Neem Tree",
      images: ["Plants/neemtree.jpg"], //works 16
    },
    {
      name: "Tectona grandis",
      lat: 12.015774,
      lng: 79.854724,
      description: "Teak",
      images: ["Plants/Teak.jpg"], //works 17
    },
    {
      name: "Delonix regia",
      lat: 12.016723,
      lng: 79.85354,
      description: "Flame Tree",
      images: ["Plants/Flametree.jpg"], //works 18
    },
    {
      name: "Syzygium cumini",
      lat: 12.020798,
      lng: 79.855852,
      description: "Jamun tree/Indian blackberry tree",
      images: [
        "Plants/jamuntree/jamuntree.jpg",
        "Plants/jamuntree/jamunleaf.jpg",
      ], //works 19
    },
    {
      name: "Cochlospermum gossypium",
      lat: 12.021068,
      lng: 79.855660,
      description: "Yellow Silk Cotton Tree",
      images: [
        "Plants/Yelowsilkcotton/yellowsilkcotton.jpg",
        "Plants/Yelowsilkcotton/yellowsilkcottonleaf.jpg",
      ], //works 20
    },
    {
      name: "Tabebuia rosea tree",
      lat: 12.021618,
      lng: 79.855919,
      description: "Pink Trumpet Tree or Rosy Trumpet Tree",
      images: [
        "Plants/pinktrumpet/pinktrumpettree.jpg",
        "Plants/pinktrumpet/pinktrumpetflower.jpg",
      ], //works 21
    },
    {
      name: "Dypsis lutescens",
      lat: 12.02105,
      lng: 79.85515,
      description: "Areca Palm",
      images: [
        "Plants/arecapalm.jpg",
      ], // works need to get one more pic of this plant, i thought i had a pic but its missing 22
    },
    {
      name: "Enterobium cyclocarpum",
      lat: 12.021086, 
      lng: 79.854311,
      description: "Earpod Tree",
      images: [
        "Plants/earpodtree/Earpodtree.jpg",
        "Plants/earpodtree/earpodtreesign.jpg",
      ], //works 23
    },
    {
      name: "Clusia rosea",
      lat: 12.021604,
      lng: 79.853932,
      description: "autograph tree or pitch apple",
      images: [
        "Plants/autographtree.jpg"
      ], //works 24
    },
    {
      name: "Tamarindus indica",
      lat: 12.02526, 
      lng: 79.85082,
      description: "Tamarind tree",
      images: [
        "Plants/tamrind/tamrind.jpg",
        "Plants/tamrind/amrindcloseup.jpg"
      ], //works 25
    },
    {
      name: "Ficus religiosa",
      lat: 12.02192,  
      lng: 79.85295,
      description: "Peepal Tree",
      images: [
        "Plants/peepal/peepaltree.jpg",
        "Plants/peepal/templepeepal.jpg",
        "Plants/peepal/peepalleaf.jpg",
      ], //works 26
    },
    {
      name: "Brugmansia suaveolens",
      lat: 12.021372, 
      lng: 79.853283,
      description: "White Trumpet vine",
      images: [
        "Plants/trumpetvine/white trumpet vine.jpg",
        "Plants/trumpetvine/trumpetvineflower.jpg",
      ], //works 27
    },
    {
      name: "Bougainvillea",
      lat: 12.02289,  
      lng: 79.85247,
      description: "paperflower",
      images: [
        "Plants/bougenvillea/bougenvillea.jpg",
        "Plants/bougenvillea/bougenvilleaflowers.jpg",
        "Plants/bougenvillea/paperflower.jpg",
      ], //works 28
    },
    {
      name: "Bixa orellana",
      lat: 12.02308,   
      lng: 79.84727,
      description: "Annatto tree or Lipstick tree.",
      images: [
        "Plants/lipsticktree.jpg",
      ], //works 29
    },
  
    {
      name: "Euphorbia lactea",
      lat: 12.022316,  
      lng: 79.847822,
      description: "Dragon Bones or Candelabra Plant",
      images: [
        "Plants/dragonbones/candeblara.jpg",
        "Plants/dragonbones/candeblaraleaf.jpg",
      ], //works 30
    },
    {
      name: " Manilkara zapota",
      lat: 12.0214, 
      lng: 79.8496,
      description: "Chiku or Sapodilla",
      images: [
        "Plants/chickoo/chicootree.jpg",
        "Plants/chickoo/chickoo.jpg",
      ], //works 31
    },
    {
      name: "Albizia julibrissin",
      lat: 12.026192,
      lng: 79.851797,
      description: "Mimosa tree",
      images: [
        "Plants/mimosa/mimosa.jpg",
        "Plants/mimosa/mimosa leaf.jpg"
      ], // works 32
    },
    {
      name: "Leucaena leucocephala",
      lat: 12.018820, 
      lng: 79.850851,
      description: "River tamrind",
      images: [
        "Plants/rivertamrind.jpg",
      ], // works 33
    },
    {
      name: "Wodyetia bifurcata",
      lat: 12.026920, 
      lng: 79.852961,
      description: "foxtail palm",
      images: [
        "Plants/foxtailpalm/foxtailpalm.jpg",
        "Plants/foxtailpalm/foxtailpalmdroop.jpg",
        "Plants/foxtailpalm/foxtailpalmotherside.jpg",
        "Plants/foxtailpalm/foxtailpalmseeds.jpg",
      ], //  works 34
    },
    {
      name: "Rhododendron",
      lat: 12.027890, 
      lng: 79.854350,
      description: "azalea plant",
      images: [
        "Plants/azaela/azaelaplant.jpg",
        "Plants/azaela/azaelatree.jpg",
        "Plants/azaela/azaelaflower.jpg",
      ], // works 35
    },
    {
      name: "Samanea saman",
      lat: 12.034022, 
      lng: 79.856566,
      description: "Raintree",
      images: [
        "Plants/raintree/raintree1.jpg",
        "Plants/raintree/raintree2.jpg",
        "Plants/raintree/raintreeflower.jpg",
      ], // works 36
    },
    {
      name: "Adenanthera pavonina L.",
      lat: 12.034882, 
      lng: 79.857618,
      description: "Coralwood",
      images: [
        "Plants/coralwood/coralwoodtree.jpg",
        "Plants/coralwood/coralwoodpods.jpg",
      ], // works 37
    },
    {
      name: "Acalypha wilkesiana",
      lat: 12.034353, 
      lng: 79.858749,
      description: "Copper leaf",
      images: [
        "Plants/copperleaf/copperleafplant.jpg",
        "Plants/copperleaf/copperleaf.jpg",
      ], // works 38
    },
    {
      name: "Parkia biglandulosa",
      lat: 12.031823,
      lng: 79.860153,
      description: "Badminton ball tree",
      images: [
        "Plants/badmintonballtree/badmintonballleaf.jpg",
        "Plants/badmintonballtree/badmintonbaltree.jpg",
        "Plants/badmintonballtree/badmintonball.jpg",
      ], // works 39
    },
    {
      name: "Cassia grandis",
      lat: 12.030765,
      lng: 79.859748,
      description: "Pink Shower",
      images: [
        "Plants/pinkflower/pinkflower1.jpg",
        "Plants/pinkflower/pinkflower2.jpg",
      ], // works 40
    },
    {
      name: "Peltophorum pterocarpum",
      lat: 12.01844,
      lng: 79.85074,
      description: "Yellow flame",
      images: [
        "Plants/yellowflame/yellowflame.jpg",
        "Plants/yellowflame/yellowflameflower.jpg",
      ], // works 41
    },
    {
      name: "Heptapleurum actinophyllum ",
      lat: 12.030012,
      lng: 79.849974,
      description: "Queensland umbrella tree",
      images: [
        "Plants/umbellatree/umbrellatree.jpg",
        "Plants/umbellatree/umbrellatree1.jpg",
        "Plants/umbellatree/umbrellatree2.jpg"
      ], // works 43
    },
    {
      name: "Cassia fistula L",
      lat: 12.029621,
      lng: 79.850473,
      description: "Golden Shower Tree",
      images: [
        "Plants/goldenshowertree/goldenshower1.jpg",
        "Plants/goldenshowertree/goldenshower2.jpg"
      ], // works 44
    },
    {
      name: "Dracaena fragrans ",
      lat: 12.029627,
      lng: 79.850477,
      description: "Corn plant",
      images: [
        "Plants/cornplant/corn1.jpg",
        "Plants/cornplant/corn2.jpg",
        "Plants/cornplant/corn3.jpg"
      ], // works 45
    },
    {
      name: "Wrightia tinctoria ",
      lat: 12.029571,
      lng: 79.850632,
      description: "dyer's oleander",
      images: [
        "Plants/dyers/dyer's.jpg",
        "Plants/dyers/dyer'sflower.jpg",
        "Plants/dyers/dyer'sleaf.jpg",
      ], // works 46
    },
    {
      name: "Araucaria columnaris",
      lat: 12.029585,
      lng: 79.850456,
      description: "Cook-pine",
      images: [
        "Plants/cookpine/cookpine1.jpg",
        "Plants/cookpine/cookpine2.jpg",
        "Plants/cookpine/cookpine3.jpg",
      ], // works 47
    },

  ];// if anyone has good pics pls add them to the plant file and link them o the respctive tree or send the pics.
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
        url: "Plants/marker.png", // Path to your custom marker icon
        scaledSize: new google.maps.Size(30, 30), // Adjust size if needed
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
      <b><i>${plant.name}</i></b><br>${plant.description}<br>
      ${galleryPreview}
    </div>`;
}

window.initMap = initMap;
