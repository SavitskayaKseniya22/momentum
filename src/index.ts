import ChangeBackgroundButtons from './modules/background/changeBackgroundButtons/ChangeBackgroundButtons';
import ActualDate from './modules/actualDate/ActualDate';
import Greetings from './modules/greetings/Greetings';
import Footer from './modules/footer/footer';
import Quote from './modules/quote/quote';
import Settings from './modules/settings/Settings';
import TodoList from './modules/todolist/TodoList';
import Weather from './modules/weather/Weather';
import Player from './modules/player/Player';
import 'boxicons';
import './i18n';
import 'normalize.css';
import './style.scss';

customElements.define('greetings-custom', Greetings, { extends: 'div' });
customElements.define('quote-custom', Quote, { extends: 'div' });
customElements.define('footer-custom', Footer, { extends: 'div' });
customElements.define('date-custom', ActualDate, { extends: 'div' });
customElements.define('todo-custom', TodoList, { extends: 'div' });
customElements.define('weather-custom', Weather, { extends: 'div' });
customElements.define('settings-custom', Settings, { extends: 'div' });
customElements.define('background-custom', ChangeBackgroundButtons, {
  extends: 'div',
});

customElements.define('player-custom', Player, { extends: 'div' });

function App() {
  return `
    <main>
    <div is="player-custom"></div>
    <div is="background-custom"></div>
    <div is="date-custom"></div>
    <div is="greetings-custom"></div>
    <div is="weather-custom"></div>
    <div is="todo-custom"></div>
    <div is="quote-custom"></div>
    <div is="settings-custom"></div>
    </main>
    <div is="footer-custom"></div>
    `;
}

document.body.insertAdjacentHTML('afterbegin', App());
