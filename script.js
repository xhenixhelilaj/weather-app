// Day and Time //

function formatDate (timestamp){
  let date = new Date (timestamp);
  let p = document.querySelector("p");
  let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  let day = days[date.getDay()];
  let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
  ];
  let month = months[now.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`
  };
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`
  };

  p.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;
}

function displayTemperature (response) {
  let temperatureInput = document.querySelector ("#temperature");
  let cityInput = document.querySelector ("#city");
  let descriptionInput = document.querySelector ("#description");
  let humidityInput = document.querySelector("#humidity");
  let windInput = document.querySelector("#wind");
  let dateInput = document.querySelector ("#date");

  temperatureInput.innerHTML= Math.round(response.data.main.temp):
  cityInput.innerHTML = response.data.name;
  descriptionInput.innerHTML = response.data.weather[0].description;
  humidityInput.innerHTML = response.data.main.humidity;
  windInput.innerHTML = response.data.wind.speed;
  date.innerHTML = formatDate (response.data.dt*1000)
}

let apiKey = "4b314f77d77d39ad00e3f1ae01186f3d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);


// Fahreneit //

function convertToFahreineit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let backroundImage = "https://image.shutterstock.com/image-photo/weather-forecast-background-climate-change-260nw-1124541077.jpg";
  if (temperature > 7 === backroundImage)
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahreneitLink = document.querySelector("#fahreneit");
fahreneitLink.addEventListener("click", convertToFahreineit);


// Humidity and Wind //

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = "4b314f77d77d39ad00e3f1ae01186f3d";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// change backround //



