import { ActualDateType } from "../../interfaces";
import "./ActualDate.scss";
import { checkLanguage } from "../../i18n";

class ActualDate {
  constructor() {
    ActualDate.renderTime();
  }

  static getActualDate() {
    const lang = checkLanguage();
    const date: ActualDateType = {} as ActualDateType;
    date.now = new Date();
    date.dateString = date.now.toLocaleDateString(lang, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    date.timeString = date.now.toLocaleTimeString("ru-RU");
    return date;
  }

  static getTimeOfDay() {
    const hours = this.getActualDate().now.getHours();
    if (hours >= 6 && hours < 12) {
      return "morning";
    }
    if (hours >= 12 && hours < 18) {
      return "afternoon";
    }
    if (hours >= 18 && hours < 24) {
      return "evening";
    }
    return "night";
  }

  static content() {
    const { timeString, dateString } = ActualDate.getActualDate();
    return `<div class="date">
    <time class="date__time" data-id="time-toggle">${timeString}</time>
    <br>
    <date class="date__date" data-id="date-toggle">${dateString}</date>
    </div>`;
  }

  static updateDateContainer() {
    const { timeString, dateString } = ActualDate.getActualDate();
    const timeContainer = document.querySelector(".date__time");
    const dateContainer = document.querySelector(".date__date");
    if (timeContainer) {
      timeContainer.textContent = timeString;
    }
    if (dateContainer) {
      dateContainer.textContent = dateString;
    }
  }

  static renderTime() {
    setInterval(() => {
      ActualDate.updateDateContainer();
    }, 1000);
  }
}

export default ActualDate;
