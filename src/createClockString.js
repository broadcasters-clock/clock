// Based on https://codepen.io/afarrar/pen/JRaEjP

export default function createClockString(timeParts){

  var h = timeParts.hours;
  var m = timeParts.minutes;
  var s = timeParts.seconds;
  var meridiem = "AM";

  if(h === 0){
      h = 12;
  }

  if(h > 12){
      h = h - 12;
      meridiem = "PM";
  }

  return `${padTimeDigit(h)}:${padTimeDigit(m)}:${padTimeDigit(s)} ${meridiem}`;
}

function padTimeDigit(digit){
  return (digit < 10) ? "0" + digit : digit;
}
