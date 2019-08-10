import createTimeString from './createTimeString';


const timeTests = [

  // Special cases
  {
      name: "at midnight",
      testCase: {hours: 0, minutes: 0, seconds: 0},
      expectedResult: 'Midnight'
  },
  {
      name: "at midday",
      testCase: {hours: 12, minutes: 0, seconds: 0},
      expectedResult: 'Midday'
  },

  // AM tests
  {
      name: "on the quarter hour AM",
      testCase: {hours: 9, minutes: 15, seconds: 0},
      expectedResult: '+ Quarter past 9'
  },
  {
      name: "on the half hour AM",
      testCase: {hours: 9, minutes: 30, seconds: 0},
      expectedResult: '+ Half past 9'
  },
  {
      name: "on the 3 quarter hour AM",
      testCase: {hours: 9, minutes: 45, seconds: 0},
      expectedResult: '+ Quarter to 10'
  },
  {
      name: "in the second to last minute of the hour AM",
      testCase: {hours: 9, minutes: 58, seconds: 15},
      expectedResult: '+ 2 minutes to 10'
  },
  {
      name: "in the last minute of the hour AM",
      testCase: {hours: 9, minutes: 59, seconds: 30},
      expectedResult: '30 seconds to 10'
  },

  // PM Tests
  {
      name: "on the quarter hour PM",
      testCase: {hours: 19, minutes: 15, seconds: 0},
      expectedResult: '+ Quarter past 7'
  },
  {
      name: "on the half hour PM",
      testCase: {hours: 19, minutes: 30, seconds: 0},
      expectedResult: '+ Half past 7'
  },
  {
      name: "on the 3 quarter hour PM",
      testCase: {hours: 19, minutes: 45, seconds: 0},
      expectedResult: '+ Quarter to 8'
  },
  {
      name: "in the second to last minute of the hour PM",
      testCase: {hours: 19, minutes: 58, seconds: 15},
      expectedResult: '+ 2 minutes to 8'
  },
  {
      name: "in the latter half of the second to last minute of the hour PM",
      testCase: {hours: 19, minutes: 58, seconds: 45},
      expectedResult: '- 1 minute to 8'
  },
  {
      name: "on the last minute of the hour PM",
      testCase: {hours: 19, minutes: 59, seconds: 0},
      expectedResult: '60 seconds to 8'
  },
  {
      name: "in the last minute of the hour PM",
      testCase: {hours: 19, minutes: 59, seconds: 30},
      expectedResult: '30 seconds to 8'
  },
  {
      name: "in the last seconds of the hour PM",
      testCase: {hours: 19, minutes: 59, seconds: 48},
      expectedResult: '12 seconds to 8'
  },

];

let runTimeTests = (tests) => {
  tests.forEach(function(test) {
    const testName = "Returns the correct string " + test.name
    it(testName, () => {
      expect(createTimeString(test.testCase)).toBe(test.expectedResult);
    });
  });
};

runTimeTests(timeTests);

//
// it('Return the correct string at 11:32:14', () => {
//   expect(createTimeString({hours: 11, minutes: 32, seconds: 14})).toBe('+ 28 minutes to 12');
// });
//
// it('Return the correct string at 11:32:30', () => {
//   expect(createTimeString({hours: 11, minutes: 32, seconds: 30})).toBe('+ 28 minutes to 12');
// });

// it('Return the correct string at 11:32:35', () => {
//   expect(createTimeString({hours: 11, minutes: 32, seconds: 35})).toBe('- 27 minutes to 12');
// });
//
// it('Return the correct string at 14:32:35', () => {
//   expect(createTimeString({hours: 14, minutes: 32, seconds: 35})).toBe('- 27 minutes to 12');
// });
//
// it('Return the correct string at 11:32:59', () => {
//   expect(createTimeString({hours: 11, minutes: 32, seconds: 59})).toBe('- 27 minutes to 12');
// });
//
// it('Return the correct string at 14:32:59', () => {
//   expect(createTimeString({hours: 14, minutes: 32, seconds: 59})).toBe('- 27 minutes to 3');
// });
