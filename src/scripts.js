function cityTemperature(response) {
  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#js-temp-element");
  tempElement.innerHTML = temp;

  let cityElement = document.querySelector("#js-city-element");
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "1d4e1fa31e8d90b62bfb5t73ob432508";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(cityTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#js-search-form-input");

  searchCity(searchInputElement.value);
}

let searchForm = document.querySelector("#js-search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Vancouver");
