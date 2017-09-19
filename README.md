# json-information-card

[![npm version](https://badge.fury.io/js/json-information-card.svg)](https://badge.fury.io/js/json-information-card)
[![dependencies Status](https://david-dm.org/bhrgv-bolla/react-json-information-card/status.svg)](https://david-dm.org/bhrgv-bolla/react-json-information-card)
[![devDependencies Status](https://david-dm.org/bhrgv-bolla/react-json-information-card/dev-status.svg)](https://david-dm.org/bhrgv-bolla/react-json-information-card?type=dev)
[![Build Status](https://travis-ci.org/bhrgv-bolla/react-json-information-card.svg?branch=master)](https://travis-ci.org/bhrgv-bolla/react-json-information-card)
[![codecov](https://codecov.io/gh/bhrgv-bolla/react-json-information-card/branch/master/graph/badge.svg)](https://codecov.io/gh/bhrgv-bolla/react-json-information-card)

 JSON has become the de-facto standard of sharing information b/w systems. While the information
 is consumed for many different purposes, often a requirement arises to display information in a 
 very simple straight forward way. This customizable component will help do that. It tries to provide
 a decent view mainly driven by configuration / meta information. 


## Demo & Examples

Live demo: [bhrgv-bolla.github.io/json-information-card](http://bhrgv-bolla.github.io/json-information-card/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use json-information-card is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/json-information-card.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install json-information-card --save
```


## Usage

__EXPLAIN USAGE HERE__

```
var JsonInformationCard = require('json-information-card');

<JsonInformationCard>Example</JsonInformationCard>
```

### Properties

* __DOCUMENT PROPERTIES HERE__

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
