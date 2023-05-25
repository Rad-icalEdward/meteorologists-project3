# meteorologists-project3

Data Extraction from API to Database

For this project, weather data from weatherapi.com has been used to create an interactive and user-friendly weather dashboard. Firstly, a” UK cities” (uk_cities) list has been created and cities data has been extracted using Python codes in Jupyter Notebook:
 
 ![image](https://github.com/Rad-icalEdward/meteorologists-project3/assets/121508137/10122955-45ec-40b9-bb68-04f6f9525787)
 
![image](https://github.com/Rad-icalEdward/meteorologists-project3/assets/121508137/a000cb99-cddf-46c9-90f8-859fa5217038)

Json data has been exported to Json file and saved. 
In MongoDB database and collection have been created and Json file has been imported to a database.

![image](https://github.com/Rad-icalEdward/meteorologists-project3/assets/121508137/8126c85a-f137-43f0-b4a1-d3c09828d454)

 ![image](https://github.com/Rad-icalEdward/meteorologists-project3/assets/121508137/0a0d9389-b742-4a36-9ece-17906639c0ad)

 
Dropdown Menu and Gauge Charts

As in whole project, Javascript codes have been used for functions of dropdown menu to choose a city. Temperature, humidity, and UV gauge charts (indicators) have been created with plotly.js visualization library.

//Dropdown menu and Humidity, UV, Temperature Indicator
let api_key = "";

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


//getting data from API
function getData(city) {
  const base = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;
  return fetch(base).then((response) => {
    return response.json();
  });
}
//creating function for dropdown
//grab the elements from HTML file
function dropDown() {
  let selection = d3.select("#selDataset");

  cities.forEach((city) => {
    selection.append("option").text(city).property("value", city);
  });
}


function optionChanged(city) {
  console.log(city);
  getData(city).then((data) => {
    console.log(data);
    updateCharts(data);
  });
}

function updateCharts(data) {
  // humidity
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
dropDown();

