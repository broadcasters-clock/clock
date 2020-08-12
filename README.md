# Broadcaster's Clock

A problem many broadcasters face is telling the time correctly while on air.

It is quite common for hosts to get the hour wrong, or if things are busy in the studio, to completely mess up the time all together.

In the late 1990s Geoff Robinson, host of Radio New Zealand's Morning Report programme, asked me if it was possible to have a clock that showed the time in words. I said that it was, but would probably be a bit of work.

In 2004 I started learning Delphi, and realised this finally was the chance to make Geoff's clock.

This was given to Geoff and installed on a studio computer in 2004, and in a short amount of time other staff were asking for the app. As far as I know it is still in use.

Note that the PCs in most broadcast studios are locked to a master clock, so the time displayed on the app is correct. YMMV.

IT departments tend to be a bit sniffy about installing stuff from random sources they don't know, and I'd often thought of doing an online version.

Even though I left RNZ in 2016, I still thought it would be a good idea, so here it is!

This form of the clock will allow it to be used by anyone, simply.

The only prerequisite is that the PC you use the clock on needs to be locked to your station's master clock.

There is a [live version of the clock](https://broadcasters-clock.github.io/clock/) so you don't have to run the code locally.

## Telling time

On air, time is expressed in a somewhat flexible manner.

The following are common:

It is coming up to 10 past 8
It's a quarter past 4
It is 5 past 9.

In the first 30 seconds after a minute change, the time is expressed as that minute, or just after.

I.e. At 10:30:15 it is "Half past 10".

In the second 30 seconds after a minute change, the time is usually expressed as coming up to the next minute.

I.e. At 10:37:45 it is "coming up to 23 to 11".

Also note that once the half hour is passed it goes from `past` the current hour to `to` the next hour.

## The clock

The clock presents the time in the manner it would generally be spoken, along with a progress bar so that the position in the minute can be clearly seen.

At the 30 second mark, and 30 minutes mark, the clock switches format to `to` mode automatically, and indicated this with a minus (`-`) sign. A plus (`+`) sign means it is just past the time specified.

Most broadcasters have to time programming up to end at top of each hour. The clock assists by counting down seconds in the last minute of the hour, and changing the colour of the progress bar 15 seconds before the top of the hour.

## Examples

- `- 5 past 10` It is coming up to 5 past 10
- `+ 5 past 10` It is 5 past 10

- `- 12 to 10` It is nearly 12 to past 10
- `+ 12 to 10` It's just gone 12 minutes to 10

Broadcasters tend to vary the words and delivery depending on the minute and hour, and to make the time as clear as possible.

## The code

This code is released under an MIT license.

The algorithm for displaying the time is based on the original Pascal source. When I ported this over I discovered lots of edge cases, and eventually reverted to the logic in the original source, with improvements allowed by Javascript syntax.

While this is not as clean as I'd like, the approach has been battle tested over the last 15 years.

And yes, there are unit tests.

--

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
