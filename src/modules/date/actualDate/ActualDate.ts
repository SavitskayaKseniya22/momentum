import { ActualDateType } from '../../../interfaces';
import './ActualDate.scss';

class ActualDate {
  constructor() {
    this.renderTime();
  }

  static getActualDate() {
    const date: ActualDateType = {} as ActualDateType;
    date.now = new Date();
    date.dateString = date.now.toLocaleDateString('en-US', {
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
    } else if (hours >= 12 && hours < 18) {
      return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
      return 'evening';
    } else {
      return 'night';
    }
  }

  content() {
    const { timeString, dateString } = ActualDate.getActualDate();
    return `<div class="date">
    <time class="date__time">${timeString}</time><br>
    <date class="date__date">${dateString}</date>
    </div>`;
  }

  renderTime() {
    setInterval(() => {
      const date = document.querySelector('.date');
      if (date) {
        date.innerHTML = this.content();
      }
    }, 1000);
  }
}

export default ActualDate;
