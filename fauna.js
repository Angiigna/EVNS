  function initializeFaunaMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 12.018555710925714, lng: 79.85677099293513 }, 
            zoom: 17,
           // mapTypeControl: false,
            //fullscreenControl: false,
            //streetViewControl: false
        });

        const locations = [
            [12.022917784146761, 79.8468363524608, "NARMADA HOSTEL", "No. of dogs: 6", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
                [12.024334401832427, 79.84595658789404, "KANNAGI HOSTEL", "5 dogs and 2 puppies", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
                [12.022261940087793, 79.84806212197712, "MOTHER THERESA MESS", "8 dogs and 3 puppies", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
                [12.02227303907133, 79.84942976214973, "GANGA HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
[12.022884311796183, 79.84816914861624, "MADAM CURIE  HOSTEL", "No. of dogs: 4", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
[12.022498675635342, 79.84865731065663, "YAMUNA  HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],
[12.02150703726073, 79.84973555868204, "SARASWATI  HOSTEL", "No. of dogs: 4", "dogMarker.png", 38, 31, "Dogs/Girls/saraswati.jpg"],
[12.020339627597007, 79.85028541152809, "KAVERI  HOSTEL", "6 dogs and 2 puppies", "dogMarker.png", 38, 31, "Dogs/Girls/kannagi.jpg"],

[12.029370766606938, 79.84931225246086, " KANNADASAN HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Boys/kannadhasan.jpg"],
[12.027691842933573, 79.84818572466193, "THIRUVALLUR STADIUM", "No. of dogs: 5", "dogMarker.png", 38, 31, "Dogs/Boys/thiruvallur.jpg"],
[12.029780002663266, 79.84873289530712, "MAKA  HOSTEL", "No. of dogs: 2", "dogMarker.png", 38, 31, "Dogs/Boys/maka.jpg"],
[12.02986394843738, 79.85198373266854, " KAMBAN  HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Boys/kamban1.jpg"],
[12.030216211741985, 79.85338539478852, "BIRSA MUNDA HOSTEL", "No. of dogs: 3", "dogMarker.png", 38, 31, "Dogs/Boys/birsa.jpg"],

[12.029449153041673, 79.8531848506076, "AUROBINDO  HOSTEL", "4 dogs and 7 puppies", "dogMarker.png", 38, 31, "Dogs/Boys/auro7.jpg"]
    


];

        let heatmapData = [];

        for (let i = 0; i < locations.length; i++) {
            const currLocation = locations[i];

            // Add marker
            const marker = new google.maps.Marker({
                position: { lat: currLocation[0], lng: currLocation[1] },
                map: map,
                title: currLocation[2],
                icon: {
                    url: currLocation[4],
                    scaledSize: new google.maps.Size(currLocation[5], currLocation[6]),
                },
                animation: google.maps.Animation.DROP
            });

            // Add heatmap data point with weight based on the number of dogs
            let numDogs = parseInt(currLocation[3].match(/\d+/)); // Extract number from "No. of dogs: X"
            heatmapData.push({
                location: new google.maps.LatLng(currLocation[0], currLocation[1]),
                weight: numDogs
            });

            // Info Window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="text-align:center;">
                        <h3>${currLocation[2]}</h3>
                        <p>${currLocation[3]}</p>
                        <img src="${currLocation[7]}" alt="Dog Image" style="width:150px;height:auto;border-radius:10px;">
                    </div>
                `
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        }

        // Add Heatmap Layer
        const heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            dissipating: true,  // Enables gradual fade of heatmap
            radius: 50,         // Adjusts the hotspot size
            opacity: 0.5        // Controls the transparency of the heatmap
        });

        heatmap.setMap(map);
    }
