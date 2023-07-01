let todoText = document.querySelector('#todoText');
let list = document.querySelector(".todolist ol");
let openListButton = document.querySelector(".openListButton")

function printChecklistItem(input) {
    input.addEventListener('keyup', function (event) {
        if (event.code == 'Enter' && input.value) {
            makeChecklistItem(input.value)
            if (!myStorage.todoContainer) {
                myStorage.setItem('todoContainer', input.value);
            } else {
                myStorage.todoContainer = `${myStorage.todoContainer}, ${input.value}`

            }
            input.value = "";
        }
    })

}
printChecklistItem(todoText)

function addScroll(min, max, collection, container) {
    if (collection.length > min && !(container.classList.contains("openList"))) {
        container.classList.add("scroll")

    } else if (collection.length >= max && (container.classList.contains("openList"))) {
        container.classList.add("scroll")
    }
}


function removeScroll(min, max, collection, container) {
    if (collection.length < min && !(container.classList.contains("openList"))) {
        container.classList.remove("scroll")

    } else if (collection.length < max && (container.classList.contains("openList"))) {
        container.classList.remove("scroll")
    }

}

function makeChecklistItem(inputValue) {
    if (inputValue) {
        let liInList = document.querySelectorAll(".todolist li");
        addScroll(1, 5, liInList, list)

        let newListing = document.createElement('li');
        newListing.classList.add("todolistItem")
        list.prepend(newListing);

        let newListingText = document.createElement('span');
        newListingText.innerText = inputValue;
        newListing.append(newListingText)
        newListing.addEventListener("dblclick", function (event) {
            if (event.target.tagName == "SPAN") {
                let rewriteList = document.createElement('input');
                rewriteList.classList.add("input")
                rewriteList.classList.add("todolistItemRewrite")
                rewriteList.type = 'text';
                rewriteList.value = newListingText.innerText;
                newListingText.innerText = "";
                checkbox.after(rewriteList);
                rewriteList.focus();
                rewriteList.addEventListener("blur", function () {
                    newListingText.innerText = rewriteList.value;
                    rewriteList.remove()
                })
            }


        })

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.classList.add("todolistItemCheckbox")
        newListing.prepend(checkbox);

        checkbox.addEventListener('change', function (event) {
            checkbox.toggleAttribute("checked");
            newListing.classList.toggle("lineThrough")

        })


        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton')
        newListing.append(deleteButton);

        deleteButton.addEventListener("click", function (event) {
            (event.target.closest('li')).remove()
            let todoArray = myStorage.todoContainer.split(", ")
            let a = todoArray.filter(word => word != event.target.previousSibling.innerText)
            myStorage.todoContainer = a.join(", ")
            liInList = document.querySelectorAll(".todolist li");
            removeScroll(2, 6, liInList, list)

        })
    }

}
translateTODO()

function translateTODO() {
    let objTranslate = {
        en: "What is your plans for today?",
        ru: "Какие планы на сегодня?"
    }
    let titleTODO = document.querySelector(".todolist h2")
    titleTODO.innerText = objTranslate[myStorage.language]

}
openListButton.addEventListener("click", function () {
    list.classList.toggle("openList")
    openListButton.classList.toggle("openListButtonToTop")


    let liInList = document.querySelectorAll(".todolist li");
    addScroll(1, 5, liInList, list)
    removeScroll(1, 6, liInList, list)

})

function restoreTodoStorage() { //восстанавливаем из хранилища заметки
    if (myStorage.todoContainer) {
        let todoArray = myStorage.todoContainer.split(", ")
        for (const item of todoArray) {
            makeChecklistItem(item)
        }
    }
}