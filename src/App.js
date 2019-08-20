import React, { useState, useEffect } from 'react';
import useInterval from './useInterval';
import { Line } from 'rc-progress';
import createTimeString from './createTimeString';
import createClockString from './createClockString';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-145382333-1');
ReactGA.pageview('/');

function App() {
  let date = new Date();
  const [time, setTime] = useState(date);
  const [timeParts, setTimeParts] = useState(splitDateToHMS(date));
  const [progress, setProgress] = useState(0)
  const [clockString, setClockString] = useState('Starting...');
  const [timeString, setTimeString] = useState('Starting...');
  const [warning, setWarning] = useState(false);

  useInterval(() => {
    let date = new Date();
    setTime(date);
    setTimeParts(splitDateToHMS(date))
  }, 1000);

  useEffect(() => {
    setTimeString(createTimeString(timeParts))
    setClockString(createClockString(timeParts))
    // +1 here to get the percentage to 100.
    setProgress(calcuatePercentateFromSeconds(timeParts.seconds));
    setWarning(calculateWarningState(timeParts));
  },[time, timeParts]);


  return (
    <div className="outer-wrapper">
      <div className="wrapper">
        <div className="container">
          <div className="time-string">
            {timeString}
          </div>
          <div className="line-container">
            <Line
              percent={progress}
              strokeLinecap ="butt"
              strokeWidth="8"
              trailColor="#eee"
              strokeColor={warning ? 'red' : '#666'}
            />
          </div>
          <div className="clock-string">
            {clockString}
          </div>
        </div>
      </div>
    </div>
  );
}

function calcuatePercentateFromSeconds(seconds){
  return (seconds === 0) ? 100 : seconds/60*100
}

function calculateWarningState(timeParts){
   if((timeParts.minutes === 59) && (timeParts.seconds > 49)){
    return true;
  }
  else{
    return false;
  }
}

function splitDateToHMS(date){
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}


export default App;
