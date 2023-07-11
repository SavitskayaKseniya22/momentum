import ActualDate from '../actualDate/ActualDate';
import './Greetings.scss';

export class Greetings {
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
      ?.addEventListener('change', async (event: Event) => {
        const { target } = event;
        if (target) {
          this.writeStore((target as HTMLInputElement).value);
        }
      });
  }

  content() {
    const timeOfDay = ActualDate.getTimeOfDay();
    return `<div class="greetings">
      <span class="greetings__title">Good ${timeOfDay}, </span>
      <input type="text" placeholder="[Enter name]" class="greetings__name" value="${
        this.readStore() || ''
      }"  />
    </div>`;
  }
}
