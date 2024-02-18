function cityTemperature(response) {
  let temp = Math.round(response.data.temperature.current);
  console.log(temp);
  let tempElement = document.querySelector("#js-temp-element");
  tempElement.innerHTML = temp;
}

function searchCity(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#js-search-form-input");
  let cityElement = document.querySelector("#js-city-element");

  let city = searchInputElement.value;
  let apiKey = "1d4e1fa31e8d90b62bfb5t73ob432508";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  cityElement.innerHTML = city;

  axios.get(apiUrl).then(cityTemperature);
}

let searchForm = document.querySelector("#js-search-form");
searchForm.addEventListener("submit", searchCity);
