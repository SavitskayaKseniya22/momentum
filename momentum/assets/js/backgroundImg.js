//bg
let slidePrev = document.querySelector(".slide-prev")
let slideNext = document.querySelector(".slide-next")

function assignBG(img, src) {
    img.onload = () => {
        document.body.style.background = `url(${src}) center/cover, rgba(0, 0, 0, 0.5)`;
    };
}
const img = new Image();

function changeBGGithub() {
    let array = random(20)
    let period = getPeriod()
    let temp = makeLength(array[0])
    img.src = `https://raw.githubusercontent.com/SavitskayaKseniya22/stage1-tasks/assets/images/${period}/${temp}.jpg`

    assignBG(img, img.src)



    slidePrev.addEventListener("click", function () {
        let numSrc = img.src.slice(-6, -4)
        let substr = img.src.slice(0, -6)
        let changeSrc;
        if (myStorage.photoSource == "github") {

            if (numSrc - 1 == 0) {
                changeSrc = `${substr}20.jpg`;
            } else {
                numSrc = makeLength(numSrc - 1)
                changeSrc = `${substr}${numSrc}.jpg`;
            }

            img.src = changeSrc;
            assignBG(img, img.src)
        }
    })

    slideNext.addEventListener("click", function () {
        let numSrc = img.src.slice(-6, -4)
        let substr = img.src.slice(0, -6)
        let changeSrc;
        if (myStorage.photoSource == "github") {
            if (Number(numSrc) + 1 == 21) {
                changeSrc = `${substr}01.jpg`;
            } else {
                numSrc = makeLength(Number(numSrc) + 1)
                changeSrc = `${substr}${numSrc}.jpg`
            }
            img.src = changeSrc;
            assignBG(img, img.src)
        }
    })
}


let tag = document.querySelector("#tag");

function getTag() {
    if (tag.value) {
        return tag.value
    }

}
tag.addEventListener("change", function () {
    if (tag.value) {
        checkMakeStorageProp(myStorage, "tagName", tag.value)
    }
    myStorage.tagName = tag.value
    changeBG()


})




function restoreTagName() {
    if (myStorage.tagName) {
        tag.value = myStorage.tagName
    }

}


async function changeBGUnsplash() {
    let searchTag = getTag()

    if (!searchTag) {
        searchTag = getPeriod()
    }
    let url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${searchTag}&client_id=mT4PCODkUPTvfvB2AxjNReUVpj98E-vPd9o9xC1EzDE`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular
    assignBG(img, img.src)
}


async function changeBGFlickr() {
    let searchTag = getTag()

    let array = random(99);
    if (!searchTag) {
        searchTag = getPeriod()
    }
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=067d2cd731eb9c311ce2550fd0764aa8&tags=${searchTag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.photos.photo[array[0]].url_l) {
        img.src = data.photos.photo[array[0]].url_l
    } else {
        changeBGFlickr()
    }
    assignBG(img, img.src)
}


slidePrev.addEventListener("click", function () {
    if (myStorage.photoSource == "flickr" || myStorage.photoSource == "unsplash") {
        changeBG()
    }
})

slideNext.addEventListener("click", function () {
    if (myStorage.photoSource == "flickr" || myStorage.photoSource == "unsplash") {
        changeBG()
    }
})




function changeBG() {
    if (myStorage.photoSource == "flickr") {
        changeBGFlickr()
    } else if (myStorage.photoSource == "unsplash") {
        changeBGUnsplash()
    } else {
        changeBGGithub()
    }
}
changeBG()