
//добавление плейлиста на страницу
let playListContainer = document.querySelector(".play-list")
let activeTrackTitle = document.querySelector(".activeTrackTitle")





function setActive(elem, item) {
    if (item) {
        audio.src = item.src;
        playProgressTotal.innerText = item.duration
    }

    for (let i of playListItems) {
        if (i != elem) {
            i.classList.remove("item-active");
        } else {
            i.classList.add("item-active")
            activeTrackTitle.innerText = i.innerText
        }
    }
}





let playListItems = document.querySelectorAll(".play-list li")


//изменение трека по нажатию кнопок
let audio = document.querySelector("audio")
let playProgressTotal = document.querySelector(".playProgressTotal")
let playProgress = document.querySelector(".playProgress")
let duration__range = document.querySelector(".duration__range")
let trackNumber = 0;
audio.src = playList[0].src // трек по-умолчанию
playProgressTotal.innerText = playList[0].duration
duration__range.value = audio.currentTime;
activeTrackTitle.innerText = playList[0].title
playListItems[0].classList.add("item-active")










audio.addEventListener('loadedmetadata', (event) => {
    audio.duration = playList[trackNumber].duration
    duration__range.max = audio.duration;
});

audio.addEventListener("timeupdate", function () {
    duration__range.value = audio.currentTime;

    if (String(Math.floor(audio.currentTime)).length == 1) {
        playProgress.innerText = "00:0" + Math.floor(audio.currentTime)
    } else if (String(Math.floor(audio.currentTime)).length == 2 && Math.floor(audio.currentTime) / 60 < 1) {
        playProgress.innerText = "00:" + Math.floor(audio.currentTime)
    } else {
        let min = Math.floor(Math.floor(audio.currentTime) / 60);
        let sec = Math.floor(Math.floor(audio.currentTime) % 60);
        if (String(sec).length == 1) {
            playProgress.innerText = `0${min}:0${sec}`
        } else {
            playProgress.innerText = `0${min}:${sec}`
        }

    }

})

duration__range.addEventListener("input", function () {
    audio.currentTime = duration__range.value
})


let playPrev = document.querySelector(".play-prev")
let playNext = document.querySelector(".play-next")






playPrev.addEventListener("click", function () {
    trackNumber--;
    if (trackNumber == -1) {
        trackNumber = playList.length - 1
    }
    setActive(playListItems[trackNumber], playList[trackNumber])
    audio.play()
    play.classList.add("pause")

    chooseActiveButton()


})


playNext.addEventListener("click", function () {
    trackNumber++;

    if (trackNumber >= playList.length) {
        trackNumber = 0
    }
    setActive(playListItems[trackNumber], playList[trackNumber])
    audio.play()
    play.classList.add("pause")



    chooseActiveButton()

})



let event = new Event("click")
audio.addEventListener("ended", function () {
    playNext.dispatchEvent(event)

})

function chooseActiveButton() {
    let activeItems = document.querySelectorAll(".buttonActive")
    for (const item of activeItems) {
        item.classList.remove("buttonActive")
    }
    let activeItem = document.querySelector(".item-active button")
    activeItem.classList.add("buttonActive")
}


//рабочие кнопки
let play = document.querySelector(".play")

function toggleClass(node, className) {
    node.classList.toggle(className)
}

function playPause() {
    if (audio.paused) {
        audio.play();
        play.classList.add("pause")

        chooseActiveButton()

    } else {
        audio.pause();
        play.classList.remove("pause")
        let activeItems = document.querySelectorAll(".buttonActive")
        for (const item of activeItems) {
            item.classList.remove("buttonActive")
        }


    }
}
play.addEventListener("click", playPause)


















//аудио громкость

let volumeAudio = document.querySelector(".volumeAudio")
let changeVolumeAudio = document.querySelector(".changeVolumeAudio")
let changeVolumeAudioImg = document.querySelector(".changeVolumeAudio svg")
audio.volume = 0.5;
volumeAudio.value = audio.volume;

volumeAudio.addEventListener("input", function () {
    audio.volume = volumeAudio.value
    if (audio.volume == 0) {
        audio.muted = true;
        changeVolumeAudioImg.classList.add("svgOff")
    } else {
        audio.muted = false;
        changeVolumeAudioImg.classList.remove("svgOff")
    }
})



changeVolumeAudio.addEventListener("click", function () {
    audioMute()
})

function audioMute() {
    if (audio.muted && audio.volume > 0) {
        changeVolumeAudioImg.classList.toggle("svgOff")
        audio.muted = false;
        volumeAudio.value = audio.volume;
    } else {
        changeVolumeAudioImg.classList.toggle("svgOff")
        audio.muted = true;
        volumeAudio.value = 0;
    }
}