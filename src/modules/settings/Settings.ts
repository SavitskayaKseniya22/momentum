import './settings.scss';

class Settings {
  storage: Storage;
  inputs: string[];
  constructor() {
    this.storage = window.localStorage;
    this.inputs = [
      'time-toggle',
      'date-toggle',
      'greetings-toggle',
      'quote-toggle',
      'weather-toggle',
      'player-toggle',
      'todolist-toggle',
    ];
  }
  addListener() {
    document.addEventListener('click', async (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest('.settings__toggle')) {
          const popup = document.querySelector('.settings__popup');
          popup?.classList.toggle('hidden');
        }
      }
    });
    this.inputs.forEach((id) => {
      this.toggleBlockVisibility(id);
    });
  }

  checkTagInitialValue() {
    return this.storage.getItem('imageTag') || '';
  }

  checkImageSourceInitialValue(inputSource: string) {
    const source = this.storage.getItem('imageSource') || 'github';
    return source === inputSource ? 'checked' : '';
  }

  checkImageSourceForDisabledTag() {
    const source = this.storage.getItem('imageSource');
    return source === 'github' ? 'disabled' : '';
  }

  toggleBlockVisibility(id: string) {
    const checkbox = document.querySelector(`input[id='${id}']`);
    checkbox?.addEventListener('change', () => {
      const assotiatedBlock = document.querySelector(`[data-id='${id}']`);
      const checked = (checkbox as HTMLInputElement).checked;
      console.log(checkbox);
      if (checked) {
        console.log(1);
        assotiatedBlock?.classList.remove('invisible');
      } else {
        console.log(2);
        assotiatedBlock?.classList.add('invisible');
      }
    });
  }

  content() {
    return `<div class="settings">
  <div class="settings__popup hidden">
    <h3>Settings</h3>
    <ul class="settings__popup-content">
      <li class="popup-content__column">
        <div class="settings__item">
          <h4>Visibility:</h4>
          <ul>
            <li>
              <label for="time">Time</label>
              <input type="checkbox" id="time-toggle" checked />
            </li>
            <li>
              <label for="date">Date</label>
              <input type="checkbox" id="date-toggle" checked />
            </li>
            <li>
              <label for="greetings">Greeting</label>
              <input type="checkbox" id="greetings-toggle" checked />
            </li>
            <li>
              <label for="quote">Quote</label>
              <input type="checkbox" id="quote-toggle" checked />
            </li>
            <li>
              <label for="weather">Weather</label>
              <input type="checkbox" id="weather-toggle" checked />
            </li>
            <li>
              <label for="player">Audio</label>
              <input type="checkbox" id="player-toggle" checked />
            </li>
            <li>
              <label for="todolist">Todolist</label>
              <input type="checkbox" id="todolist-toggle" checked />
            </li>
          </ul>
        </div>
      </li>
      <li class="popup-content__column">
        <div class="settings__item">
          <h4>Photo source:</h4>
          <ul class="background-source">
            <li>
              <label for="github">Github</label>
              <input type="radio" name="background-source"
              class="background-source__option" id="github"
              ${this.checkImageSourceInitialValue('github')} />
            </li>
            <li>
              <label for="unsplash">Unsplash</label>
              <input type="radio" name="background-source"
              class="background-source__option" id="unsplash"
              ${this.checkImageSourceInitialValue('unsplash')} />
            </li>
            <li>
              <label for="flickr">Flickr</label>
              <input type="radio" name="background-source"
              class="background-source__option" id="flickr"
              ${this.checkImageSourceInitialValue('flickr')} />
            </li>
          </ul>
        </div>
        <div class="settings__item">
          <h4>Query:</h4>
          <input
            type="text"
            id="search-query"
            class="background-source__query"
            value="${this.checkTagInitialValue()}"
          />
        </div>
        <div class="settings__item">
          <h4>Language:</h4>
          <ul class="language">
            <li>
              <label for="en">English</label>
              <input type="radio" name="language" id="en" checked />
            </li>
            <li>
              <label for="ru">Russian</label>
              <input type="radio" name="language" id="ru" />
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <button class="settings__toggle" title="toggle settings">
    <i class="bx bxs-cog"></i>
  </button>
</div>`;
  }
}

export default Settings;
