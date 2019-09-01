import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";
import { Line } from "rc-progress";
import createTimeString from "./createTimeString";
import createClockString from "./createClockString";

import ReactGA from "react-ga";
ReactGA.initialize("UA-145382333-1");
ReactGA.pageview("/");

function App() {
  let date = new Date();
  const [timeParts, setTimeParts] = useState(splitDateToHMS(date));

  useInterval(() => {
    let date = new Date();
    setTimeParts(splitDateToHMS(date));
  }, 1000);

  var timeString = createTimeString(timeParts);
  var progress = calcuatePercentateFromSeconds(timeParts.seconds);
  var clockString = createClockString(timeParts);
  var warning = calculateWarningState(timeParts);

  return (
    <div className="outer-wrapper">
      <div className="wrapper">
        <div className="container">
          <div className="time-string">{timeString}</div>
          <div className="line-container">
            <Line
              percent={progress}
              strokeLinecap="butt"
              strokeWidth="8"
              trailColor="#eee"
              strokeColor={warning ? "red" : "#666"}
            />
          </div>
          <div className="clock-string">{clockString}</div>
        </div>
      </div>
    </div>
  );
}

function calcuatePercentateFromSeconds(seconds) {
  return seconds === 0 ? 100 : (seconds / 60) * 100;
}

function calculateWarningState(timeParts) {
  if (timeParts.minutes === 59 && timeParts.seconds > 49) {
    return true;
  } else {
    return false;
  }
}

function splitDateToHMS(date) {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
}

export default App;
