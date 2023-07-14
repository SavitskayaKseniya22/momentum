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
  greetings: Greetings;
  actualDate: ActualDate;
  quote: Quote;
  weather: Weather;
  todoList: TodoList;
  player: Player;

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
    this.settings.addListener();
    this.changeBackgroundButtons.addListener();
    this.greetings.addListener();
    this.weather.addListener();
    this.todoList.addListener();
    this.player.addListener();
  }

  render() {
    const body = document.querySelector('body');
    if (body) {
      body.insertAdjacentHTML('afterbegin', '<main></main>');
      body.insertAdjacentHTML(
        'beforeend',
        this.changeBackgroundButtons.content()
      );
      body.insertAdjacentHTML('beforeend', this.player.content());
      body.insertAdjacentHTML('beforeend', this.todoList.content());
      body.insertAdjacentHTML('beforeend', this.weather.content());
      body.insertAdjacentHTML('beforeend', this.actualDate.content());
      body.insertAdjacentHTML('beforeend', this.greetings.content());
      body.insertAdjacentHTML('beforeend', this.settings.content());
      body.insertAdjacentHTML('beforeend', this.quote.content());
      body.insertAdjacentHTML('beforeend', this.footer.content());
    }

    return this;
  }
}

new App().render().addListener();
