let quote = document.querySelector(".quote")
let author = document.querySelector(".author")
let changeQuote = document.querySelector(".change-quote")
let quoteNumber;

function getRandomeQ(arr) {
    quoteNumber = random(arr.length)[0]
}
async function getQuotes(func) {
    let url = `assets/json/${myStorage.language}Quotes.json`
    const quotes = await fetch(url);
    const dataQuotes = await quotes.json();
    if (func) {
        func(dataQuotes)
    }
    //quoteNumber = random(dataQuotes.length)[0]
    quote.innerText = dataQuotes[quoteNumber].quote
    author.innerText = dataQuotes[quoteNumber].author
}
getQuotes(getRandomeQ);

changeQuote.addEventListener("click", function () {
    getQuotes(getRandomeQ);
})
/*
async function translateQuote() {

    let url = `assets/json/${myStorage.language}Quotes.json`
    const quotes = await fetch(url);
    const dataQuotes = await quotes.json();
    quote.innerText = dataQuotes[quoteNumber].quote
    author.innerText = dataQuotes[quoteNumber].author


}
*/