var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name-input");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-container");
var currentWeatherEl = document.querySelector(".current-weather-container");
var forecastEl = document.querySelector(".five-day-forecast-container");

function getGeoLocation(event) {
    event.preventDefault();
    var apiKey = '311f49e649708ffa86c102b22a78e596';
    var cityName = cityNameEl.value.trim();
    console.log(cityName);
    var apiUrlGeolocation = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    
    fetch(apiUrlGeolocation)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log(latitude, longitude);
        getCityWeather(latitude, longitude);

        var h3El = document.createElement("h3");
        h3El.textContent = data[0].name;
        currentWeatherEl.append(h3El);

        var h4El = document.createElement("h4");
        h4El.textContent = "5-Day Forecast:";
        forecastEl.append(h4El);

      });
};

function getCityWeather(latitude, longitude) {
    var apiKey = '311f49e649708ffa86c102b22a78e596';
    var apiUrlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + apiKey;

    fetch(apiUrlWeather)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var tempEl = document.createElement("div");
        tempEl.textContent = "Temp (in Farenheit): " + data.current.temp;
        var windEl = document.createElement("div");
        windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
        var humidityEl = document.createElement("div");
        humidityEl.textContent = "Humidity: " + data.current.humidity + " %";
        var uvIndexEl = document.createElement("div");
        uvIndexEl.textContent = "UV Index: " + data.current.uvi;

        currentWeatherEl.append(tempEl);
        currentWeatherEl.append(windEl);
        currentWeatherEl.append(humidityEl);
        currentWeatherEl.append(uvIndexEl);

      });
};

searchFormEl.addEventListener('submit', getGeoLocation);
