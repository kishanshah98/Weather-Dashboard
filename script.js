var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name-input");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-container");
var currentWeatherEl = document.querySelector(".current-weather-container");
var forecastEl = document.querySelector(".five-day-forecast-container");
var cityListEl = document.querySelector("#cities-list");

function getGeoLocation(event) {
    event.preventDefault();
    var apiKey = '311f49e649708ffa86c102b22a78e596';
    var cityName = cityNameEl.value.trim();
    storeCities(cityName)
    cityNameEl.value = '';
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

        currentWeatherEl.innerHTML = '';
        forecastEl.innerHTML = '';
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

        var currenttempEl = document.createElement("div");
        currenttempEl.textContent = "Temp (in Farenheit): " + data.current.temp;

        var currentwindEl = document.createElement("div");
        currentwindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";

        var currenthumidityEl = document.createElement("div");
        currenthumidityEl.textContent = "Humidity: " + data.current.humidity + " %";

        var currentuvIndexEl = document.createElement("div");
        currentuvIndexEl.textContent = "UV Index: " + data.current.uvi;

        if (data.current.uvi < 2) {
            currentuvIndexEl.setAttribute("style", "background-color: #7dd943");
        } else if (data.current.uvi < 5) {
            currentuvIndexEl.setAttribute("style", "background-color: yellow");
        } else {
            currentuvIndexEl.setAttribute("style", "background-color: red");
        };

        var currentDateEl = document.createElement("div");
        var dt = data.current.dt;
        currentDateEl.textContent = '(' + (new Date(dt * 1000).toDateString()) + ')';

        var currentIconEl = document.createElement("img");
        currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");

        currentWeatherEl.append(currentIconEl, currentDateEl, currenttempEl, currentwindEl, currenthumidityEl, currentuvIndexEl);

        // var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png");

      });
};

function storeCities(cityName) {
    var cityList = JSON.parse(localStorage.getItem('cityList')) || [];
    cityList.push(cityName);
    localStorage.setItem('cityList', JSON.stringify(cityList));
    //renderCityList();
};


// function renderCityList() {
//     var cityList = JSON.parse(localStorage.getItem('cityList'));
//     cityListEl.innerHTML = '';
//     for (var i = 0; i < cityList.length; i++) {
//         var cityLil = document.createElement("li");
//         cityLil.textContent = cityList[i];
//         cityListEl.append(cityLil);
//     }
// }

//renderCityList();

searchFormEl.addEventListener('submit', getGeoLocation);


// weatherCard.append(title);
// for (var i = 0; i < 5; i++) {
//     var cardContent = $("<div>").addClass("card-content");
//     var dt = response.daily[i].dt;
//     var date = $("<p>").text(new Date(dt * 1000).toDateString());
//     var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png");
//     var temp = $("<p>").text("Temp (F): " + Math.floor(response.daily[i].temp.day));
//     var humidity = $("<p>").text("Humidity: " + Math.floor(response.daily[i].humidity));
//     var windSpeed = $("<p>").text("Wind Speed (MPH): " + Math.floor(response.daily[i].wind_speed));
//     cardContent.append(icon, date, temp, humidity, windSpeed);
//     weatherCard.append(cardContent);
//     weatherDiv.append(weatherCard);