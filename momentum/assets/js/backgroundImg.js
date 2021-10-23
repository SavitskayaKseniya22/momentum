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

    /* if (String(array[0]).length == 1) {
         img.src = `https://raw.githubusercontent.com/SavitskayaKseniya22/stage1-tasks/assets/images/${period}/0${array[0]}.jpg`

     } else {
         img.src = `https://raw.githubusercontent.com/SavitskayaKseniya22/stage1-tasks/assets/images/${period}/${array[0]}.jpg`
     }*/

    assignBG(img, img.src)

    let numSrc = img.src.slice(-6, -4)
    let substr = img.src.slice(0, -6)
    let changeSrc;

    slidePrev.addEventListener("click", function () {

        /*
                if (String(numSrc - 1).length == 1) {
                    if (numSrc - 1 == 0) {
                        changeSrc = `${substr}20.jpg`;
                    } else {
                        changeSrc = `${substr}0${numSrc - 1}.jpg`;
                    }
                } else {
                    changeSrc = `${substr + (numSrc - 1)}.jpg`;
                }
        */
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
        /*
                if (String(Number(numSrc) + 1).length == 1) {
                    changeSrc = `${substr}0${Number(numSrc) + 1}.jpg`;
                } else {
                    if (Number(numSrc) + 1 == 21) {
                        changeSrc = `${substr}01.jpg`;
                    } else {
                        changeSrc = `${substr + (Number(numSrc) + 1)}.jpg`;
                    }

                }*/
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

function changeBGUnsplash() {
    async function getLinkToImage() {
        const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=mT4PCODkUPTvfvB2AxjNReUVpj98E-vPd9o9xC1EzDE';
        const res = await fetch(url);
        const data = await res.json();
        img.src = data.urls.regular

        assignBG(img, img.src)

    }
    getLinkToImage()

    slidePrev.addEventListener("click", function () {
        if (myStorage.photoSource == "unsplash") {
            getLinkToImage()
        }
    })
    slideNext.addEventListener("click", function () {
        if (myStorage.photoSource == "unsplash") {
            getLinkToImage()
        }
    })


}

function changeBGFlickr() {
    async function getLinkToImage() {
        let arr = random(99)
        const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=067d2cd731eb9c311ce2550fd0764aa8&tags=nature&extras=url_l&format=json&nojsoncallback=1';
        const res = await fetch(url);
        const data = await res.json();
        img.src = data.photos.photo[arr[0]].url_l
        assignBG(img, img.src)



    }
    getLinkToImage()

    slidePrev.addEventListener("click", function () {
        if (myStorage.photoSource == "flickr") {
            getLinkToImage()
        }

    })
    slideNext.addEventListener("click", function () {
        if (myStorage.photoSource == "flickr") {
            getLinkToImage()
        }
    })


}




function changeBG() {
    if (myStorage.photoSource == "github") {
        changeBGGithub()
    } else if (myStorage.photoSource == "unsplash") {
        changeBGUnsplash()
    } else {
        changeBGFlickr()
    }
}
changeBG()