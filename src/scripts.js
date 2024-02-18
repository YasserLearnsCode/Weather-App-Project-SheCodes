function searchWeather(event) {
  event.preventDefault();
  let searchInputelement = document.querySelector("#js-search-form-input");
  let cityInput = searchInputelement.value;
  let cityName = document.querySelector("#js-city-element");
  cityName.innerHTML = cityInput;
}

let searchForm = document.querySelector("#js-search-form");
searchForm.addEventListener("submit", searchWeather);
