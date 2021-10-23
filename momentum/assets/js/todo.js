let todoText = document.querySelector('#todoText');
let list = document.querySelector(".todolist ol");

todoText.addEventListener('keyup', function (event) {
    if (event.code == 'Enter') {
        checklist()
    }
})

function checklist() {
    if (todoText.value) {
        let liInList = document.querySelectorAll(".todolist li");
        if (liInList.length > 1) {
            list.classList.add("scroll")
        }

        let newListing = document.createElement('li');
        newListing.classList.add("todolistItem")
        list.append(newListing);

        let newListingText = document.createElement('span');
        newListingText.innerText = todoText.value;
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

        todoText.value = '';
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton')
        newListing.append(deleteButton);

        deleteButton.addEventListener("click", function (event) {
            (event.target.closest('li')).remove()
            if (liInList.length < 3) {
                list.classList.remove("scroll")
            }
        })
    }

}