function getWeather() {
  var citySelect = document.getElementById('citySelect');
  var city = citySelect.value;

  if (city.length === 0) {
    alert('Please select a city.');
    return;
  }

  var unitDropdown = document.getElementById('unitDropdown');
  var selectedUnit = unitDropdown.value;

  var apiKey = '2a8f810358a1bee674f1761df0141885';
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      var data = response.data;
      showWeather(data);
      convertTemperature(selectedUnit);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function showWeather(data) {
  var dashboard = document.getElementById('weatherDashboard');
  dashboard.innerHTML = '';

  // Group forecasts by day
  var forecastsByDay = {};

  for (var i = 0; i < data.list.length; i++) {
    var forecast = data.list[i];
    var date = new Date(forecast.dt * 1000);
    var day = date.toDateString();

    if (!forecastsByDay[day]) {
      forecastsByDay[day] = forecast;
    }
  }

  // Display the most recent forecast for each day
  Object.keys(forecastsByDay).forEach(function (day) {
    var forecast = forecastsByDay[day];
    var date = new Date(forecast.dt * 1000);
    var temperature = forecast.main.temp;
    var description = forecast.weather[0].description;
    var weatherIconCode = forecast.weather[0].icon;

    var forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');

    var dateElement = document.createElement('div');
    dateElement.textContent = date.toDateString();
    forecastItem.appendChild(dateElement);

    var weatherIconElement = document.createElement('div');
    weatherIconElement.classList.add('weather-icon');
    weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIconCode}.png" alt="Weather Icon" class="weather-icon-img">`;
    forecastItem.appendChild(weatherIconElement);

    var temperatureElement = document.createElement('div');
    temperatureElement.classList.add('temperature');
    temperatureElement.dataset.temperature = temperature;
    temperatureElement.textContent = temperature + 'K';
    forecastItem.appendChild(temperatureElement);

    var descriptionElement = document.createElement('div');
    descriptionElement.textContent = description;
    forecastItem.appendChild(descriptionElement);

    dashboard.appendChild(forecastItem);
  });
}





function updateTemperatureUnit() {
  var selectedUnit = document.getElementById('unitDropdown').value;
  var temperatureElements = document.getElementsByClassName('temperature');

  for (var i = 0; i < temperatureElements.length; i++) {
    var temperature = temperatureElements[i].dataset.temperature;

    if (selectedUnit === 'celsius') {
      temperatureElements[i].textContent = convertKelvinToCelsius(temperature) + '°C';
    } else if (selectedUnit === 'fahrenheit') {
      temperatureElements[i].textContent = convertKelvinToFahrenheit(temperature) + '°F';
    } else {
      temperatureElements[i].textContent = temperature + 'K';
    }
  }
}

function convertKelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function convertKelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}
