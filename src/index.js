let today = new Date();
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
let hour = today.getHours();
let minutes = today.getUTCMinutes();

function formatDate() {
  let currentDate = document.querySelector("#current-date");
  console.log(currentDate);
  currentDate.innerHTML = `${day}, ${hour}:${minutes}`;
}
formatDate(today);

let citySearch = document.querySelector("#weather-search");
citySearch.addEventListener("submit", showCityAndTemperature);

function showCityAndTemperature(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let shownCity = document.querySelector("#city-name");
  shownCity.innerHTML = currentCity.value;
  let units = "metric";
  apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showDescription);
  axios.get(apiUrl).then(showHumidity);
  axios.get(apiUrl).then(showWind);
}
function showTemperature(response) {
  let temperature = document.querySelector("#actualDegree");
  temperature.innerHTML = Math.round(response.data.main.temp);
}
function showDescription(response) {
  let description = document.querySelector("#description");
  description.innerHTML = `Description: ${response.data.weather[0].description}`;
}
function showHumidity(response) {
  let cityHumidity = document.querySelector("#current-humidity");
  cityHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}
function showWind(response) {
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  console.log(response);
}
function showCityName(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}
function currentDetails(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showDetails);
}

function showDetails(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showDescription);
  axios.get(apiUrl).then(showHumidity);
  axios.get(apiUrl).then(showWind);
  axios.get(apiUrl).then(showCityName);
}
let useCurrentLocationButton = document.querySelector("button");
useCurrentLocationButton.addEventListener("click", currentDetails);
