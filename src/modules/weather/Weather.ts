import { WeatherTypes } from '../../interfaces';
import './weather.scss';

const OPENWEATHER_API_KEY = '3cfc2bf3738bb671a43ba8071181895a';

export class Weather {
  initialQuery: string;
  constructor() {
    this.initialQuery = this.readStore() || '';
    if (this.initialQuery) {
      this.updateWeather(this.initialQuery, OPENWEATHER_API_KEY);
    }
  }

  readStore() {
    const storage = window.localStorage;
    return storage.getItem('weatherQuery');
  }

  writeStore(weatherQuery: string) {
    const storage = window.localStorage;
    storage.setItem('weatherQuery', weatherQuery);
  }

  addListener() {
    document
      .querySelector('.weather__query')
      ?.addEventListener('change', async (event: Event) => {
        this.updateErrorContainer('clear');
        const query = (event.target as HTMLInputElement).value;
        this.writeStore(query);
        if (query) {
          this.updateWeather(query, OPENWEATHER_API_KEY);
        }
      });
  }

  async getWeather(query: string, apiKey: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  async updateWeather(query: string, apiKey: string) {
    try {
      const weatherResponse: WeatherTypes = await this.getWeather(
        query,
        apiKey
      );
      this.updateWeatherContainer('fill', weatherResponse);
    } catch (error) {
      this.updateErrorContainer('fill', error);
      this.updateWeatherContainer('clear');
      console.error(error);
    }
  }

  updateErrorContainer(type: 'fill' | 'clear', error?: unknown) {
    const errorContainer = document.querySelector('.weather__error');
    if (errorContainer && error && type === 'fill') {
      errorContainer.textContent = `${error}. Please, repeate search with different data.`;
    } else if (errorContainer && type === 'clear') {
      errorContainer.textContent = '';
    }
  }

  updateWeatherContainer(
    type: 'fill' | 'clear',
    weatherResponse?: WeatherTypes
  ) {
    const weatherDetails = document.querySelector('.weather__details');
    const weatherIcon = document.querySelector('.weather__details_icon i');
    const temperatureContainer = document.querySelector(
      '.weather__details_temperature span'
    );
    const weatherDescription = document.querySelector(
      '.weather__details_description span'
    );
    const windContainer = document.querySelector('.weather__details_wind span');
    const humidityContainer = document.querySelector(
      '.weather__details_humidity span'
    );

    if (type === 'fill' && weatherResponse) {
      weatherDetails?.classList.remove('hidden');
      const { main, wind, weather } = weatherResponse;

      if (weatherIcon && weather[0]) {
        weatherIcon.className = `owf owf-${weather[0].id}`;
      }
      if (temperatureContainer && main) {
        temperatureContainer.textContent = main.temp.toString();
      }
      if (
        weatherDescription &&
        weather &&
        weather[0] &&
        weather[0].description
      ) {
        weatherDescription.textContent = weather[0].description;
      }
      if (windContainer && wind) {
        windContainer.textContent = wind.speed.toString();
      }
      if (humidityContainer && main && main.humidity) {
        humidityContainer.textContent = main.humidity.toString();
      }
    } else if (type === 'clear') {
      weatherDetails?.classList.add('hidden');
    }
  }

  content() {
    return `<div class="weather"  data-id="weather-toggle">
      <input type="text" class="weather__query" placeholder="Enter city name" value="${this.initialQuery}" />
      <div class="weather__error"></div>
      <div class="weather__details">
        <div class="weather__details_icon"><i class="owf"></i></div>
        <div class="weather__details_temperature">Temperature: <span></span> °C</div>
        <div class="weather__details_description">Description: <span></span> </div>
        <div class="weather__details_wind">Wind: <span></span> m/s</div>
        <div class="weather__details_humidity">Humidity: <span></span> %</div>
      </div>
      
    </div>`;
  }
}
