import i18next from 'i18next';
import { checkLanguage, translateContent } from '../../i18n';
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
    document.addEventListener('click', (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest('.settings__toggle')) {
          const popup = document.querySelector('.settings__popup');
          popup?.classList.toggle('hidden');
        }
      }
    });

    this.addLIstenerForVisibilityCheckboxes(this.inputs);

    window.addEventListener('beforeunload', () => {
      this.storeVisibilityCheckboxes();
    });

    window.addEventListener('load', () => {
      this.restoreVisibilityCheckboxes();
      const lang = checkLanguage();
      const langInputChecked = document.querySelector(`input[id="${lang}"]`);
      langInputChecked?.setAttribute('checked', 'checked');
    });

    document.querySelectorAll("input[name='language']")?.forEach((elem) => {
      elem.addEventListener('change', (event) => {
        const lang = (event.target as HTMLInputElement).id;
        i18next.changeLanguage(lang);
      });
    });
  }

  setCheckedInput(inputList: string[]) {
    inputList.forEach((elem: string) => {
      const input = document.querySelector(`#${elem}`);
      if (input) {
        input.setAttribute('checked', 'checked');
      }
    });
  }

  setCheckedBlock(inputList: string[]) {
    const elementsWithId = document.querySelectorAll(`[data-id]`);
    elementsWithId.forEach((elem) => {
      const id = (elem as HTMLElement).dataset.id;
      if (id && !inputList.includes(id)) {
        elem.classList.add('invisible');
      }
    });
  }

  restoreVisibilityCheckboxes() {
    const storage = window.localStorage;
    const checkedInputs = storage.getItem('checkedInputs');
    if (checkedInputs) {
      const arrayOfInputs = JSON.parse(checkedInputs);
      this.setCheckedInput(arrayOfInputs);
      this.setCheckedBlock(arrayOfInputs);
    } else {
      this.setCheckedInput(this.inputs);
      this.setCheckedBlock(this.inputs);
    }
  }

  storeVisibilityCheckboxes() {
    const storage = window.localStorage;
    const checkedInputs: string[] = [];
    document
      .querySelectorAll('.settings__visibility input:checked')
      .forEach((elem) => {
        checkedInputs.push(elem.id);
      });
    storage.setItem('checkedInputs', JSON.stringify(checkedInputs));
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

  addLIstenerForVisibilityCheckboxes(inputs: string[]) {
    inputs.forEach((id) => {
      const checkbox = document.querySelector(`input[id='${id}']`);
      checkbox?.addEventListener('change', () => {
        const assotiatedBlock = document.querySelector(`[data-id='${id}']`);
        const checked = (checkbox as HTMLInputElement).checked;
        if (checked) {
          assotiatedBlock?.classList.remove('invisible');
        } else {
          assotiatedBlock?.classList.add('invisible');
        }
      });
    });
  }

  content() {
    return `<div class="settings">
  <div class="settings__popup hidden">
    <h3>Settings</h3>
    <ul class="settings__popup-content">
      <li class="popup-content__column">
        <div class="settings__item">
          <h4 data-i18n="settings.visibility.visibility">Visibility:</h4>
          <ul class="settings__visibility">
            <li>
              <label for="time" data-i18n="settings.visibility.time">Time</label>
              <input type="checkbox" id="time-toggle" />
            </li>
            <li>
              <label for="date" data-i18n="settings.visibility.date">Date</label>
              <input type="checkbox" id="date-toggle" />
            </li>
            <li>
              <label for="greetings" data-i18n="settings.visibility.greetings">Greetings</label>
              <input type="checkbox" id="greetings-toggle" />
            </li>
            <li>
              <label for="quote" data-i18n="settings.visibility.quote">Quote</label>
              <input type="checkbox" id="quote-toggle" />
            </li>
            <li>
              <label for="weather" data-i18n="settings.visibility.weather">Weather</label>
              <input type="checkbox" id="weather-toggle" />
            </li>
            <li>
              <label for="player" data-i18n="settings.visibility.player">Player</label>
              <input type="checkbox" id="player-toggle" />
            </li>
            <li>
              <label for="todolist" data-i18n="settings.visibility.todolist">Todolist</label>
              <input type="checkbox" id="todolist-toggle" />
            </li>
          </ul>
        </div>
      </li>
      <li class="popup-content__column">
        <div class="settings__item">
          <h4 data-i18n="settings.source.title">Photo source</h4>
          <ul class="background-source">
            <li>
              <label for="github" >Github</label>
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
          <h4 data-i18n="settings.search.title">Query:</h4>
          <input
            type="text"
            id="search-query"
            data-i18n="[placeholder]settings.search.placeholder"
            class="background-source__query"
            value="${this.checkTagInitialValue()}"
          />
        </div>
        <div class="settings__item">
          <h4 data-i18n="settings.lang.title">Language:</h4>
          <ul class="language">
            <li>
              <label for="en" data-i18n="settings.lang.en">English</label>
              <input type="radio" name="language" id="en"/>
            </li>
            <li>
              <label for="ru" data-i18n="settings.lang.ru">Russian</label>
              <input type="radio" name="language" id="ru" />
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <button class="settings__toggle" data-i18n="[title]settings.toggle" title="toggle settings">
    <i class="bx bxs-cog"></i>
  </button>
</div>`;
  }
}

export default Settings;
