# RetireUp Coding Test

## Running the project
1. `git clone https://github.com/MDShields7/retireup-test.git`
2. `cd retureup-test`
3. `npm i`
4. `npm run start`
5. View site on http://localhost:3000/

## Technology used
1. [S&P Return data](https://www.slickcharts.com/sp500/returns/history.json) downloaded and used
2. Create-React-App used
3. RC-Slider Component used

## Features
**On Slider handle drag:**
- Table row visibility changes
- Cumulative return row updates if start year changes

**Negative 'total return' years are red**
(this feature added for 'cumulative return' years too, although it is less likely)