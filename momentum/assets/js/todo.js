let todoText = document.querySelector('#todoText');
let list = document.querySelector(".todolist ol");

todoText.addEventListener('keyup', function (event) {
    if (event.code == 'Enter') {
        checklist(todoText.value)


        if (!myStorage.todoContainer) {
            myStorage.setItem('todoContainer', todoText.value);
        } else {
            if (todoText.value) {
                myStorage.todoContainer = `${myStorage.todoContainer}, ${todoText.value}`
            }

        }
        todoText.value = "";
    }
})
//todoText.value
function checklist(value) {
    if (value) {
        let liInList = document.querySelectorAll(".todolist li");
        if (liInList.length > 1) {
            list.classList.add("scroll")
        }

        let newListing = document.createElement('li');
        newListing.classList.add("todolistItem")
        list.append(newListing);

        let newListingText = document.createElement('span');
        newListingText.innerText = value;
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
            if (liInList.length < 3) {
                list.classList.remove("scroll")
            }
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