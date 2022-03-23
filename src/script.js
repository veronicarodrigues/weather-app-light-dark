let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.querySelector("#date-time").innerHTML = `${day} ${hour}:${minutes}`;

function defaultInfo() {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let city = "Stockholm";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCity);
}

defaultInfo();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 forecast-background" id="col-2">
          <div class="weather-forecast-date" id="weather-forecast-date">${formatDay(
            forecastDay.dt
          )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="icon" width="42" />
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

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCity(fullData) {
  let city = fullData.data.name;
  let country = fullData.data.sys.country;
  let descriptionElement = document.querySelector("#description");
  let dateTime = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = fullData.data.main.temp;
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = fullData.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    fullData.data.wind.speed
  );
  descriptionElement.innerHTML = fullData.data.weather[0].description;
  dateTime.innerHTML = formatDate(fullData.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${fullData.data.weather[0].icon}@2x.png`
  );
  getForecast(fullData.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let cityInput = document.querySelector("#search-city-input");
  let cityClean = cityInput.value.trim();
  let apiUrl = `${apiEndpoint}?q=${cityClean}&appid=${apiKey}&units=${unit}`;
  if (cityClean.length > 0) {
    axios.get(apiUrl).then(getCity);
  } else {
    alert(`Please type a city`);
  }
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

function displayPositionForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 forecast-background" id="col-2">
          <div class="weather-forecast-date" id="weather-forecast-date">${formatDay(
            forecastDay.dt
          )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="icon" width="42" />
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

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getPositionForecast(coordinates) {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayPositionForecast);
}

function getCurrentInfo(data) {
  let city = data.data.name;
  let country = data.data.sys.country;
  let temperatureCelisus = Math.round(data.data.main.temp);
  let dateTime = document.querySelector("#date-time");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  document.querySelector("#temperature").innerHTML = temperatureCelisus;
  document.querySelector("#humidity").innerHTML = data.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(data.data.wind.speed);
  dateTime.innerHTML = formatDate(data.data.dt * 1000);
  descriptionElement.innerHTML = data.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
  );
  getPositionForecast(data.data.coord);
}

function showPosition(position) {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCurrentInfo);
}

function searchCurrent(askLocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", searchCurrent);

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function turnDark(event) {
  event.preventDefault();

  document.getElementById("weather-app").style.background = "rgb(29, 29, 29)";
  document.getElementById("source-link").style.color = "rgb(128, 105, 191)";

  document.getElementById("fahrenheit-link").style.color =
    "rgb(128, 105, 191, 0.8)";
  document.getElementById("celsius-link").style.color =
    "rgb(128, 105, 191, 0.8)";

  let textTheme = Array.from(document.getElementsByClassName("text-theme"));
  let forecast = Array.from(
    document.getElementsByClassName("forecast-background")
  );
  let forecastDate = Array.from(
    document.getElementsByClassName("weather-forecast-date")
  );
  let forecastTemperatures = Array.from(
    document.getElementsByClassName("weather-forecast-temperatures")
  );
  let githubLink = Array.from(document.getElementsByClassName("github-link"));
  let seacrhCityInput = Array.from(
    document.getElementsByClassName("search-city-input")
  );

  textTheme.forEach((text) => {
    text.style.color = "rgb(128, 105, 191)";
  });
  forecast.forEach((forecast) => {
    forecast.style.background = "rgb(208, 188, 255)";
    forecast.style.color = "rgb(29, 29, 29)";
  });
  forecastDate.forEach((date) => {
    date.style.color = "rgb(5, 5, 5)";
  });
  forecastTemperatures.forEach((temp) => {
    temp.style.color = "rgb(5, 5, 5)";
  });
  githubLink.forEach((links) => {
    links.style.color = "rgb(208, 188, 255)";
  });
  seacrhCityInput.forEach((search) => {
    search.style.color = "rgb(202, 197, 202";
    search.style.background = "rgb(96, 93, 98, 0.2)";
    search.style.border = "1px solid white";
  });
}

document.querySelector(".theme-toggle-button").addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
  document.querySelector(".weather-app").classList.toggle("dark");
  document.querySelector(".search-city-input").classList.toggle("dark");
  document.querySelector(".theme-toggle-button").classList.toggle("dark");
  document.querySelector("h1").classList.toggle("dark");
  document.querySelector("small").classList.toggle("dark");
  const li = document.querySelectorAll("li");
  li.forEach((el) => {
    el.classList.toggle("dark");
  });
  const span = document.querySelectorAll("span");
  span.forEach((el) => {
    el.classList.toggle("dark");
  });
  const a = document.querySelectorAll("a");
  a.forEach((el) => {
    el.classList.toggle("dark");
  });
  const forecastCol = document.querySelectorAll(".col-2");
  forecastCol.forEach((el) => {
    el.classList.toggle("dark");
  });
});
