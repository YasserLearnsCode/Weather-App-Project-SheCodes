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

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let hourElement = document.querySelector("#js-hour");
  hourElement.innerHTML = hour;

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  getCityForecast(searchInputElement.value);
}

let searchForm = document.querySelector("#js-search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Vancouver");
getCityForecast("Vancouver")

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getCityForecast(city) {
  let apiKey = "1d4e1fa31e8d90b62bfb5t73ob432508";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateDailyForecast);
}

function updateDailyForecast(response) {
  
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast" id="js-forecast">
            <div class="row">
              <div class="col">
                <span id="js-forecast-day">${formatDay(day.time)}</span>
              </div>
              <div class="col">
                <span id="js-forecast-icon">
                <img src="${day.condition.icon_url}" /></span>
              </div>
              <div class="col">
                <div class="forecast-temp">
                  <strong> <span class="forecast-temp-max" id="js-forecast-temp-max">${Math.round(
                    day.temperature.maximum
                  )}</span>&deg; </strong> &nbsp; &nbsp;
                  <span id="js-forecast-temp-min"> &nbsp;${Math.round(
                    day.temperature.minimum
                  )}</span>&deg;
                </div>
              </div>
            </div>
          </div>`;
  });

  let forecastElement = document.querySelector("#js-forecast");
  forecastElement.innerHTML = forecastHtml;
}

updateDailyForecast();
