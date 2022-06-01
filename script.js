var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name-input");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-container");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
    console.log(cityName);

    if (cityName) {
        getCityWeather(cityName);
        cityNameEl.value = '';
    } else {
        alert("Please enter a valid city name.");
    }
};

var getCoordinates = function (cityName) {
    var apiUrlGeolocation = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=311f49e649708ffa86c102b22a78e596';

    fetch(apiUrlGeolocation)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
};


var getCityWeather = function (latitude, longitude) {
    var apiUrlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '.44&lon=' + longitude + '-94.04&exclude=alerts&units=imperial&appid=311f49e649708ffa86c102b22a78e596';

};

searchFormEl.addEventListener('submit', formSubmitHandler);

