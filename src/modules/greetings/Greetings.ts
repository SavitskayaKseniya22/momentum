import ActualDate from '../actualDate/ActualDate';
import './Greetings.scss';

class Greetings {
  name: string;
  constructor() {
    this.name = this.readStore() || '';
  }

  readStore() {
    return window.localStorage.getItem('greetingsName');
  }

  writeStore(greetingsName: string) {
    window.localStorage.setItem('greetingsName', greetingsName);
  }

  addListener() {
    document
      .querySelector('.greetings__name')
      ?.addEventListener('input', (event: Event) => {
        const { target } = event;
        if (target && target instanceof HTMLInputElement) {
          this.writeStore(target.value);
        }
      });
  }

  content() {
    const timeOfDay = ActualDate.getTimeOfDay();
    return `<div class="greetings" data-id="greetings-toggle">
      <span class="greetings__title" data-i18n="greetings.${timeOfDay}">Good day, </span>
      <input type="text" placeholder="[Enter name]" data-i18n="[placeholder]greetings.placeholder" class="greetings__name" value="${this.name}"  />
    </div>`;
  }
}

export default Greetings;
