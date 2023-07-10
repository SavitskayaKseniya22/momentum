//date

interface ActualDateType {
  now: Date;
  hours: number;
  minutes: number;
  seconds: number;
}

class ActualDate {
  constructor() {}
  static getActualDate() {
    const date: ActualDateType = {} as ActualDateType;
    date.now = new Date();
    date.hours = date.now.getHours();
    date.minutes = date.now.getMinutes();
    date.seconds = date.now.getSeconds();
    return date;
  }

  static getTimeOfDay() {
    let objDate = this.getActualDate();
    if (
      objDate.hours >= 6 &&
      objDate.hours <= 11 &&
      objDate.minutes >= 0 &&
      objDate.minutes <= 59
    ) {
      return 'morning';
    } else if (
      objDate.hours >= 12 &&
      objDate.hours <= 17 &&
      objDate.minutes >= 0 &&
      objDate.minutes <= 59
    ) {
      return 'afternoon';
    } else if (
      objDate.hours >= 18 &&
      objDate.hours <= 23 &&
      objDate.minutes >= 0 &&
      objDate.minutes <= 59
    ) {
      return 'evening';
    } else {
      return 'night';
    }
  }
}

export default ActualDate;
/*
let date = document.querySelector('.date');

function getDayWeek(date) {
  let daysArray;
  if (myStorage.language == 'en') {
    daysArray = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  } else {
    daysArray = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];
  }
  let weekDay = daysArray[date.getDay()];
  return weekDay;
}

function getDate(date) {
  let month;
  let day = date.getDate();
  let rusMonths = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  let engMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  if (myStorage.language == 'en') {
    month = engMonths[getDateObj().nowDate.getMonth()];
    return `${month} ${day}`;
  } else {
    month = rusMonths[getDateObj().nowDate.getMonth()];
    return `${day} ${month}`;
  }
}

function printDate(node, date, weekDay) {
  node.innerText = weekDay + ', ' + date;
}

printDate(
  date,
  getDate(getDateObj().nowDate),
  getDayWeek(getDateObj().nowDate)
);

//greetings

let userName = document.querySelector('.name');
checkMakeStorageProp(myStorage, 'userName', '');

function restoreUsername(input) {
  input.value = myStorage.userName;
}

userName.oninput = function () {
  myStorage.userName = userName.value;
};

function getDate() {
  const date = {};
  date.now = new Date();
  date.hours = date.now.getHours();
  date.minutes = date.now.getMinutes();
  date.seconds = date.now.getSeconds();
  return date;
}

function getTimeOfDay() {
  let objDate = getDateObj();
  if (
    objDate.hours >= 6 &&
    objDate.hours <= 11 &&
    objDate.minutes >= 0 &&
    objDate.minutes <= 59
  ) {
    return 'morning';
  } else if (
    objDate.hours >= 12 &&
    objDate.hours <= 17 &&
    objDate.minutes >= 0 &&
    objDate.minutes <= 59
  ) {
    return 'afternoon';
  } else if (
    objDate.hours >= 18 &&
    objDate.hours <= 23 &&
    objDate.minutes >= 0 &&
    objDate.minutes <= 59
  ) {
    return 'evening';
  } else {
    return 'night';
  }
}

function printGreetings(node, period) {
  let objPeriod = {
    morning: {
      en: 'Good morning, ',
      ru: 'Доброе утро, ',
    },
    afternoon: {
      en: 'Good afternoon, ',
      ru: 'Добрый день, ',
    },
    evening: {
      en: 'Good evening, ',
      ru: 'Добрый вечер, ',
    },
    night: {
      en: 'Good night, ',
      ru: 'Доброй ночи, ',
    },
  };
  node.innerText = objPeriod[period][myStorage.language];

  
  printPlaceholder();
  restoreUsername(userName);
}

function printPlaceholder() {
  let objPlaceholder = {
    en: '[Enter name]',
    ru: '[Введите имя]',
  };
  userName.placeholder = objPlaceholder[myStorage.language];
  
}

let greetings = document.querySelector('.greeting');
printGreetings(greetings, getTimeOfDay());

//time
let time = document.querySelector('.time');

function makeLength(prop) {
  if (String(prop).length == 1) {
    return `0${String(prop)}`;
  }
  return prop;
}

function printTime(node) {
  let objDate = getDateObj();
  objDate.seconds = makeLength(objDate.seconds);
  objDate.minutes = makeLength(objDate.minutes);
  objDate.hours = makeLength(objDate.hours);

  

  node.innerText = `${objDate.hours}:${objDate.minutes}:${objDate.seconds}`;
}

function showTime() {
  printTime(time);
  setTimeout(showTime, 1000);
}
showTime();

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return;
}

function random(max) {
  let arr = [];
  i = 1;
  while (i <= max) {
    arr.push(i);
    i++;
  }
  shuffle(arr);
  return arr;
}*/
