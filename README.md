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
<strong>Data selection</strong>
<ul>
  <li>We initially wanted to use the OpenWeather API but realised we could not access historical data with the free plan, which we thought was important to show trends or changes over time.
  <li>So we chose to switch to the WeatherAPI which allowed us to access that historical data.
  <li>We looked through the WeatherAPI documentation to decide what we wanted to use for our visualisations.
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

<ul>
  <li>A key issue I had with the HTML, CSS and formatting was with the Plotly charts that have a large amount of white space that I did not figure out how to remove. I tried multiple methods for changing the margins, padding and clipping both in the HTML and CSS files and in the Plotly code itself. In the end I think the final result is OK though.

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
                                           
<li>I also had trouble with finding the best way to call the data I needed. I have not fully resolved this, I would have preferred to store or cache the data to limit the amount of API calls needed. This means pie chart generates live in the browser as the for loop runs, but I do think this looks quite cool as long as you are able to make the API calls and have a fast PC!
<li>I also really wanted to combine the weather condition types as there are a lot of similar ones that make it harder to analyse the results. However, this was something I ran out of time to do.</ul>
<br><br>
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

<strong>Lewis Russell</strong><br><br>

I began by using Javascript and HTML to create a weather dashboard that would allow the user to enter any given city using a search function to then be provided with the current weather for that day as well as the forecast for the next four days for that city.
As well as the weather forecast it would also return the date, the temperature, a brief description of the weather along with a symbol to describe it. I also included a drop down menu which enabled the use to alternate the units of temperature between Celsius, Farenheit or Kelvin.

Due to the fact that my code relied on a search function as opposed to a drop down menu which others members of the group had used we struggled to combine everyone's individual code into one functioning dashboard. We tried to get around this by removing the search function and changing it to a drop down with a list of pre-defined cities, however we still couldn't overcome the challenge of getting all of the different functions on to the same dashboard. Due to the limited time constraints that we had for this project, the decision was made to leave my weather forecast out of the final dashboard, but it has still been included in th final submission as an additional visualisation and to highlight one of the challenges that we faced.

![image (2)](https://github.com/Rad-icalEdward/meteorologists-project3/assets/121570218/32b264ea-c7eb-440a-b621-bbfcdb65f628)

