const playList = [{
        title: 'Aqua Caelestis',
        src: 'assets/sounds/Aqua Caelestis.mp3',
        duration: '00:40'
    },
    {
        title: 'River Flows In You',
        src: 'assets/sounds/River Flows In You.mp3',
        duration: '01:37'
    },
    {
        title: 'Ennio Morricone',
        src: 'assets/sounds/Ennio Morricone.mp3',
        duration: '01:37'
    },
    {
        title: 'Summer Wind',
        src: 'assets/sounds/Summer Wind.mp3',
        duration: '01:50'
    }
]
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

function printPlaylist(container) {
    for (let item of playList) {
        let li = document.createElement('li');
        li.classList.add("play-item")
        li.innerText = item.title;
        li.classList.remove("item-active")

        let itemPlaylistButton = document.createElement('button');
        itemPlaylistButton.classList.add("buttonList")

        li.prepend(itemPlaylistButton)
        container.append(li)




        itemPlaylistButton.addEventListener("click", function () {
            setActive(li, item)
            itemPlaylistButton.classList.add("buttonActive")


        })
    }
}
printPlaylist(playListContainer)



let playListItems = document.querySelectorAll(".play-list li")


//изменение трека по нажатию кнопок
let audio = document.querySelector("audio")
let playProgressTotal = document.querySelector(".playProgressTotal")
let playProgress = document.querySelector(".playProgress")
let durationAudio = document.querySelector(".durationAudio")
let trackNumber = 0;
audio.src = playList[trackNumber].src // трек по-умолчанию
playProgressTotal.innerText = playList[trackNumber].duration
durationAudio.value = audio.currentTime;
activeTrackTitle.innerText = playList[0].title
playListItems[0].classList.add("item-active")










audio.addEventListener('loadedmetadata', (event) => {
    audio.duration = playList[trackNumber].duration
    durationAudio.max = audio.duration;
});

audio.addEventListener("timeupdate", function () {
    durationAudio.value = audio.currentTime;

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

durationAudio.addEventListener("input", function () {
    audio.currentTime = durationAudio.value
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

})


playNext.addEventListener("click", function () {
    trackNumber++;
    if (trackNumber >= playList.length) {
        trackNumber = 0
    }
    setActive(playListItems[trackNumber], playList[trackNumber])
    audio.play()
    play.classList.add("pause")
})



let event = new Event("click")
audio.addEventListener("ended", function () {
    playNext.dispatchEvent(event)

})




//рабочие кнопки
let play = document.querySelector(".play")

function toggleClass(node, className) {
    node.classList.toggle(className)
}

function playPause() {
    if (audio.paused) {
        audio.play();

        toggleClass(play, "pause")

    } else {
        audio.pause();
        toggleClass(play, "pause")
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