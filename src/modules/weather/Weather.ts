import { checkLanguage, localize } from "../../i18n";
import { WeatherTypes } from "../../interfaces";
import "./weather.scss";

const OPENWEATHER_API_KEY = "3cfc2bf3738bb671a43ba8071181895a";

class Weather {
  initialQuery: string;

  constructor() {
    this.initialQuery = Weather.readStore() || "";
    if (this.initialQuery) {
      Weather.updateWeather(this.initialQuery, OPENWEATHER_API_KEY);
    }
  }

  static readStore() {
    return window.localStorage.getItem("weatherQuery");
  }

  static writeStore(weatherQuery: string) {
    window.localStorage.setItem("weatherQuery", weatherQuery);
  }

  static addListener() {
    document
      .querySelector(".weather__query")
      ?.addEventListener("change", (event: Event) => {
        const query = (event.target as HTMLInputElement).value;
        Weather.writeStore(query);
        if (query) {
          Weather.updateWeather(query, OPENWEATHER_API_KEY);
        }
      });
  }

  static async getWeather(query: string, apiKey: string) {
    const lang = checkLanguage();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=${lang}`;
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  static async updateWeather(query: string, apiKey: string) {
    try {
      const weatherResponse: WeatherTypes = await Weather.getWeather(
        query,
        apiKey
      );
      Weather.updateWeatherContainer(weatherResponse);
      Weather.updateErrorContainer();
    } catch (error) {
      Weather.updateWeatherContainer();
      Weather.updateErrorContainer(error);
    }
  }

  static updateErrorContainer(error?: unknown) {
    const errorContainer = document.querySelector(".weather__error");
    if (errorContainer) {
      errorContainer.innerHTML = error ? `${error}<br>` : "";
      if (error) {
        errorContainer.setAttribute("data-i18n", "[append]weather.error");
        localize(".weather__error");
      } else {
        errorContainer.removeAttribute("data-i18n");
      }
    }
  }

  static updateWeatherContainer(weatherResponse?: WeatherTypes) {
    const weatherDetails = document.querySelector(".weather__details");
    if (weatherDetails) {
      weatherDetails.innerHTML = weatherResponse
        ? Weather.createWeatherDetails(weatherResponse)
        : "";
    }
  }

  static createWeatherDetails(weatherResponse: WeatherTypes) {
    const { main, wind, weather } = weatherResponse;
    const { temp, humidity } = main;
    const { id, description } = weather[0];
    return `
      
      <i class="owf owf-${id} weather__details_icon"></i>
      <div class="weather__details_temperature">
        <h4 data-i18n="weather.temperature">Temperature: </h4>
        <span class="weather__detail">${temp}</span>°C
      </div>
      <div class="weather__details_description">
        <h4 data-i18n="weather.description">Description: </h4>
        <span class="weather__detail">${description}</span>
      </div>
      <div class="weather__details_wind">
        <h4 data-i18n="weather.wind">Wind: </h4>
        <span class="weather__detail">${wind.speed}</span>m/s
      </div>
      <div class="weather__details_humidity">
        <h4 data-i18n="weather.humidity">Humidity: </h4>
        <span class="weather__detail">${humidity}</span>%
      </div>
    `;
  }

  content() {
    return `<div class="weather"  data-id="weather-toggle">
      <input type="text" class="weather__query" placeholder="Enter city name" data-i18n="[placeholder]weather.placeholder" value="${this.initialQuery}" />
      <div class="weather__error"></div>
      <div class="weather__details"></div>
    </div>`;
  }
}

export default Weather;
