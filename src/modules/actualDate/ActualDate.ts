import { ActualDateType } from '../../interfaces';
import './ActualDate.scss';
import { checkLanguage } from '../../i18n';

class ActualDate extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'date';
  }

  static getActualDate() {
    const lang = checkLanguage();
    const date: ActualDateType = {} as ActualDateType;
    date.now = new Date();
    date.dateString = date.now.toLocaleDateString(lang, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    date.timeString = date.now.toLocaleTimeString('ru-RU');

    return date;
  }

  static getTimeOfDay() {
    const hours = this.getActualDate().now.getHours();
    if (hours >= 6 && hours < 12) {
      return 'morning';
    }
    if (hours >= 12 && hours < 18) {
      return 'afternoon';
    }
    if (hours >= 18 && hours < 24) {
      return 'evening';
    }
    return 'night';
  }

  updateDateContainer() {
    const { timeString, dateString } = ActualDate.getActualDate();
    const timeContainer = this.querySelector('.date__time');
    const dateContainer = this.querySelector('.date__date');
    if (timeContainer) {
      timeContainer.textContent = timeString;
    }
    if (dateContainer) {
      dateContainer.textContent = dateString;
    }
  }

  updater() {
    setInterval(() => {
      this.updateDateContainer();
    }, 1000);
  }

  render() {
    const { timeString, dateString } = ActualDate.getActualDate();
    this.insertAdjacentHTML(
      'afterbegin',
      `
    <time class="date__time" data-id="time-toggle">${timeString}</time>
    <br>
    <date class="date__date" data-id="date-toggle">${dateString}</date>
    `
    );
  }

  connectedCallback() {
    this.render();
    this.updater();
  }
}

export default ActualDate;
