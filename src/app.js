function formatDate (timestamp){
let date = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${formatHours (timestamp)}`
}

function formatHours (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}` ;
   }
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}` ;
   }
    return `${hours}:${minutes}`
}


function displayTemperature (response){
    let cityElement = document.querySelector ("#city");
    let temperatureNumberElement = document.querySelector("#temperature-number");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector ("#humidity");
    let windElement = document.querySelector ("#wind");
    let dateElement = document.querySelector ("#date");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML= response.data.name;
    temperatureNumberElement.innerHTML= Math.round(response.data.main.temp); 
    descriptionElement.innerHTML = response.data.weather[0].main;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate (response.data.dt * 1000);
}

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = null;
    forecastElement.innerHTML = null;

    for (let index = 0; index < 6; index++) {
        let forecast = response.data.list[index];
        forecastElement.innerHTML += `
        <div class="col-2">
          <h3>
             ${formatHours(forecast.dt*1000)}
          </h3>
          <div class="weather-forecast-temperature">
             <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
          </div>
        </div>`                
    }

    

    console.log(response.data);
}

function search (city){
let apiKey = "4b314f77d77d39ad00e3f1ae01186f3d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit (event) {
    event.preventDefault ();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahreneitTemperature (event){
    event.preventDefault ();
    let temperatureElement = document.querySelector("#temperature-number");
    celsiusLink.classList.remove("active");
    fahreneitLink.classList.add("active");
    let fahreneitTemperature = (celsiusTemperature * 9/5) + 32;
    temperatureElement.innerHTML= Math.round(fahreneitTemperature);
}

function displayCelsiusTemperature (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-number");
    celsiusLink.classList.add("active");
    fahreneitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector ("#search-form");
form.addEventListener("submit", handleSubmit);

let fahreneitLink = document.querySelector("#fahreneit-link");
fahreneitLink.addEventListener("click", displayFahreneitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New Delhi")
