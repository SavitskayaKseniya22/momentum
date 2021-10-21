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



//видимость
let visibilityBlocksAll = document.querySelectorAll(".visibility input")

window.addEventListener("load", function () {

    let arrayBlocks = myStorage.blocks.split(",")
    for (const elem of visibilityBlocksAll) {
        let deleteItem = document.getElementsByClassName(elem.id) //делаем все элементы невидимыми
        deleteItem[0].classList.add("invis")
        let str = (deleteItem[0].className).split(" ")[0]
        if (arrayBlocks.includes(str)) { //делаем видимыми если они сохранены выбранными
            deleteItem[0].classList.remove("invis")
        }
    }
    for (const item of arrayBlocks) {
        let invisBlockTitle = document.getElementById(item) //делаем нажатыми все сохраненные чекбоксы
        invisBlockTitle.checked = "true";
    }
})

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