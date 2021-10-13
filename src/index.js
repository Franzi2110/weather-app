function formatDate(timestamp) {
  let today = new Date(timestamp);
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  return `${day}, ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row justify-content-between">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
              class="forecast-icon"/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
  console.log(forecastHtml);
}

function getForecast(coordinates) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

let citySearch = document.querySelector("#weather-search");
citySearch.addEventListener("submit", searchCityAndTemperature);

function searchForCity(city) {
  let units = "metric";
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDetails);
}
function searchCityAndTemperature(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let shownCity = document.querySelector("#city-name");
  shownCity.innerHTML = searchForCity(currentCity.value);
}

function showDetails(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = document.querySelector("#actualDegree");
  temperature.innerHTML = Math.round(celsiusTemperature);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let cityHumidity = document.querySelector("#current-humidity");
  cityHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `Last updated: ${formatDate(
    response.data.dt * 1000
  )}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let showHint = response.data.weather[0].icon;
  if (showHint === "09d" || showHint === "10d") {
    document.querySelector("#hint").innerHTML =
      "Don't forget your umbrella! ☔";
  } else {
    if (showHint === "01d") {
      document.querySelector("#hint").innerHTML =
        "Don't forget your sunglasses! 🕶";
    } else {
      document.querySelector("#hint").innerHTML = "";
    }
  }
  getForecast(response.data.coord);
}
function showCityName(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}
function currentDetails(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showDetailsCurrentPosition);
}

function showDetailsCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDetails);
  axios.get(apiUrl).then(showCityName);
}
let useCurrentLocationButton = document.querySelector("button");
useCurrentLocationButton.addEventListener("click", currentDetails);

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#actualDegree");
  temperature.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#actualDegree");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusTemperature = null;

searchForCity("München");
