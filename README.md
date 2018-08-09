# WhatsApp Chat Parser

> A package to parse WhatsApp chat logs 💬

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

## Technologies used

- Testing: [Jest](https://jestjs.io/)
- Code formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb-base))

## Requirements

`Node.js >= 8.0.0`

## License

[MIT](LICENSE)
