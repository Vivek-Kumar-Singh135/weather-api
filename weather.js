//Complete the Weather API Backend part using openweathermap api

function setCity() {
    let city = document.getElementById("search-box").value;
    document.getElementById("city").innerText = "";
    document.getElementById("date").innerText = "";
    document.getElementById("temp").innerText = "";
    document.getElementById("weather").innerText = "";
    document.getElementById("hi-low").innerText = "";
    getWeather(city);
}

let toCelcius = (f) => {
    return Math.ceil(f - 273.15);
}

let displayData = (data) => {
    document.getElementById("city").innerText = data.name + ", " + data.sys.country;
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    document.getElementById("date").innerText = day[today.getDay()] + " " + today.getDate() + " " + month[today.getMonth()] + " " + today.getFullYear();
    document.getElementById("temp").innerText = toCelcius(data.main.temp) + "°c";
    document.getElementById("weather").innerText = data.weather[0].main;
    document.getElementById("hi-low").innerText = toCelcius(data.main.temp_min) + "°c / " + toCelcius(data.main.temp_max) + "°c";
}

function fetchWeather(city) {
    console.log(city);
    let weather = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b82a4c065c88328e4f954235b3d56252")
        .then((res) => {
            return res.json();
        })
    return weather;
}


async function getWeather(city) {
    try {
        let data = await fetchWeather(city);
        console.log(data);
        displayData(data);
    } catch (err) {
        document.getElementById("date").innerText = "";
        document.getElementById("city").innerText = "City Not Found";
        return;
    }
}