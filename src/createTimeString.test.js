import React from "react";
import { act } from "react-dom/test-utils";
import { I18nextProvider } from "react-i18next";
import { mount } from "enzyme";

import i18n from "./i18nForTesting";

import TimeString from "./TimeString";

const timeTests = {
  EN: [
    // Special cases
    {
      name: "at midnight",
      testCase: { hours: 0, minutes: 0, seconds: 0 },
      expectedResult: "+ 12 O'Clock"
    },
    {
      name: "at midday",
      testCase: { hours: 12, minutes: 0, seconds: 0 },
      expectedResult: "+ 12 O'Clock"
    },

    {
      name: "at 4 past midnight",
      testCase: { hours: 0, minutes: 4, seconds: 12 },
      expectedResult: "+ 4 minutes past 12"
    },
    {
      name: "at 2 minutes to one AM",
      testCase: { hours: 0, minutes: 58, seconds: 12 },
      expectedResult: "+ 2 minutes to 1"
    },
    {
      name: "at midday",
      testCase: { hours: 12, minutes: 7, seconds: 18 },
      expectedResult: "+ 7 minutes past 12"
    },
    {
      name: "at 2 minutes to one PM",
      testCase: { hours: 12, minutes: 58, seconds: 21 },
      expectedResult: "+ 2 minutes to 1"
    },

    // AM tests
    {
      name: "on the quarter hour AM",
      testCase: { hours: 9, minutes: 15, seconds: 0 },
      expectedResult: "+ Quarter past 9"
    },
    {
      name: "on the half hour AM",
      testCase: { hours: 9, minutes: 30, seconds: 0 },
      expectedResult: "+ Half past 9"
    },
    {
      name: "on the 3 quarter hour AM",
      testCase: { hours: 9, minutes: 45, seconds: 0 },
      expectedResult: "+ Quarter to 10"
    },
    {
      name: "in the second to last minute of the hour AM",
      testCase: { hours: 9, minutes: 58, seconds: 15 },
      expectedResult: "+ 2 minutes to 10"
    },
    {
      name: "in the last minute of the hour AM",
      testCase: { hours: 9, minutes: 59, seconds: 30 },
      expectedResult: "30 seconds to 10"
    },

    // 12 AM Tests
    {
      name: "just after midday",
      testCase: { hours: 12, minutes: 0, seconds: 7 },
      expectedResult: "+ 12 O'Clock"
    },
    {
      name: "45 seconds after midday",
      testCase: { hours: 12, minutes: 0, seconds: 45 },
      expectedResult: "− 1 minute past 12"
    },

    // PM Tests
    {
      name: "on the quarter hour PM",
      testCase: { hours: 19, minutes: 15, seconds: 0 },
      expectedResult: "+ Quarter past 7"
    },
    {
      name: "on the half hour PM",
      testCase: { hours: 19, minutes: 30, seconds: 0 },
      expectedResult: "+ Half past 7"
    },
    {
      name: "on the 3 quarter hour PM",
      testCase: { hours: 19, minutes: 45, seconds: 0 },
      expectedResult: "+ Quarter to 8"
    },
    {
      name: "in the second to last minute of the hour PM",
      testCase: { hours: 19, minutes: 58, seconds: 15 },
      expectedResult: "+ 2 minutes to 8"
    },
    {
      name: "in the latter half of the second to last minute of the hour PM",
      testCase: { hours: 19, minutes: 58, seconds: 45 },
      expectedResult: "− 1 minute to 8"
    },
    {
      name: "on the last minute of the hour PM",
      testCase: { hours: 19, minutes: 59, seconds: 0 },
      expectedResult: "60 seconds to 8"
    },
    {
      name: "in the last minute of the hour PM",
      testCase: { hours: 19, minutes: 59, seconds: 30 },
      expectedResult: "30 seconds to 8"
    },
    {
      name: "in the last seconds of the hour PM",
      testCase: { hours: 19, minutes: 59, seconds: 48 },
      expectedResult: "12 seconds to 8"
    }
  ],
  MI: [
    {
      name: "at midnight",
      testCase: { hours: 0, minutes: 0, seconds: 0 },
      expectedResult: "+ 12 karaka"
    },
    {
      name: "at midday",
      testCase: { hours: 12, minutes: 0, seconds: 0 },
      expectedResult: "+ 12 karaka"
    },

    {
      name: "at 4 past midnight",
      testCase: { hours: 0, minutes: 4, seconds: 12 },
      expectedResult: "+ 4 meneti mai i te 12"
    },
    {
      name: "at 2 minutes to one AM",
      testCase: { hours: 0, minutes: 58, seconds: 12 },
      expectedResult: "+ 2 meneti ki te 1"
    },
    {
      name: "at midday",
      testCase: { hours: 12, minutes: 7, seconds: 18 },
      expectedResult: "+ 7 meneti mai i te 12"
    },
    {
      name: "at 2 minutes to one PM",
      testCase: { hours: 12, minutes: 58, seconds: 21 },
      expectedResult: "+ 2 meneti ki te 1"
    },

    // AM tests
    {
      name: "on the quarter hour AM",
      testCase: { hours: 9, minutes: 15, seconds: 0 },
      expectedResult: "+ hauwhā mai i te 9"
    },
    {
      name: "on the half hour AM",
      testCase: { hours: 9, minutes: 30, seconds: 0 },
      expectedResult: "+ Haurua mai i te 9"
    },
    {
      name: "on the 3 quarter hour AM",
      testCase: { hours: 9, minutes: 45, seconds: 0 },
      expectedResult: "+ hauwhā ki te 10"
    },
    {
      name: "in the second to last minute of the hour AM",
      testCase: { hours: 9, minutes: 58, seconds: 15 },
      expectedResult: "+ 2 meneti ki te 10"
    },
    {
      name: "in the last minute of the hour AM",
      testCase: { hours: 9, minutes: 59, seconds: 30 },
      expectedResult: "30 hekona ki te 10"
    },

    // 12 AM Tests
    {
      name: "just after midday",
      testCase: { hours: 12, minutes: 0, seconds: 7 },
      expectedResult: "+ 12 karaka"
    },
    {
      name: "45 seconds after midday",
      testCase: { hours: 12, minutes: 0, seconds: 45 },
      expectedResult: "− 1 meneti mai i te 12"
    },

    // PM Tests
    {
      name: "on the quarter hour PM",
      testCase: { hours: 19, minutes: 15, seconds: 0 },
      expectedResult: "+ hauwhā mai i te 7"
    },
    {
      name: "on the half hour PM",
      testCase: { hours: 19, minutes: 30, seconds: 0 },
      expectedResult: "+ Haurua mai i te 7"
    },
    {
      name: "on the 3 quarter hour PM",
      testCase: { hours: 19, minutes: 45, seconds: 0 },
      expectedResult: "+ hauwhā ki te 8"
    },
    {
      name: "in the second to last minute of the hour PM",
      testCase: { hours: 19, minutes: 58, seconds: 15 },
      expectedResult: "+ 2 meneti ki te 8"
    },
    {
      name: "in the latter half of the second to last minute of the hour PM",
      testCase: { hours: 19, minutes: 58, seconds: 45 },
      expectedResult: "− 1 meneti ki te 8"
    },
    {
      name: "on the last minute of the hour PM",
      testCase: { hours: 19, minutes: 59, seconds: 0 },
      expectedResult: "60 hekona ki te 8"
    },
    {
      name: "in the last minute of the hour PM",
      testCase: { hours: 19, minutes: 59, seconds: 30 },
      expectedResult: "30 hekona ki te 8"
    },
    {
      name: "in the last seconds of the hour PM",
      testCase: { hours: 19, minutes: 59, seconds: 48 },
      expectedResult: "12 hekona ki te 8"
    }
  ]
};

let runTimeTests = (tests, lang) => {
  tests[lang].forEach(function(test) {
    const testName = `${lang}: Returns the correct string ${test.name}`;
    it(testName, async () => {
      let wrapper;

      await act(async () => {
        await i18n.changeLanguage(lang);

        wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <TimeString timeParts={test.testCase} />
          </I18nextProvider>
        );
      });

      expect(wrapper.text()).toBe(test.expectedResult);
    });
  });
};

runTimeTests(timeTests, "EN");
runTimeTests(timeTests, "MI");
