let date = new Date();

function currentTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dayElement = document.querySelector("#js-day");
  dayElement.innerHTML = day;

  let hour = date.getHours();
  let hourElement = document.querySelector("#js-hour");
  hourElement.innerHTML = hour;

  let minutes = date.getMinutes();
  let minutesElement = document.querySelector("#js-minutes");
  minutesElement.innerHTML = minutes;
}

function cityTemperature(response) {
  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#js-temp-element");
  tempElement.innerHTML = temp;

  let cityElement = document.querySelector("#js-city-element");
  cityElement.innerHTML = response.data.city;

  let conditionsElement = document.querySelector("#js-conditions");
  conditionsElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#js-humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#js-wind-speed");
  windSpeedElement.innerHTML = Math.round(windSpeed);
}

function searchCity(city) {
  let apiKey = "1d4e1fa31e8d90b62bfb5t73ob432508";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(cityTemperature);
  currentTime();
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#js-search-form-input");

  searchCity(searchInputElement.value);
}

let searchForm = document.querySelector("#js-search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Vancouver");
