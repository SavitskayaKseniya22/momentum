myStorage = window.localStorage;


if (!myStorage.language) {
    myStorage.setItem('language', "en");
}
if (!myStorage.photoSource) {
    myStorage.setItem('photoSource', "github");
}
if (!myStorage.blocks) {
    myStorage.setItem('blocks', ['time', 'date', 'greeting-container', 'quote-container', 'weather', 'player', 'todolist']);
}


window.addEventListener("load", function () {

    let arr = myStorage.blocks.split(",")
    console.log(arr)
    for (const item of arr) {
        let invisBlock = document.getElementById(item)
        invisBlock.checked = "true"

    }
})
//язык
let languages = document.querySelectorAll(".language input[name='language']")
for (const item of languages) {
    item.addEventListener("change", function () {
        myStorage.language = item.id
        alert(myStorage.language)
    })
}
//источник фото
let bgSources = document.querySelectorAll(".bgSource input[name='bgSource']")
for (const item of bgSources) {
    item.addEventListener("change", function () {
        myStorage.photoSource = item.id
        alert(myStorage.photoSource)
    })
}
//видимость
let visibilityBlocksAll = document.querySelectorAll(".visibility input")
for (const item of visibilityBlocksAll) {
    item.addEventListener("change", function () {
        let deleteItem = document.getElementsByClassName(item.id)
        deleteItem[0].classList.toggle("invis")

        let visibibleBlocks = document.querySelectorAll(".visibility input:checked")
        let arrayBlocks = [];

        for (const elem of visibibleBlocks) {
            arrayBlocks.push(elem.id)
        }
        myStorage.blocks = arrayBlocks

    })
}