// Global variables created
var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name-input");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-container");
var currentWeatherEl = document.querySelector("#current-weather-container");
var forecastEl = document.querySelector(".weather-container");
var cityListEl = document.querySelector("#city-list");
var deleteButton = document.querySelector(".delete-button");
var searchButton = document.querySelector(".search-button");

// Gets the latitude and longitude based on the city that is searched by the user
function getGeoLocation(cityName) {
    var apiKey = '311f49e649708ffa86c102b22a78e596';
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
            fiveDayForecastEl.innerHTML = '';
            
            var h3El = document.createElement("h3");
            h3El.textContent = data[0].name;
            currentWeatherEl.append(h3El);
        });
};

// Uses the latitude and longitude to get data on the weather
function getCityWeather(latitude, longitude) {
    console.log("Works!");

    var apiKey = '311f49e649708ffa86c102b22a78e596';
    var apiUrlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + apiKey;

    fetch(apiUrlWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Displaying current temperature information on browser
            var currenttempEl = document.createElement("div");
            currenttempEl.textContent = "Temp (in Farenheit): " + data.current.temp;

            var currentwindEl = document.createElement("div");
            currentwindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";

            var currenthumidityEl = document.createElement("div");
            currenthumidityEl.textContent = "Humidity: " + data.current.humidity + " %";

            var UVISpan = document.createElement("span")
            UVISpan.textContent = data.current.uvi


            var currentuvIndexEl = document.createElement("div");
            currentuvIndexEl.textContent = "UV Index: " + data.current.uvi;            

            // Changes background color of UV Index based on the severity level
            if (data.current.uvi < 2) {
                currentuvIndexEl.setAttribute("style", "background-color: #7dd943; color: white");
            } else if (data.current.uvi < 5) {
                currentuvIndexEl.setAttribute("style", "background-color: yellow");
            } else {
                currentuvIndexEl.setAttribute("style", "background-color: red; color: white");
            };

            var currentDateEl = document.createElement("div");
            var dt = data.current.dt;
            currentDateEl.textContent = '(' + (new Date(dt * 1000).toDateString()) + ')';

            var currentIconEl = document.createElement("img");
            currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");

            currentWeatherEl.append(currentIconEl, currentDateEl, currenttempEl, currentwindEl, currenthumidityEl, currentuvIndexEl);

            var headerHidden = document.querySelector(".header-hidden");
            headerHidden.removeAttribute("id");

            // For-loop to gather and display the weather for the next 5 days on the browser
            for (var i = 1; i < 6; i++) {
                var weatherCard = document.createElement("div");
                weatherCard.classList.add("weather-card");
                weatherCard.classList.add("col");
                var weatherContent = document.createElement("div");
                weatherContent.classList.add("card-content");

                var weatherDate = document.createElement("h6");
                var dt = data.daily[i].dt;
                weatherDate.textContent = '(' + (new Date(dt * 1000).toDateString()) + ')';

                var weatherIcon = document.createElement("img");
                weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");

                var tempEl = document.createElement("p");
                tempEl.textContent = "Temp (in Farenheit): " + data.daily[i].temp.day;

                var windEl = document.createElement("p");
                windEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

                var humidityEl = document.createElement("p");
                humidityEl.textContent = "Humidity: " + data.daily[i].humidity + " %";

                weatherContent.append(weatherDate, weatherIcon, tempEl, windEl, humidityEl);
                weatherCard.append(weatherContent);
                fiveDayForecastEl.append(weatherCard);
            }
        });
};

// Creating the city list under the search section
function historyList() {
    cityListEl.innerHTML = '';
    var searchHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];
    searchHistory.forEach(function (search) {
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute('style', 'background-color: #eba834; display: block; margin: 1px');
        buttonEl.textContent = search;
        buttonEl.addEventListener("click", function () {
            getGeoLocation(search);
        })
        cityListEl.append(buttonEl);
    })
}

// Adding cities to the local storage upon search
searchButton.addEventListener('click', function () {
    var citySearch = cityNameEl.value.trim();
    getGeoLocation(citySearch);
    var searchHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];
    searchHistory.push(citySearch);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    historyList();    
});

// Clears local storage and the list of previously searched cities on the screen
deleteButton.addEventListener("click", function () {
    localStorage.clear();
    cityListEl.innerHTML = '';
})

historyList();

