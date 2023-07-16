




let settings__toggle = document.querySelector(".settings__toggle")
let settings = document.querySelector(".settings")
let settings__popup = document.querySelector(".settings__popup")


settings__toggle.addEventListener("click", function () {
    popBlock(settings__popup, settings__toggle)

})

function popBlock(block, trigger) { //раскрывает блок по нажатию на кнопку и уменьшает ее размер
    block.classList.toggle("invis")
    block.classList.toggle("activePopup")
    settings.classList.toggle("activeSettings")
    trigger.classList.toggle("scaleBlock")

}


myStorage = window.localStorage;

function checkMakeStorageProp(storageName, propName, propValue) { //проверка существования свойства и его создание с дефолтными величинами если свойства нет
    if (!storageName[propName]) {
        storageName.setItem(propName, propValue);
        return true
    }
    return false
}

checkMakeStorageProp(myStorage, "language", "en")
checkMakeStorageProp(myStorage, "photoSource", "github")
checkMakeStorageProp(myStorage, "blocks", ['time', 'date', 'greeting-container', 'quote-container', 'weather', 'player', 'todolist'])



//видимость
let visibilityBlocksAll = document.querySelectorAll(".visibility input")



window.addEventListener("load", function () {
    restoreTodoStorage()
    restoreVisibilityStorage(visibilityBlocksAll, myStorage)
    /* restoreChoosenLanguage()
     restoreChoosenBGSourse()*/
    restoreChoosenRadio(myStorage.language)
    restoreChoosenRadio(myStorage.photoSource)
    restoreTagName()

})

function restoreVisibilityStorage(collection, storage) { //востанавливаем сохраненную видимость блоков

    let arrayBlocks = storage.blocks.split(",")
    for (const elem of collection) {
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
}

function updateVisibilityStorage(collection, storage) {
    for (const item of collection) {

        item.addEventListener("change", function () {
            let deleteItem = document.getElementsByClassName(item.id)
            deleteItem[0].classList.toggle("invis")
            let visibibleBlocks = document.querySelectorAll(".visibility input:checked")
            let arrayBlocks = [];
            for (const elem of visibibleBlocks) {
                arrayBlocks.push(elem.id)
            }
            storage.blocks = arrayBlocks
        })
    }
}
updateVisibilityStorage(visibilityBlocksAll, myStorage)

//язык
let languages = document.querySelectorAll(".language input[name='language']")

function translateAll(collection, storage) {
    for (const item of collection) {
        item.addEventListener("change", function () {
            storage.language = item.id
            getQuotes()
            getWeather(city)
            translateCity()
            printGreetings(greetings, getTimeOfDay())
            printDate(date, getDate(getDateObj().nowDate), getDayWeek(getDateObj().nowDate))
            translateSettings()
            translateTODO()
        })
    }
}

translateAll(languages, myStorage)





function translateSettings() {
    let objTranslate = {
        labels: {
            en: ["Time", "Date", "Greeting", "Quote", "Weather", "Audio", "Todolist"],
            ru: ["Время", "Дата", "Приветствие", "Цитата", "Погода", "Аудиоплеер", "Список дел"]

        },
        titleSmall: {
            en: ["Visibility:", "Photo source:", "Tag:", "Language:"],
            ru: ["Видимость:", "Источник фотографий:", "Тег:", "Язык:"]

        },
        titleBig: {
            en: ["Settings"],
            ru: ["Настройки"]

        },
        language: {
            en: ["English", "Russian"],
            ru: ["Английский", "Русский"]

        }
    }
    let labelsVisibility = document.querySelectorAll(".visibility label")
    let titlesSettings = document.querySelectorAll("h4")
    let titleMainSettings = document.querySelectorAll("h3")
    let languageChoice = document.querySelectorAll(".language label")

    function translateItems(collection, prop) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].innerText = prop[myStorage.language][i]
        }
    }
    translateItems(labelsVisibility, objTranslate.labels)
    translateItems(titlesSettings, objTranslate.titleSmall)
    translateItems(titleMainSettings, objTranslate.titleBig)
    translateItems(languageChoice, objTranslate.language)
}


translateSettings()
/*
function restoreChoosenLanguage() {
    let choosenLanguage = document.getElementById(myStorage.language)
    choosenLanguage.checked = "checked"
}

function restoreChoosenBGSourse() {
    let choosenPhotoSource = document.getElementById(myStorage.photoSource)
    choosenPhotoSource.checked = "checked"
}
*/
function restoreChoosenRadio(prop) {
    let choosenTemp = document.getElementById(prop)
    choosenTemp.checked = "checked"
}
restoreChoosenRadio(myStorage.language)
restoreChoosenRadio(myStorage.photoSource)