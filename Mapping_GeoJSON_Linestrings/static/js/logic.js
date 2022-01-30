// Create street view title layer - default background
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribuion: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create dark view title layer - optional background
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Night: night,
    Day: day
};

// Create map object with center & zoom level
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [night]
});

// Pass map layers into layers control and add the layers control
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto GeoJSON URL
let torontoData = 'https://raw.githubusercontent.com/stereo-chemistry/Mapping_Earthquakes/Mapping_GeoJASON_Linestrings/torontoRoutes.json';

d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with retrieved data
    L.geoJSON(data, {
        color: "#ffffa1",
        weight: 2,
        // Turn each feature into a marker on the map
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h3> Airline: ' + feature.properties.airline + '</h3> <hr><h3> Destination: ' + feature.properties.dst + '</h3>');
        }
    }).addTo(map);
});
