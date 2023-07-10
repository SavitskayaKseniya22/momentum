//import "./assets/js/settings"
import './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
import ChangeBackgroundButtons from './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
import ActualDate from './modules/date/actualDate/ActualDate';
import { Greetings } from './modules/date/greetings/Greetings';
import Footer from './modules/footer/footer';
import Settings from './modules/settings/Settings';
//import "./assets/js/weather"
//import "./assets/js/quotes"
//import "./assets/js/todo"
import './style.scss';

class App {
  settings: Settings;
  footer: Footer;
  changeBackgroundButtons: ChangeBackgroundButtons;
  greetings: Greetings;
  actualDate: ActualDate;

  constructor() {
    this.footer = new Footer();
    this.changeBackgroundButtons = new ChangeBackgroundButtons();
    this.settings = new Settings();
    this.greetings = new Greetings();
    this.actualDate = new ActualDate();
  }

  addListener() {
    this.settings.addListener();
    this.changeBackgroundButtons.addListener();
    this.greetings.addListener();
  }

  render() {
    const body = document.querySelector('body');
    if (body) {
      body.insertAdjacentHTML('afterbegin', '<main></main>');
      body.insertAdjacentHTML(
        'beforeend',
        this.changeBackgroundButtons.content()
      );

      body.insertAdjacentHTML('beforeend', this.actualDate.content());
      body.insertAdjacentHTML('beforeend', this.greetings.content());
      body.insertAdjacentHTML('beforeend', this.settings.content());
      body.insertAdjacentHTML('beforeend', this.footer.content());
    }

    return this;
  }
}

new App().render().addListener();
