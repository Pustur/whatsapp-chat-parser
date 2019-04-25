# WhatsApp Chat Parser

[![Greenkeeper badge](https://badges.greenkeeper.io/Pustur/whatsapp-chat-parser.svg)](https://greenkeeper.io/)

> A package to parse WhatsApp chat logs 💬

## Install

```
$ npm install whatsapp-chat-parser
```

## Usage

```javascript
const whatsapp = require('whatsapp-chat-parser');

whatsapp
  .parseFile('path/to/file.txt')
  .then(messages => {
    // Do whatever you want with messages
  })
  .catch(err => {
    // Something went wrong
  });
```

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

### parseFile(filepath, [options]) → Promise

**filepath**

Type: `string`

Path to the file to parse.

**options**

Type: `object`

### parseString(string, [options]) → Promise

**string**

Type: `string`

Raw string of the WhatsApp conversation

**options**

Type: `object`

## Options

<!-- prettier-ignore-start -->
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| daysFirst | `Boolean` | `undefined` | Specify if your log file's date starts with a day (`true`) or a month (`false`). Manually specifying this may improve performance. By default the program will try to infer this information using 3 different methods (look at [`date.js`](src/date.js) for the implementation), if all fails it defaults to interpret the first digit as the day. |
<!-- prettier-ignore-end -->

## Technologies used

- Testing: [Jest](https://jestjs.io/)
- Code formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb-base))

## Requirements

`Node.js >= 8.0.0`

## Changelog

[CHANGELOG](CHANGELOG.md)

## License

[MIT](LICENSE)
