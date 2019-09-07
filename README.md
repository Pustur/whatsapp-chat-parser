# WhatsApp Chat Parser

[![CircleCI](https://circleci.com/gh/Pustur/whatsapp-chat-parser/tree/master.svg?style=svg)](https://circleci.com/gh/Pustur/whatsapp-chat-parser/tree/master)
[![npm version](https://img.shields.io/npm/v/whatsapp-chat-parser.svg)](https://www.npmjs.com/package/whatsapp-chat-parser)
[![minified size](https://img.shields.io/bundlephobia/min/whatsapp-chat-parser.svg)](https://bundlephobia.com/result?p=whatsapp-chat-parser)

> A package to parse WhatsApp chat logs 💬

You can test the package online with this example website:  
[whatsapp-chat-parser.netlify.com](https://whatsapp-chat-parser.netlify.com/) ([Source code](https://github.com/Pustur/whatsapp-chat-parser-website))

## Install

```
$ npm install whatsapp-chat-parser
```

## Usage

### Node

```javascript
const fs = require('fs');
const whatsapp = require('whatsapp-chat-parser');

const fileContents = fs.readFileSync('path/to/file.txt', 'utf8');

whatsapp
  .parseString(fileContents)
  .then(messages => {
    // Do whatever you want with messages
  })
  .catch(err => {
    // Something went wrong
  });
```

### Browser

Add the script to your HTML file (usually just before the closing `</body>` tag).  
Then use it in your JavaScript code, the `whatsappChatParser` variable will be globally available.

```html
<script src="path/to/whatsapp-chat-parser.min.js"></script>
<script>
  whatsappChatParser
    .parseString('06/03/2017, 00:45 - Sample User: This is a test message')
    .then(messages => {
      // Do whatever you want with messages
    })
    .catch(err => {
      // Something went wrong
    });
</script>
```

You can also use the [jsDelivr CDN](https://www.jsdelivr.com/package/npm/whatsapp-chat-parser).

```html
<script src="https://cdn.jsdelivr.net/npm/whatsapp-chat-parser/dist/whatsapp-chat-parser.min.js"></script>
<!-- Or use a specific version -->
<script src="https://cdn.jsdelivr.net/npm/whatsapp-chat-parser@2.0.6/dist/whatsapp-chat-parser.min.js"></script>
```

&nbsp;

The `messages` variable is an array of objects like this:

```javascript
[
  {
    date: '2018-06-02T22:45:00.000Z', // Date object
    author: 'Luke',
    message: 'Hey how are you?',
  },
  {
    date: '2018-06-02T23:48:00.000Z', // Date object
    author: 'Joe',
    message: 'All good, thanks',
  },
];
```

In the case of a system message, the author will be `System`

```javascript
[
  {
    date: '2018-06-02T22:45:00.000Z', // Date object
    author: 'System',
    message: 'You created group "Party 🎉"',
  },
];
```

## API

### parseString(string, [options]) → Promise

**string**

Type: `string`

Raw string of the WhatsApp conversation

**options**

Type: `object`

A configuration object, more details below

## Options

<!-- prettier-ignore-start -->
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| daysFirst | `Boolean` | `undefined` | Specify if the dates in your log file start with a day (`true`) or a month (`false`). Manually specifying this may improve performance. By default the program will try to infer this information using 3 different methods (look at [`date.js`](src/date.js) for the implementation), if all fails it defaults to interpret the first digit as the day. |
| setRunningMessageId | `Boolean` | `false` | Specify if you want running id-numbering in each message row to be added. This can be useful if you want to order messages or loop them through map. |
<!-- prettier-ignore-end -->

## How to export WhatsApp chats

- [Android](https://faq.whatsapp.com/en/android/23756533/)
- [iPhone](https://faq.whatsapp.com/en/iphone/20888066/#email)
- [Windows Phone](https://faq.whatsapp.com/en/wp/22548236)

## Technologies used

- Testing: [Jest](https://jestjs.io/)
- Code formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb-base))

## Requirements

### Node

`Node.js >= 8.0.0`

### Browser

This package is written in ES6 and transpiled to ES5.  
It should work in all relevant browsers.  
If the browsers you're targeting support [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) / [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) / [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) you're probably good to go.

## Changelog

[CHANGELOG](CHANGELOG.md)

## License

[MIT](LICENSE)
