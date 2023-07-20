import ActualDate from "../actualDate/ActualDate";
import "./Greetings.scss";

class Greetings {
  static readStore() {
    return window.localStorage.getItem("greetingsName");
  }

  static writeStore(greetingsName: string) {
    window.localStorage.setItem("greetingsName", greetingsName);
  }

  static addListener() {
    document
      .querySelector(".greetings__name")
      ?.addEventListener("input", (event: Event) => {
        const { target } = event;
        if (target && target instanceof HTMLInputElement) {
          Greetings.writeStore(target.value);
        }
      });
  }

  static content() {
    const timeOfDay = ActualDate.getTimeOfDay();
    return `<div class="greetings" data-id="greetings-toggle">
      <span class="greetings__title" data-i18n="greetings.${timeOfDay}">Good day, </span>
      <input type="text" placeholder="[Enter name]" data-i18n="[placeholder]greetings.placeholder" class="greetings__name" value="${
        Greetings.readStore() || ""
      }"  />
    </div>`;
  }
}

export default Greetings;
