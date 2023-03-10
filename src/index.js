

function currentTime() {
    let week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let now = new Date();

    let dayWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    let dayTime = `Last updated: ${dayWeek} ${hours}:${minutes}`
    return dayTime;

}


function showTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let changeTemp = document.querySelector("#mainTemp");

    let hCity = document.querySelector("#city")
    hCity.innerHTML = response.data.name;

    let wind = document.querySelector("#wind")
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`


    let descriptions = document.querySelector("#descriptions")
    descriptions.innerHTML = response.data.weather[0].description;

    changeTemp.innerHTML = `${temp}℃`;

    let iconWeather = document.querySelector("#iconWeather");
    let iconId = response.data.weather[0].icon;
    iconWeather.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`)

    celsiumTemperature = response.data.main.temp;

    getForecastApi(response.data.coord)

}



function changeCity(event) {
    event.preventDefault();

    let inputResult = document.querySelector("#inputPassword");

    let cityValue = inputResult.value


    getDataWeather(cityValue, showTemp);

}

function changeMyLocation(response) {
    let hCity = document.querySelector("#city")
    hCity.innerHTML = response.data.name;
    let wind = document.querySelector("#wind")
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`


    let descriptions = document.querySelector("#descriptions")
    descriptions.innerHTML = response.data.weather[0].description;

    let temp = Math.round(response.data.main.temp);
    let changeTemp = document.querySelector("#mainTemp");
    changeTemp.innerHTML = `${temp}`;

}


function changeLocal() {
    function getCoord(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
        let weatherLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        axios.get(weatherLocal).then(changeMyLocation)

        let apiKeyForecast = "b400ae3b711a616262d18b0ca2cbe78f";
        let apiUrlF = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=${6}&appid=${apiKeyForecast}&units=metric`

        axios.get(apiUrlF).then(forecast)

    }
    navigator.geolocation.getCurrentPosition(getCoord);
    let date = document.querySelector("#date")
    date.innerHTML = currentTime();
}



function changeUnitOne(event) {
    event.preventDefault();
    let temp = document.querySelector("#mainTemp");

    temp.innerHTML = `${Math.round((celsiumTemperature * 9 / 5) + 32)}℉`;

    celsium.classList.remove("active");
    fareng.classList.add("active");
}

function showTempAgain(response) {
    let temp = Math.round(response.data.main.temp);
    let changeTemp = document.querySelector("#mainTemp");
    changeTemp.innerHTML = `${temp}℃`;


}

function changeUnitTwo(event) {
    event.preventDefault();
    let celsius = document.querySelector("#mainTemp");
    celsius.innerHTML = `${Math.round(celsiumTemperature)}℃`;

    fareng.classList.remove("active");
    celsium.classList.add("active");
}

function getCityValue(city) {

    getDataWeather(city, showTemp)
}

function getDataWeather(cityValue, functionValue) {

    let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

    axios.get(apiWeather).then(functionValue);
}

function formatDay(code) {
    let now = new Date(code * 1000)
    let dayNumber = now.getDay()
    let daysWeek = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    return daysWeek[dayNumber]

}


function forecast(response) {
    let forecastEl = document.querySelector("#forecast-box");
    let forecastHtml = ""
    let daysArray = response.data.daily


    daysArray.forEach((el, index) => {
        if (index < 6) {
            forecastHtml = forecastHtml + `<div class="col-2 forecast-one-day">
        ${formatDay(el.dt)}
        <img
          src="http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png"
          alt=""
          width="60px"
        />
        <span>${Math.round(el.temp.max)} | </span>
        <span class="forecast-min-tem">${Math.round(el.temp.min)}℃</span>
        </div>`

            forecastEl.innerHTML = forecastHtml
        }
    })


}


function getForecastApi(response) {
    let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&cnt=${6}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(forecast)

}

let date = document.querySelector("#date")
date.innerHTML = currentTime();

let celsium = document.querySelector("#cel")
celsium.addEventListener("click", changeUnitTwo)


let fareng = document.querySelector("#far")
fareng.addEventListener("click", changeUnitOne)

let local = document.querySelector("#local");
local.addEventListener("click", changeLocal)

let submit = document.querySelector("#form");
submit.addEventListener("submit", changeCity)

let celsiumTemperature = null;

getCityValue("Sydney");

