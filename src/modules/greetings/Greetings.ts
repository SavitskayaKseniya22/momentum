import ActualDate from '../actualDate/ActualDate';
import './Greetings.scss';

class Greetings extends HTMLDivElement {
  timeOfDay: string;

  name: string;

  constructor() {
    super();
    this.timeOfDay = ActualDate.getTimeOfDay();
    this.name = Greetings.readStore() || '';
    this.dataset.id = 'greetings-toggle';
    this.className = 'greetings title_big';
  }

  static readStore() {
    return window.localStorage.getItem('greetingsName');
  }

  static writeStore(greetingsName: string) {
    window.localStorage.setItem('greetingsName', greetingsName);
  }

  addListener() {
    this.querySelector('.greetings__name')?.addEventListener(
      'input',
      (event: Event) => {
        const { target } = event;
        if (target && target instanceof HTMLInputElement) {
          Greetings.writeStore(target.value);
        }
      }
    );
  }

  render() {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <span class="greetings__title" data-i18n="greetings.${this.timeOfDay}"></span>
      <input type="text" placeholder="[Enter name]" data-i18n="[placeholder]greetings.placeholder" class="greetings__name" value="${this.name}"  />
    `
    );
  }

  connectedCallback() {
    this.render();
    this.addListener();
  }
}

export default Greetings;
