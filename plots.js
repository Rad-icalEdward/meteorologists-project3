
//http://api.weatherapi.com/v1/current.json?key=ae8ef28fcaed48ce892193914231705&q=London&aqi=no


const baseURL = "http://api.weatherapi.com/v1/current.json";
//let query = "London";
let key = "ae8ef28fcaed48ce892193914231705";

// Create the map
//Latitude: 52.489471
//Longitude: -1.898575
let myMap = L.map("map-id", {
    center: { lat: 52.48, lng: -1.89 },
    zoom: 6

});

// Create the tile layer which will be the background to the map

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function init() {

    // Select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Make a variable for city names
    let cities = [
        "Aberdeen",
        "Armagh",
        "Bangor",
        "Bath",
        "Belfast",
        "Birmingham",
        "Bradford",
        "Brighton & Hove",
        "Bristol",
        "Cambridge",
        "Canterbury",
        "Cardiff",
        "Carlisle",
        "Chelmsford",
        "Chester",
        "Chichester",
        "Coventry",
        "Derby",
        "Derry",
        "Dundee",
        "Durham",
        "Edinburgh",
        "Ely",
        "Exeter",
        "Glasgow",
        "Gloucester",
        "Hereford",
        "Inverness",
        "Kingston upon Hull",
        "Lancaster",
        "Leeds",
        "Leicester",
        "Lichfield",
        "Lincoln",
        "Lisburn",
        "Liverpool",
        "London",
        "Manchester",
        "Newcastle upon Tyne",
        "Newport",
        "Newry",
        "Norwich",
        "Nottingham",
        "Oxford",
        "Perth",
        "Peterborough",
        "Plymouth",
        "Portsmouth",
        "Preston",
        "Ripon",
        "St Albans",
        "St Asaph",
        "St Davids",
        "Salford",
        "Salisbury",
        "Sheffield",
        "Southampton",
        "Stirling",
        "Stoke-on-Trent",
        "Sunderland",
        "Swansea",
        "Truro",
        "Wakefield",
        "Wells",
        "Westminster",
        "Winchester",
        "Wolverhampton",
        "Worcester",
        "York",
    ];

    // Place city names to the dropdown menu
    cities.forEach((city) => {

        // Append each name to the dropdown menu as an option

        dropdownMenu.append("option")
            .text(city)
            .property("value", city);
    });

    // Make a variable for the first sample name
    //let first = cities[0];

    // Call functions for plots
    //getCurrent(first);
};

//d3.select("#sample-metadata").html("");  



function getCurrent(cityID) {
    let queryURL = baseURL + "?q=" + cityID + "&key=" + key + "&aqi=no";
    d3.json(queryURL).then((data) => {
        console.log(data);
        createMap(data);
    });
}

let markersLayer = new L.LayerGroup();

function createMap(params) {
    markersLayer.clearLayers();
    marker = L.marker(params["location"])
        .bindPopup("<h1>City Name: " + params["location"]["name"]
            + "<br><h2>Current temperature: " + params["current"]["temp_c"]
            + "<br><h3>Feels like: " + params['current']["feelslike_c"] + "<br><h4>Conditions: "
            + params["current"]["condition"]["text"])
    markersLayer.addLayer(marker);
    //.addTo(myMap);   
}

markersLayer.addTo(myMap);
// getCurrent(cityID);


function updateCharts(cityID) {
    // humidity
    let queryURL = baseURL + "?q=" + cityID + "&key=" + key + "&aqi=no";
    d3.json(queryURL).then((data) => {
        let chart_data_humidity = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: data.current.humidity,
                title: { text: "Humidity" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 50 },
                gauge: { axis: { range: [null, 100] } },
            },
        ];

        let layout_humidity = { width: 250, height: 250 };
        Plotly.newPlot("gaugeHumidity", chart_data_humidity, layout_humidity);

        // uv
        let chart_data_uv = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: data.current.uv,
                title: { text: "UV" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 6 },
                gauge: { axis: { range: [null, 12] } },
            },
        ];

        let layout_uv = { width: 250, height: 250 };
        Plotly.newPlot("gaugeUV", chart_data_uv, layout_uv);

        // temperature
        let chart_data_temperature = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: data.current.temp_c,
                title: { text: "Temperature" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 50 },
                gauge: { axis: { range: [null, 100] } },
            },
        ];

        let layout_temperature = { width: 250, height: 250 };
        Plotly.newPlot("gaugeTemperature", chart_data_temperature, layout_temperature);
    }
    )};

function optionChanged(cityID) {
            getCurrent(cityID);
            updateCharts(cityID);
        }

init();

//Map with markers for the cities current weather
//let cityList = ["London", "Chicago"];
// let tempList = [];
// let feelsLike = [];
// let condition = [];
//let cityList = ["London"];
//let markerList = [];


// cityList.forEach((city) => {
//     let queryURL = baseURL + "?q=" + city + "&key=" + key + "&aqi=no";
//     d3.json(queryURL).then((data) => {
//         //console.log(data["current"]["temp_c"])
//         tempList.push(data["current"]["temp_c"]);
//         feelsLike.push(data["current"]["feelslike_c"]);
//         condition.push(data["current"]["condition"]["text"]);
//         tempKelli = data["current"]["temp_c"];

//         L.marker(data["location"])
//             .bindPopup(tempKelli[0])
//             .addTo(myMap);




//     });


// });

// console.log(tempList);
// console.log(feelsLike);
// console.log(condition);

