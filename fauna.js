
    function initializeFaunaMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 12.018555710925714, lng: 79.85677099293513 },
          zoom: 17,
        });
      
        const dogMarkers = [];
        const dogHeatmapData = [];
      
        const dogLocations = [
            [12.022917784146761, 79.8468363524608, "NARMADA HOSTEL", "No. of dogs: 6", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
                [12.024334401832427, 79.84595658789404, "KANNAGI HOSTEL", "5 dogs and 2 puppies", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
                [12.022261940087793, 79.84806212197712, "MOTHER THERESA MESS", "8 dogs and 3 puppies", "dogMarker.png", 38, 31, "Dogs/Girls/mess.jpg"],
                [12.02227303907133, 79.84942976214973, "GANGA HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
[12.022884311796183, 79.84816914861624, "MADAM CURIE  HOSTEL", "No. of dogs: 4", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
[12.022498675635342, 79.84865731065663, "YAMUNA  HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
[12.02150703726073, 79.84973555868204, "SARASWATI  HOSTEL", "No. of dogs: 4", "dogMarker.png", 38, 31, "Dogs/Girls/saraswati.jpg"],
[12.020339627597007, 79.85028541152809, "KAVERI  HOSTEL", "6 dogs and 2 puppies", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
            [12.02327944111214, 79.84694698064703, "GIRL’s TEA TIME ", "3 dogs ", "dogMarker.png", 38, 31, "Dogs/campus/girlstea1.jpg"],

[12.029370766606938, 79.84931225246086, " KANNADASAN HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Boys/kannadhasan.jpg"],
[12.027691842933573, 79.84818572466193, "THIRUVALLUR STADIUM", "No. of dogs: 5", "dogMarker.png", 38, 31, "Dogs/Boys/thiruvallur.jpg"],
[12.029780002663266, 79.84873289530712, "MAKA  HOSTEL", "No. of dogs: 2", "dogMarker.png", 38, 31, "Dogs/Boys/maka.jpg"],
[12.02986394843738, 79.85198373266854, " KAMBAN  HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Boys/kamban1.jpg"],
[12.030216211741985, 79.85338539478852, "BIRSA MUNDA HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Boys/birsa.jpg"],

[12.029449153041673, 79.8531848506076, "AUROBINDO  HOSTEL", "4 dogs and 7 puppies", "dogMarker.png", 38, 31, "Dogs/Boys/auro7.jpg"],
            [12.03029967187246, 79.8495002711638, "KALIDAS  HOSTEL", "3 dogs ", "dogMarker.png", 38, 31, "Dogs/Boys/kalidas1.jpg"],
[12.02947624762929, 79.85167443127524, "VALMIKI  HOSTEL", "2 dogs ", "dogMarker.png", 38, 31, "Dogs/Boys/valmiki.jpg"],
[12.028716334345024, 79.85294887361006, "SUBRAMANIAN BHARATI  HOSTEL", "1 dog ", "dogMarker.png", 38, 31, "Dogs/Boys/subramaninan.jpg"],
[12.02947624762929, 79.85167443127524, "PAVENDAR BHARATHIDASAN  HOSTEL", "1dog ", "dogMarker.png", 38, 31, "Dogs/Boys/pavendar bharadhidasan.jpg"],
[12.027097574866822, 79.85297411778491, "CV RAMAN HOSTEL", "2 dogs ", "dogMarker.png", 38, 31, "Dogs/Boys/cv raman1.jpg"],
[12.028213481492733, 79.85311116011296, "ILLANGO HOSTEL", "2 dogs ", "dogMarker.png", 38, 31, "Dogs/Boys/ilango.jpg"],
[12.029515087476772, 79.85110886690792, "TAGORE HOSTEL", "2 dogs ", "dogMarker.png", 38, 31, "Dogs/Boys/ilango.jpg"],
    [12.033552359904611, 79.85818007203719, "SJ ", "9dogs ", "dogMarker.png", 38, 31, "Dogs/campus/sj.jpg"]
];
      
        for (let i = 0; i < dogLocations.length; i++) {
          const loc = dogLocations[i];
          const marker = new google.maps.Marker({
            position: { lat: loc[0], lng: loc[1] },
            map,
            title: loc[2],
            icon: {
              url: loc[4],
              scaledSize: new google.maps.Size(loc[5], loc[6]),
            },
            animation: google.maps.Animation.DROP,
          });
      
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <h3>${loc[2]}</h3>
                <p>${loc[3]}</p>
                <img src="${loc[7]}" alt="Dog Image" style="width:150px; border-radius:8px;">
              </div>
            `,
          });
      
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
      
          dogMarkers.push(marker);
      
          const weight = parseInt(loc[3].match(/\d+/)) || 1;
          dogHeatmapData.push({
            location: new google.maps.LatLng(loc[0], loc[1]),
            weight,
          });
        }
      
        const dogHeatmap = new google.maps.visualization.HeatmapLayer({
          data: dogHeatmapData,
          radius: 50,
          opacity: 0.5,
        });
        dogHeatmap.setMap(map);
      
        // Crow setup
        const crowHotspots = [
            {
                start: { lat:  12.028998, lng:79.848285  },
                end: { lat: 12.029662, lng:79.849222  }
            },
            {
                start: { lat:  12.021594, lng:79.853447  },
                end: { lat: 12.021090, lng: 79.854954 }
            },
            {
                start: { lat: 12.020768, lng:79.855881 },
                end: { lat: 12.0209, lng: 79.85514 }
            },
            {
                start: { lat: 12.020832, lng:79.857474 },
                end: { lat: 12.0204, lng: 79.85731 }
            },
        ];
      
        const crowMarkers = [];
        const crowHeatmapData = [];
      
        crowHotspots.forEach(h => {
          const lat = (h.start.lat + h.end.lat) / 2;
          const lng = (h.start.lng + h.end.lng) / 2;
      
          crowHeatmapData.push({
            location: new google.maps.LatLng(lat, lng),
            weight: 5,
          });
      
          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: null, // Start hidden
            title: "Crow Hotspot",
            icon: {
              url: "/crowicon.png",
              scaledSize: new google.maps.Size(38, 31),
            },
            animation: google.maps.Animation.DROP,
          });
      
          crowMarkers.push(marker);
        });
      
        const crowHeatmap = new google.maps.visualization.HeatmapLayer({
          data: crowHeatmapData,
          radius: 40,
          opacity: 0.6,
          gradient: [
            "rgba(0,0,0,0)",
            "rgba(106,13,173,0.6)",
            "rgba(106,13,173,1)",
          ],
        });
      
        crowHeatmap.setMap(null); // Start hidden
      
        // Toggle logic
        let showingCrows = false;
      
        const toggleBtn = document.getElementById("toggleBtn");
        toggleBtn.addEventListener("click", () => {
          showingCrows = !showingCrows;
      
          if (showingCrows) {
            toggleBtn.innerText = "Show Dogs";
            toggleBtn.style.backgroundColor = "#097969";
      
            dogMarkers.forEach(m => m.setMap(null));
            dogHeatmap.setMap(null);
      
            crowMarkers.forEach(m => m.setMap(map));
            crowHeatmap.setMap(map);
          } else {
            toggleBtn.innerText = "Show Crows";
            toggleBtn.style.backgroundColor = "#6a0dad";
      
            crowMarkers.forEach(m => m.setMap(null));
            crowHeatmap.setMap(null);
      
            dogMarkers.forEach(m => m.setMap(map));
            dogHeatmap.setMap(map);
          }
        });
      }
      
