import ActualDate from '../actualDate/ActualDate';
import './Greetings.scss';

class Greetings {
  constructor() {}

  readStore() {
    const storage = window.localStorage;
    return storage.getItem('greetingsName');
  }

  writeStore(greetingsName: string) {
    const storage = window.localStorage;
    storage.setItem('greetingsName', greetingsName);
  }

  addListener() {
    document
      .querySelector('.greetings__name')
      ?.addEventListener('input', (event: Event) => {
        const { target } = event;
        if (target) {
          this.writeStore((target as HTMLInputElement).value);
        }
      });
  }

  content() {
    const timeOfDay = ActualDate.getTimeOfDay();
    return `<div class="greetings" data-id="greetings-toggle">
      <span class="greetings__title"><span data-i18n="greetings.${timeOfDay}">Good day</span>, </span>
      <input type="text" placeholder="[Enter name]" data-i18n="[placeholder]greetings.placeholder" class="greetings__name" value="${
        this.readStore() || ''
      }"  />
    </div>`;
  }
}

export default Greetings;
