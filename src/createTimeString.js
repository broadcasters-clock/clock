
export default function createTimeString(timeParts) {
  var hour   = timeParts.hours;
  var minute = timeParts.minutes;
  var second = timeParts.seconds;
  var prefix = ' ';

  const actualMinute = minute;

  if(second > 30) {
    // comming up to next minute
    // so bump the display minute
    prefix = '-'
    minute = minute + 1;
  }
  else {
    prefix = '+'
  }

  if(minute > 30) {
    // X minutes to next hour
    // so bump the display hour to the next hour
    hour = hour + 1;
  }

  if(hour === 0) {
    hour = 12;
  }

  if(hour > 12) {
    hour = hour - 12;
  }

  switch(minute){
    case 0:
    return `${prefix} ${hour} O'Clock`;

    case 1:
    return `${prefix} ${minute} minute past ${hour}`;

    case 15:
    return `${prefix} Quarter past ${hour}`;

    case 30:
    return `${prefix} Half past ${hour}`;

    case 45:
    return `${prefix} Quarter to ${hour}`;

    case 59:
    case 60:
    // case 60 is when we get past 30 seconds to the hour
    // We override the default behaviour (past/to) in the last minute by checking the actualMinute.

    if(actualMinute === 59){
      return `${(60 - second)} seconds to ${hour}`;
    }
    else {
      return `${prefix} ${60-minute} minute to ${hour}`;
    }

    default:
    if(minute < 31){
      return `${prefix} ${minute} minutes past ${hour}`;
    }
    else {
      return `${prefix} ${60-minute} minutes to ${hour}`;
    }
  }
}
