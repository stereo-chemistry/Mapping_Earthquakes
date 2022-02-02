// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and zoom level
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// Tile Layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribuion: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Add 'graymap' tile layer to the map
streets.addTo(map);

// Method #1 add a circle-shaped marker to the map for Los Angeles, CA
// L.circle([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
// }).addTo(map);

// Method #2 add a circle-shaped marker to the map for Los Angeles, CA
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: "#ffffa1"
}).addTo(map);

