//import "./assets/js/settings"
//import "./assets/js/date"
import './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
import ChangeBackgroundButtons from './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
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

  constructor() {
    this.footer = new Footer();
    this.changeBackgroundButtons = new ChangeBackgroundButtons();
    this.settings = new Settings();
  }

  addListener() {
    this.settings.addListener();
    this.changeBackgroundButtons.addListener();
  }

  render() {
    const body = document.querySelector('body');
    body?.insertAdjacentHTML('afterbegin', '<main></main>');
    body?.insertAdjacentHTML(
      'beforeend',
      this.changeBackgroundButtons.content()
    );
    body?.insertAdjacentHTML('beforeend', this.settings.content());
    body?.insertAdjacentHTML('beforeend', this.footer.content());
    return this;
  }
}

new App().render().addListener();
