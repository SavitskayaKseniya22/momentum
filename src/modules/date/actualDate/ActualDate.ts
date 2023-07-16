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
    return `<div class="date">
    ${this.timeChangingString(false)}
    ${this.dateChangingString(false)}
    </div>`;
  }

  dateChangingString(isHidden: boolean) {
    const { dateString } = ActualDate.getActualDate();
    return `
    <date class="date__date ${
      isHidden ? 'invisible' : ''
    }" data-id="date-toggle">${dateString}</date>`;
  }

  timeChangingString(isHidden: boolean) {
    const { timeString } = ActualDate.getActualDate();
    return `<time class="date__time ${
      isHidden ? 'invisible' : ''
    }" data-id="time-toggle">${timeString}</time><br>
    `;
  }

  renderTime() {
    setInterval(() => {
      const date = document.querySelector('.date');
      const timeContainer = date?.querySelector('.date__time');
      const dateContainer = date?.querySelector('.date__date');

      if (date) {
        date.innerHTML =
          this.timeChangingString(
            timeContainer!.classList.contains('invisible')
          ) +
          this.dateChangingString(
            dateContainer!.classList.contains('invisible')
          );
      }
    }, 1000);
  }
}

export default ActualDate;
