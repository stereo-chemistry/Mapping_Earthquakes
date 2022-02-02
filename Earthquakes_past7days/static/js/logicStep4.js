// Create street view title layer - default background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribuion: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create dark view title layer - optional background
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    'Streets': streets,
    'Satellite': satelliteStreets
};

// Create map object with center & zoom level
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

let earthquakes = new L.layerGroup();

// Define an object that contains the overlays
// This overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// Pass map layers into layers control and add the layers control
L.control.layers(baseMaps, overlays).addTo(map);

// Create the earthquake layer for the map

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with retrieved data
    L.geoJSON(data, {
        // Turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // Set style for each circleMarker with styleInfo function
        style: styleInfo,
        // Create popup for each circleMarker to display magnitude and location
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Magnitude: ' + feature.properties.mag + '<br>Location: ' + feature.properties.place);
        }
    }).addTo(earthquakes);
    // Now add earthquake layer to mape
    earthquakes.addTo(map);
});    

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function to calculate the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: '#000000',
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// This function determines the color of the circleMarker based on the magnitue of the Earthquake
function getColor(magnitude) {
    if (magnitude > 5) {
        return '#ea2c2c';
    }
    if (magnitude > 4) {
        return '#ea822c';
    }
    if (magnitude > 3) {
        return '#ee9c00';
    }
    if (magnitude > 2) {
        return '#eecc00';
    }
    if (magnitude > 1) {
        return '#d4ee00';
    }
    return '#98ee00';
}