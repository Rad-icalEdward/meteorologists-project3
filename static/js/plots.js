
//http://api.weatherapi.com/v1/current.json?key=ae8ef28fcaed48ce892193914231705&q=London&aqi=no


const baseURL = "http://api.weatherapi.com/v1";
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
    let queryURL = baseURL + "/current.json" + "?q=" + cityID + "&key=" + key + "&aqi=no";
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
    let queryURL = baseURL + "/current.json" + "?q=" + cityID + "&key=" + key + "&aqi=no";
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
                title: { text: "UV"},
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
    
// Create a function to return sun and moon information for the current city
function updateSunMoon(cityID) {

    // Create a function to call an image based on a selected source 
    function imageSunMoon(src, alt, width, height) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.width = width;
        img.height = height;
        img.id = "moon-img";
        document.getElementById("astronomy").appendChild(img);
    };

    // Create varaibles for each of the mooon phase images
    let newMoon = 'static/Images/moon-phases/noun-newmoon-1832266.svg';
    let waxingCrescent = 'static/Images/moon-phases/noun-waxing-crescent-moon-1832256.svg';
    let firstQuarter = 'static/Images/moon-phases/noun-first-quarter-half-moon-1832262.svg';
    let waxingGibbous = 'static/Images/moon-phases/noun-waxing-gibbous-moon-1832268.svg';
    let fullMoon = 'static/Images/moon-phases/noun-fullmoon-1832267.svg';
    let waningGibbous = 'static/Images/moon-phases/noun-waning-gibbous-moon-1832269.svg';
    let thirdQuarter = 'static/Images/moon-phases/noun-three-quartet-half-moon-1832259.svg';
    let waningCrescent = 'static/Images/moon-phases/noun-waning-crescent-moon-1832261.svg';

    // Create varaibles for the sunrise and sunset images
    let sunRise = 'static/Images/sun-rise-set/noun-sunrise-1504951.svg';
    let sunSet = 'static/Images/sun-rise-set/noun-sunset-1504950.svg';

        // Create the first query URl adding the astronomy json selection, chosen city and API key
        let currentQueryURL = baseURL + "/astronomy.json" + "?q=" + cityID + "&key=" + key;
        console.log(currentQueryURL);
        
        // Extract the json data from the astronomy weather API
        d3.json(currentQueryURL).then(function(data) {

            // Create a variable to select the astronomy div for the content
            let astrologyDiv = document.getElementById("astronomy");
            
            // Return the sunrise time for the current day and the sunrise image
            let sunriseTime = data.astronomy.astro.sunrise;
            console.log(sunriseTime);
            astrologyDiv.innerHTML += "Time of today's sunrise: " + sunriseTime + "<br /><br /><br />"; 
            imageSunMoon(sunRise, "sunrise by icon 54 from Noun Project", 100, 100)
            
            // Return the sunset time time for the current day and the sunset image
            let sunsetTime = data.astronomy.astro.sunset;
            console.log(sunsetTime);
            astrologyDiv.innerHTML += "<br /><br />Time of today's sunset: " + sunsetTime + "<br /><br /><br />"; 
            imageSunMoon(sunSet, "sunset by icon 54 from Noun Project", 100, 100)
            
            // Return the moon phase for the current night and the corresponding moon phase image
            let moonPhase = data.astronomy.astro.moon_phase;
            astrologyDiv.innerHTML += "<br /><br />Today's moon phase: " + moonPhase + "<br /><br /><br />";
            
            if (moonPhase == "New Moon") {
                let src = newMoon;
                let alt = "Moon by Kateryna Hnidash from Noun Project"
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "Waxing Crescent") {
                let alt = "Waxing Crescent Moon by Kateryna Hnidash from Noun Project"
                let src = waxingCrescent;
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "First Quarter") {
                let alt = "first quarter half moon by Kateryna Hnidash from Noun Project";
                let src = firstQuarter;
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "Waxing Gibbous") {
                let alt = "Waxing Gibbous Moon by Kateryna Hnidash from Noun Project";
                let src = waxingGibbous;
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "Full Moon") {
                let alt = "Moon by Kateryna Hnidash from Noun Project";
                let src = fullMoon;
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "Waning Gibbous") {
                let alt = "Waning Gibbous Moon by Kateryna Hnidash from Noun Project";
                let src = waningGibbous;
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "Third Quarter") {
                let alt = "three quartet half moon by Kateryna Hnidash from Noun Project";
                let src = thirdQuarter;
                imageSunMoon(src, alt, 100, 120);
            } else if (moonPhase == "Waning Cresecent") {
                let alt = "Waning Crescent Moon by Kateryna Hnidash from Noun Project";
                let src = waningCrescent;
                imageSunMoon(src, alt, 100, 120);
            };
            
            console.log(moonPhase);
    });
};
    
// Create function to return a chart with distribution of weather conditions for the chosen city over the previous 365 days
function updateWeatherConditions(cityID) {
    
    // Create a function that will count the unique values in the generated list of weather conditions
    function countNew(data) {
        var counting = data.split(',');
    
        counting.forEach(function(entry) {
            newCount[entry] = (newCount[entry] || 0) + 1;
        })
    };

    // Create an object to hold the count of unqiue weather conditions values
    var newCount = {};

    // Get today's date and the date 365 days ago
    let currentDate = new Date();
    console.log(currentDate);

    let pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - 365);
    console.log(pastDate);

    let daysOfYear = [];

    // Create an array to hold weather details.
    let weatherDetails = [];

    // Create a for loop to make API calls for each date from 365 days previously until today
    for (let d = pastDate; d <= currentDate; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d));
    };

    for (let i = 0; i < daysOfYear.length; i++) {

        // Create a variable for the date in each loop, adding 1 day each time
        let loopDate = daysOfYear[i];

        // Create variables for the year, month and day for each date (month is +1 because it is a numeric value with index 0)
        let newQueryYear = loopDate.getFullYear(); 
        let newQueryMonth = loopDate.getMonth()+1;
        let newQueryDay = loopDate.getDate();

        // 'Clean' the query dates to add leading 0s where neeeded
        let cleanQueryMonth = newQueryMonth.toString().padStart(2, "0");
        let cleanQueryDay = newQueryDay.toString().padStart(2, "0");

        // Create variable for the query dates for the historical data call
        let newQueryDate = newQueryYear + "-" + cleanQueryMonth + "-" + cleanQueryDay;

        // Create the second query URl adding the history json selection, chosen city, API key and dates for the historical data call
        let historicalQueryURL = baseURL + "/history.json"  + "?q=" + cityID + "&dt=" + newQueryDate + "&key=" + key;

        // Extract the json data from the history weather API
        d3.json(historicalQueryURL).then(function(data) {

            // For each date extract the weather condition for the chosen city
            let weatherDetail = data.forecast.forecastday[0].day.condition.text;

            // Add the weather condition text to a list of weather conditions for all dates
            weatherDetails.push(weatherDetail);
        
        // Call the function to count the unique values in the list of all weather conditions
        weatherDetails.forEach(countNew);
        console.log(newCount);
        
        // Create a function to create a chart showing the distribution of weather conditions for the chosen city over the previous 365 days
        function createChartData() {
            let labels = Object.keys(newCount);
            let values = Object.values(newCount);

            var data = [{
                values: values,
                labels: labels,
                type: 'pie',
                textposition: 'inside'
                }];
                
                var layout = {
                height: 510,
                width: 500,
                margin: {
                    l: 0
                },
                legend: {
                    traceorder: 'normal',
                    font: {
                        family: 'Sanchez, serif',
                        size: 12,
                        color: '#000'
                    }
                }
                }
                
                Plotly.newPlot("city-weather", data, layout);

        };
        // Call the function to create the chart after the data is collected
        createChartData();
        });
    };
};

// Create a function to clear the contents of the astronomy div, ready for the next call when the city is updated
function clearSunMoon(elementID)
{
    document.getElementById(elementID).innerHTML = "";
};

// Call all functions when the city is updated in the drop down list
function optionChanged(cityID) {
    clearSunMoon("astronomy");
    getCurrent(cityID);
    updateCharts(cityID);
    updateSunMoon(cityID);
    updateWeatherConditions(cityID);
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

