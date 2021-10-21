let quote = document.querySelector(".quote")
let author = document.querySelector(".author")
let changeQuote = document.querySelector(".change-quote")
let j;
async function getQuotes() {
    let url = `assets/json/${myStorage.language}Quotes.json`

    const quotes = await fetch(url);
    const dataQuotes = await quotes.json();

    j = random(dataQuotes.length)[0]
    quote.innerText = dataQuotes[j].quote
    author.innerText = dataQuotes[j].author
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
        quote.innerText = dataQuotes[j].quote
        author.innerText = dataQuotes[j].author
    } else {
        let url = "assets/json/enQuotes.json"
        const quotes = await fetch(url);
        const dataQuotes = await quotes.json();
        quote.innerText = dataQuotes[j].quote
        author.innerText = dataQuotes[j].author
    }

}