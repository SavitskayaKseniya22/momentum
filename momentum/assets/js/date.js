//date
let date = document.querySelector(".date");
let nowDate = new Date()

function getDayWeek(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = days[date.getDay()]
    return weekDay
}


function getDate(date) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[nowDate.getMonth()]
    let day = nowDate.getDate()
    return month + " " + day

}

function printDate(node, date, weekDay) {
    node.innerText = weekDay + ", " + date
}

printDate(date, getDate(nowDate), getDayWeek(nowDate))




//time
let time = document.querySelector(".time");
let greetings = document.querySelector(".greeting")
let userName = document.querySelector(".name")

myStorage = window.localStorage;
if (!myStorage.userName) {
    myStorage.setItem('userName', '');
}

userName.value = myStorage.userName

userName.oninput = function () {
    myStorage.userName = userName.value
};

function printGreetings(node, hours, minutes) {
    if (hours >= 6 && hours <= 11 && minutes >= 0 && minutes <= 59) {
        node.innerText = "Good Morning, ";
    }
    if (hours >= 12 && hours <= 17 && minutes >= 0 && minutes <= 59) {
        node.innerText = "Good Afternoon, ";
    }
    if (hours >= 18 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        node.innerText = "Good Evening, ";
    }
}

function printTime(node) {
    let nowDate = new Date()
    let hours = nowDate.getHours()
    let minutes = nowDate.getMinutes()
    let seconds = nowDate.getSeconds()

    printGreetings(greetings, hours, minutes)

    if (String(seconds).length == 1) {
        seconds = "0" + seconds
    }
    if (String(minutes).length == 1) {
        minutes = "0" + minutes
    }
    if (String(hours).length == 1) {
        hours = "0" + hours
    }

    node.innerText = hours + ":" + minutes + ":" + seconds
}



function showTime() {
    printTime(time);
    setTimeout(showTime, 1000);
}
showTime();