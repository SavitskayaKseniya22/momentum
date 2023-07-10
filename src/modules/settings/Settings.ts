import ActualDate from '../../assets/js/date';
import './settings.scss';

class Settings {
  storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  addListener() {}

  checkTagInitialValue() {
    return this.storage.getItem('imageTag') || '';
  }

  checkImageSourceInitialValue(inputSource: string) {
    const source = this.storage.getItem('imageSource') || 'github';
    return source === inputSource ? 'checked' : '';
  }

  checkImageSourceForDisabledTag() {
    const source = this.storage.getItem('imageSource');
    return source === 'github' ? 'disabled' : ''; //reactive
  }

  content() {
    return `<div class="settings">
      <div class="settingsPopup transition">
        <h3>Settings</h3>
        <div>
          <h4>Visibility:</h4>
          <ul class="visibility">
            <li class="timeBlock">
              <label for="time">Time</label>
              <input type="checkbox" id="time" />
            </li>
            <li class="dateBlock">
              <label for="date">Date</label>
              <input type="checkbox" id="date" />
            </li>

            <li class="greetingBlock">
              <label for="greeting-container">Greeting</label>
              <input type="checkbox" id="greeting-container" />
            </li>

            <li class="quoteBlock">
              <label for="quote-container">Quote</label>
              <input type="checkbox" id="quote-container" />
            </li>

            <li class="weatherBlock">
              <label for="weather">Weather</label>
              <input type="checkbox" id="weather" />
            </li>

            <li class="audioBlock">
              <label for="player">Audio</label>
              <input type="checkbox" id="player" />
            </li>

            <li class="todolistBlock">
              <label for="todolist">Todolist</label>
              <input type="checkbox" id="todolist" />
            </li>
          </ul>
        </div>

        <div>
          <h4>Photo source:</h4>
          <ul class="background-source">
            <li>
              <label for="github">Github</label>
              <input type="radio" name="background-source" class="background-source__option" id="github" ${this.checkImageSourceInitialValue(
                'github'
              )}  />
            </li>
            <li>
              <label for="unsplash">Unsplash</label>
              <input type="radio" name="background-source" class="background-source__option" id="unsplash" ${this.checkImageSourceInitialValue(
                'unsplash'
              )} />
            </li>
            <li>
              <label for="flickr">Flickr</label>
              <input type="radio" name="background-source" class="background-source__option" id="flickr" ${this.checkImageSourceInitialValue(
                'flickr'
              )} />
            </li>
          </ul>
          <h4>Query:</h4>
          <input type="text" id="search-query" class="background-source__query" ${this.checkImageSourceForDisabledTag()} value="${this.checkTagInitialValue()}"  />

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
      </div>
      <button class="toggleSettings transition">
        <img src="assets/svg/settings.svg" alt="" />
      </button>
    </div>`;
  }
}

export default Settings;
