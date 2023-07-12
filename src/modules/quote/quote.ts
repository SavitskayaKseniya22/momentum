import './quote.scss';

export class Quote {
  constructor() {
    this.updateQuote();
    this.addListener();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  async getQuotes() {
    const url = `assets/json/enQuotes.json`;
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        'Please reload page or check your quotes json. No quotes found.'
      );
    }
  }

  async getActiveQuote() {
    const quotes = await this.getQuotes();
    const randomNumber = this.getRandomInt(quotes.length - 1);
    return quotes[randomNumber];
  }

  async updateQuote() {
    try {
      const activeQuote = await this.getActiveQuote();
      const { quote, author } = activeQuote;
      const quoteContentContainer = document.querySelector('.quote__content');
      if (quoteContentContainer && quote) {
        (quoteContentContainer as HTMLElement).innerText = quote;
      }
      const quoteAuthorContainer = document.querySelector('.quote__author');
      if (quoteAuthorContainer && author) {
        (quoteAuthorContainer as HTMLElement).innerText = author;
      }
    } catch (error) {
      console.error(error);
    }
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
    return `<div class="quote">
          <button class="quote__reload">
          <i class='bx bx-refresh'></i>
          </button>
          <div class="quote__content"></div>
          <div class="quote__author"></div>
        </div>`;
  }
}
