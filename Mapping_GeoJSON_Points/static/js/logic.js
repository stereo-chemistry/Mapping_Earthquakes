// Create street view title layer - default background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribuion: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create dark view title layer - optional background
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create map object with center & zoom level
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass map layers into layers control and add the layers control
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = 'https://raw.githubusercontent.com/stereo-chemistry/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json';

d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with retrieved data
    L.geoJSON(data, {
        // Turn each feature into a marker on the map
        pointToLayer: function(feature, latlng) {
            console.log(feature);
            return L.marker(latlng)
            .bindPopup('<h2>' + 'Airport Code: ' + feature.properties.faa + '</h2>' + '<hr>' + '<h3>' + 'Airport Name: ' + feature.properties.name + '</h3>');
        }
    }).addTo(map);
});
