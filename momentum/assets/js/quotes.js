let quote = document.querySelector(".quote")
let author = document.querySelector(".author")
let changeQuote = document.querySelector(".change-quote")
let quoteNumber;
async function getQuotes() {
    let url = `assets/json/${myStorage.language}Quotes.json`

    const quotes = await fetch(url);
    const dataQuotes = await quotes.json();

    quoteNumber = random(dataQuotes.length)[0]
    quote.innerText = dataQuotes[quoteNumber].quote
    author.innerText = dataQuotes[quoteNumber].author
}
getQuotes();

changeQuote.addEventListener("click", function () {
    getQuotes();
})

async function translateQuote() {
    if (myStorage.language == "ru") {
        let url = "assets/json/ruQuotes.json"
        const quotes = await fetch(url);
        const dataQuotes = await quotes.json();
        quote.innerText = dataQuotes[quoteNumber].quote
        author.innerText = dataQuotes[quoteNumber].author
    } else {
        let url = "assets/json/enQuotes.json"
        const quotes = await fetch(url);
        const dataQuotes = await quotes.json();
        quote.innerText = dataQuotes[quoteNumber].quote
        author.innerText = dataQuotes[quoteNumber].author
    }

}