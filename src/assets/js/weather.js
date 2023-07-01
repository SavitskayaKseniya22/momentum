//https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=en&appid=3cfc2bf3738bb671a43ba8071181895a&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
let weatherError = document.querySelector(".weather-error")
let city = document.querySelector(".city")





function printWeather(input) {
    checkMakeStorageProp(myStorage, "city", "Minsk")
    input.value = myStorage.city
    getWeather(input)
}

printWeather(city)



async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${myStorage.language}&appid=3cfc2bf3738bb671a43ba8071181895a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod == "404" || data.cod == "400") {
        weatherError.classList.remove("hidden")
        weatherIcon.className = ""
        temperature.textContent = "";
        weatherDescription.textContent = "";
        wind.textContent = "";
        humidity.textContent = "";
    } else {
        weatherError.classList.add("hidden")
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (myStorage.language == "en") {
            wind.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${Math.ceil(data.main.humidity)}%`;
        } else {
            wind.textContent = `Скорость ветра: ${Math.ceil(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${Math.ceil(data.main.humidity)}%`;
        }
    }
}

city.addEventListener("change", function () {
    getWeather(city)
    myStorage.city = city.value

})

function translateCity() {
    let objTranslate = {
        en: "Minsk",
        ru: "Минск"
    }
    myStorage.city = objTranslate[myStorage.language]
    city.value = objTranslate[myStorage.language]
    /*
    if (myStorage.city == 'Minsk') {
        myStorage.city = 'Минск';
        city.value = 'Минск'
    } else if (myStorage.city == 'Минск') {
        myStorage.city = 'Minsk';
        city.value = 'Minsk'
    }*/
}