

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
    let time = now.getHours();
    let minutes = now.getMinutes();
    let dayTime = `${dayWeek} ${time}:${minutes}`
    return dayTime;
}

let date = document.querySelector("#date")
date.innerHTML = currentTime();

function showTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let changeTemp = document.querySelector("#mainTemp");
    console.log(response.data)

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


}



function changeCity(event) {
    event.preventDefault();

    let inputResult = document.querySelector("#inputPassword");

    let cityValue = inputResult.value

    let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

    axios.get(apiWeather).then(showTemp);
}
let submit = document.querySelector("#form");
submit.addEventListener("submit", changeCity)

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
    changeTemp.innerHTML = `${temp}℃`;
}


function changeLocal() {

    function getCoord(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
        let weatherLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        axios.get(weatherLocal).then(changeMyLocation)
    }
    navigator.geolocation.getCurrentPosition(getCoord)
}

let local = document.querySelector("#local");
local.addEventListener("click", changeLocal)


function changeUnitOne(event) {
    event.preventDefault();
    let temp = document.querySelector("#mainTemp");
    temp.innerHTML = "59℉";
}
let fareng = document.querySelector("#far")
fareng.addEventListener("click", changeUnitOne)

function showTempAgain(response) {
    let temp = Math.round(response.data.main.temp);
    let changeTemp = document.querySelector("#mainTemp");
    console.log(response.data)


    changeTemp.innerHTML = `${temp}℃`;


}

function changeUnitTwo(event) {
    event.preventDefault();
    let temp = document.querySelector("#mainTemp");

    let inputResult = document.querySelector("#inputPassword");

    let cityValue = inputResult.value

    let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

    axios.get(apiWeather).then(showTempAgain);

}
let celsium = document.querySelector("#cel")
celsium.addEventListener("click", changeUnitTwo)




