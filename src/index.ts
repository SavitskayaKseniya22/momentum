import './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
import ChangeBackgroundButtons from './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
import ActualDate from './modules/date/actualDate/ActualDate';
import { Greetings } from './modules/date/greetings/Greetings';
import Footer from './modules/footer/footer';
import { Quote } from './modules/quote/quote';
import Settings from './modules/settings/Settings';
import { TodoList } from './modules/todolist/TodoList';
import { Weather } from './modules/weather/Weather';
import 'boxicons';

import 'normalize.css';
import './style.scss';
import { Player } from './modules/player/Player';
import playlist from './assets/json/playlist.json';

class App {
  settings: Settings;
  footer: Footer;
  changeBackgroundButtons: ChangeBackgroundButtons;

  quote: Quote;
  weather: Weather;
  todoList: TodoList;
  player: Player;

  actualDate: ActualDate;
  greetings: Greetings;

  constructor() {
    this.footer = new Footer();

    this.changeBackgroundButtons = new ChangeBackgroundButtons();
    this.settings = new Settings();
    this.greetings = new Greetings();
    this.actualDate = new ActualDate();
    this.quote = new Quote();
    this.weather = new Weather();
    this.todoList = new TodoList();
    this.player = new Player(playlist);
  }

  addListener() {
    this.greetings.addListener();
    this.settings.addListener();
    this.changeBackgroundButtons.addListener();
    this.weather.addListener();
    this.todoList.addListener();
    this.player.addListener();
  }

  content() {
    return `
   
    <main>
    ${this.changeBackgroundButtons.content()}
    ${this.player.content()}
    ${this.actualDate.content()}
    ${this.greetings.content()}
    ${this.weather.content()}
    ${this.todoList.content()}
    ${this.quote.content()}
    </main>
    ${this.footer.content()}
    `;
  }

  render() {
    const body = document.querySelector('body');

    if (body) {
      body.insertAdjacentHTML('afterbegin', this.content());
      body.insertAdjacentHTML('beforeend', this.settings.content());
    }

    return this;
  }
}

new App().render().addListener();
