import React from "react";
import { useTranslation } from "react-i18next";

const TimeString = ({ timeParts, className }) => {
  const { t } = useTranslation();

  function generateString() {
    var hour = timeParts.hours;
    var minute = timeParts.minutes;
    var second = timeParts.seconds;
    var prefix = " ";

    if (second > 30) {
      // comming up to next minute
      // so bump the display minute

      // This is a minus sign, NOT a hyphen
      // We use to ensure the following string does not move left/right
      // when the sign chnges on the half minute.
      prefix = "−";
      minute = minute + 1;
    } else {
      prefix = "+";
    }

    if (minute > 30) {
      // X minutes to next hour
      // so bump the display hour to the next hour
      hour = hour + 1;
    }

    if (hour === 0) {
      hour = 12;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    switch (minute) {
      case 0:
        return `${prefix} ${hour} ${t("time.oclock")}`;

      case 1:
        return `${prefix} ${minute} ${t("time.minutePast")} ${hour}`;

      case 15:
        return `${prefix} ${t("time.quaterPast")} ${hour}`;

      case 30:
        return `${prefix} Half past ${hour}`;

      case 45:
        return `${prefix} ${t("time.quaterTo")}${hour}`;

      case 59:
      case 60:
        /*
        case 60 is when we get past 30 seconds to the hour
        we override the default behaviour (past/to) in the last minute
        by checking the minute passed in.
      */

        if (timeParts.minutes === 59) {
          return `${60 - second} seconds to ${hour}`;
        } else {
          return `${prefix} ${60 - minute} minute to ${hour}`;
        }

      default:
        if (minute < 31) {
          return `${prefix} ${minute} ${t("time.minutesPast")} ${hour}`;
        } else {
          return `${prefix} ${60 - minute} ${t("time.minutesTo")}${hour}`;
        }
    }
  }

  return <div className={className}>{generateString()}</div>;
};

export default TimeString;
