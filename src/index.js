function formatDate(timestamp) {
  let today = new Date(timestamp * 1000);
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
}

let citySearch = document.querySelector("#weather-search");
citySearch.addEventListener("submit", searchCityAndTemperature);

function searchCityAndTemperature(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let shownCity = document.querySelector("#city-name");
  shownCity.innerHTML = currentCity.value;
  let units = "metric";
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDetails);
}
function showDetails(response) {
  let temperature = document.querySelector("#actualDegree");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = `Description: ${response.data.weather[0].description}`;
  let cityHumidity = document.querySelector("#current-humidity");
  cityHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatDate(`${day}, ${hour}:${minutes}`);
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
