# Project 3 Data Visualisations for Data Analytics Bootcamp
<h2> The Meteorologists</h2>

<strong>REQUIREMENTS</strong>
<ul>
  <li>Data and Delivery (25 points)
    <ul>
    <li>Data components used in the project are clearly documented. (5 points)
    <li>The dataset contains at least 100 unique records. (5 points)
    <li>A database is used to house the data (SQL, MongoDB, SQLite, etc.). (5 points)
    <li>The project is powered by a Python Flask API and includes HTML/CSS, JavaScript, and the chosen database. (10 points)
    </ul>
  <li>Back End (25 points)
    <ul>
      <li>The page created to showcase data visualizations runs without error. (7.5 points)
      <li>A JavaScript library not shown in class is used in the project. (7.5 points)
      <li>The project conforms to one of the following designs: (10 points)
      <li>A Leaflet or Plotly chart built from data gathered through web scraping
      <li>A dashboard page with multiple charts that all reference the same data
    </ul>  
  <li>Visualizations (25 points)
    <ul>
      <li>A minimum of three unique views present the data. (5 points)
      <li>Multiple user-driven interactions (such as dropdowns, filters, or a zoom feature) are included on the final page. (5 points)
      <li>The final page displays visualizations in a clear, digestible manner. (5 points)
      <li>The data story is easy to interpret for users of all levels. (10 points)
    </ul>  
  <li>Group Presentation (25 points)
    <ul>
      <li>All group members speak during the presentation. (5 points)
      <li>The content is relevant to the project. (5 points)
      <li>The presentation maintains audience interest. (5 points)
      <li>Content, transitions, and conclusions flow smoothly within any time restrictions. (10 points)
    </ul>
</ul>

<strong>Vera Styles</strong><br><br>
To combine the codes from the contributors:
<ul><li>Dropdown menu was created with the list of cities. After assigning all the needed functions, the final function (optionChanged) was made to call all the functions, triggered by the cityID.</ul>

To display the map with the markers:

<ul><li>A function was created (getCurrent). This function makes an API call to fetch the current weather information. The parameters needed for the marker pop up are then called (the name of the city, current temperature in  Celcius, what the temperature feels like and conditions (e.g. Clear, Cloudy etc.). 

<li>The issue that became clear, was the map getting populated with markers after the dropdown menu option was changing, and the new marker was bveing added to the old one. The more options were chosen, the more markers   were appearing on the map. This issue was solved by adding a layer to display the markers and clearing the layer on change of option.</ul>

<strong>Julia Begley</strong><br><br>
To combine the codes from the contributors:

![image (1)](https://github.com/Rad-icalEdward/meteorologists-project3/assets/121570218/2ea868b5-51ab-4246-bdb4-a7246ba418cf)

<ul>
  <li>Created a wireframe mock up to help visualise the plan (see above)
  <li>Updated the basic html and css files to add titles, update formatting, adjust spacing etc.
  <li>Added columns and dashboard layout for the webpage through the html and css files
  <li>Added my code into the file Vera created combining her code with Isil's
  <li>Made minor adjustments to the combined javascript code to make sure it all worked together and with the html and css files
</ul>

To display the current day's sunrise time, sunset time & moon phase and a pie chart of weather conditions over the past year in the chosen city:
<ul>
  <li>I created 2 functions - updateSunMoon and updateWeatherConditions. 
  <li>The first function (updateSunMoon) makes an API request to the 'astronomy' portion of WeatherApi and uses a d3 JSON call to extract the sunrise time, sunset time and moon phase for the current day in the chosen city. It then pulls fixed sunrise and sunset icons to display alongside the sunrise and sunset time information, and also pulls a dynamic moon phase image to match the current moon phase text that is displayed.
<li>My second function (updateWeatherConditions) takes the current date and calculates the date 1 year before, then completes a for loop to collect a list of every date between the past date and the current date. Then it completes another for loop through the list of dates. First the loop converts the given date into the correct format to use for an API request to the 'history' portion of WeatherAPI, then adds it into the API request URL and makes a d3 JSON call to extract the weather condition for that day and add it to a list. Next, the loop does a count of each unique value and adds this to an object. Finally, it takes the keys and values from that object to create a pie chart showing the distribution of different weather conditions over the past year for the chosen city.
  
<li>The biggest issue I had with this code was with finding a way to count the unqiue values in my list of weather conditions that would create an enumerable object so I could then extract the keys and values for the pie chart. For example, I used this code at first but it created an object that could not have the keys and values extracted:
  
  ```
  for(var x = 0; x < weatherDetails.length; ++x) {
                if(!result[weatherDetails[x]])
                    result[weatherDetails[x]] = 0;
                    ++result[weatherDetails[x]];
                };
  ```
                                           
<li>I also had trouble with the correct placement of different parts of the code and making sure I was able to call the data and variables I needed. I have not fully resolved this and my pie chart generates live in the browser as the for loop runs - I would have preferred for it to appear once the code has run, but I now actually think this looks quite cool as long as you have a fast PC!</ul>

<strong>Isil Bulut</strong><br><br>

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

