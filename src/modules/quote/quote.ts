import { localize } from '../../i18n';
import './quote.scss';

class Quote {
  randomNumber: number;
  constructor() {
    this.randomNumber = this.getRandomInt(31);
    this.addListener();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  updateQuote() {
    this.randomNumber = this.getRandomInt(31);
    const quoteContentContainer = document.querySelector('.quote__content');
    const quoteAuthorContainer = document.querySelector('.quote__author');
    quoteContentContainer?.setAttribute(
      'data-i18n',
      `quotes.${this.randomNumber}.quote`
    );
    quoteAuthorContainer?.setAttribute(
      'data-i18n',
      `quotes.${this.randomNumber}.author`
    );
    localize('.quote');
  }

  addListener() {
    document.addEventListener('click', async (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        event.target.closest('.quote__reload')
      ) {
        this.updateQuote();
      }
    });
  }

  content() {
    return `<div class="quote" data-id="quote-toggle">
          <div class="quote__content" data-i18n="quotes.${this.randomNumber}.quote"></div>
          <div class="quote__author" data-i18n="quotes.${this.randomNumber}.author"></div>
          <button class="quote__reload">
          <i class='bx bx-refresh'></i>
          </button>
        </div>`;
  }
}

export default Quote;
