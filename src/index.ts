import ChangeBackgroundButtons from "./modules/background/changeBackgroundButtons/ChangeBackgroundButtons";
import ActualDate from "./modules/actualDate/ActualDate";
import Greetings from "./modules/greetings/Greetings";
import Footer from "./modules/footer/footer";
import Quote from "./modules/quote/quote";
import Settings from "./modules/settings/Settings";
import TodoList from "./modules/todolist/TodoList";
import Weather from "./modules/weather/Weather";
import Player from "./modules/player/Player";
import playlist from "./assets/json/playlist.json";
import "boxicons";
import "./i18n";
import "normalize.css";
import "./style.scss";

class App {
  settings: Settings;

  quote: Quote;

  weather: Weather;

  player: Player;

  constructor() {
    this.settings = new Settings();
    this.quote = new Quote();
    this.weather = new Weather();
    this.player = new Player(playlist);
  }

  addListener() {
    Greetings.addListener();
    this.settings.addListener();
    ChangeBackgroundButtons.addListener();
    Weather.addListener();
    TodoList.addListener();
    this.player.addListener();
  }

  content() {
    return `
    <main>
    ${ChangeBackgroundButtons.content()}
    ${this.player.content()}
    ${ActualDate.content()}
    ${Greetings.content()}
    ${this.weather.content()}
    ${TodoList.content()}
    ${this.quote.content()}
    ${this.settings.content()}
    </main>
    ${Footer.content()}
    `;
  }

  render(container: HTMLBodyElement) {
    container.insertAdjacentHTML("afterbegin", this.content());
    return this;
  }
}

const body = document.querySelector("body");
if (body) {
  new App().render(body).addListener();
}
