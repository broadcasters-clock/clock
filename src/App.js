import React, { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";

import useInterval from "./useInterval";
import { Line } from "rc-progress";
import TimeString from "./TimeString";
import createClockString from "./createClockString";

import ReactGA from "react-ga";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-145382333-1");
  ReactGA.pageview("/");
}

function Clock() {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  let date = new Date();
  const [timeParts, setTimeParts] = useState(splitDateToHMS(date));

  useInterval(() => {
    let date = new Date();
    setTimeParts(splitDateToHMS(date));
  }, 1000);

  var progress = calcuatePercentateFromSeconds(timeParts.seconds);
  var clockString = createClockString(timeParts);
  var warning = calculateWarningState(timeParts);

  return (
    <div className="outer-wrapper">
      <div className="wrapper">
        <div className="container">
          <div className="time-string">
            <TimeString timeParts={timeParts} />
          </div>
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
          <div className="lang-switcher">
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("mi")}>Māori</button>
          </div>
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

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Clock />
    </Suspense>
  );
}
