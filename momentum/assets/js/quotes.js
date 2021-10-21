let quote = document.querySelector(".quote")
let author = document.querySelector(".author")
let changeQuote = document.querySelector(".change-quote")

async function getQuotes(quotesUrl) {

    const quotes = await fetch(quotesUrl);
    const dataQuotes = await quotes.json();

    let i = random(dataQuotes.length)[0]

    quote.innerText = dataQuotes[i].quote
    author.innerText = dataQuotes[i].author
}
getQuotes("assets/json/enQuotes.json");

changeQuote.addEventListener("click", function () {
    getQuotes("assets/json/enQuotes.json");
})