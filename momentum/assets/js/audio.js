const playList = [{
        title: 'Aqua Caelestis',
        src: 'assets/sounds/Aqua Caelestis.mp3',
        duration: '00:58'
    },
    {
        title: 'River Flows In You',
        src: 'assets/sounds/River Flows In You.mp3',
        duration: '03:50'
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
for (let item of playList) {
    let li = document.createElement('li');
    li.classList.add("play-item")
    li.innerText = item.title
    playListContainer.append(li)
}
//изменение трека по нажатию кнопок
let audio = document.querySelector("audio")
let i = 0;
audio.src = playList[i].src // трек по-умолчанию

let playPrev = document.querySelector(".play-prev")
let playNext = document.querySelector(".play-next")

playPrev.addEventListener("click", function () {
    i--;
    if (i == -1) {
        i = playList.length - 1
    }
    audio.src = playList[i].src;


})
playNext.addEventListener("click", function () {
    i++;
    if (i >= playList.length) {
        i = 0
    }
    audio.src = playList[i].src;
})