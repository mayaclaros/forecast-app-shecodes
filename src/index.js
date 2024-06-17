function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = formatDate(date);

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "24b9b3ae0f6ea728ao45f6et261b0962";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Los Angeles");

let forecast = document.querySelector("#forecast");
forecast.innerHTML = `
    <div class="row">
            <div class="column-2">
                <div class="weather-forecast-date">               Thu</div> 
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png" 
                alt=""
                width="42"
                />
                <div clsss="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max">
                    <strong>18°</strong></span> <span class="weather-forecast-temperature-min">
                     12°</span>
            </div></div>
</div>
         </div>
          </div>
          <div class="weather-app-temperature-container">
            <div id="icon"></div>
         <div class="weather-app-temperature" id="temperature"></div>
          <div class="weather-app-unit">°C</div>
        </div>
`;
