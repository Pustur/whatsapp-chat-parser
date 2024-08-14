# WhatsApp Chat Parser

[![Continuous Integration](https://github.com/Pustur/whatsapp-chat-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/Pustur/whatsapp-chat-parser/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Pustur/whatsapp-chat-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/Pustur/whatsapp-chat-parser)
[![npm version](https://img.shields.io/npm/v/whatsapp-chat-parser.svg)](https://www.npmjs.com/package/whatsapp-chat-parser)
[![minified size](https://img.shields.io/bundlephobia/min/whatsapp-chat-parser.svg)](https://bundlephobia.com/result?p=whatsapp-chat-parser)

> A package to parse WhatsApp chats with Node.js or in the browser 💬

## Important notice

🚨 `v4.0.0` brings some **BREAKING CHANGES**, check out the [release page](https://github.com/Pustur/whatsapp-chat-parser/releases/tag/4.0.0) for more info.

## Introduction

This library allows you to parse WhatsApp chat logs from text format into javascript objects, enabling you to more easily manipulate the data, create statistics, export it in different formats, etc.

You can test the package online with this example website:  
[whatsapp-chat-parser.netlify.app](https://whatsapp-chat-parser.netlify.app/) ([Source code](https://github.com/Pustur/whatsapp-chat-parser-website))

## Install

```
$ npm install whatsapp-chat-parser
```

## Usage

### Node

```js
import fs from 'node:fs';
import * as whatsapp from 'whatsapp-chat-parser';

const text = fs.readFileSync('path/to/_chat.txt', 'utf8');
const messages = whatsapp.parseString(text);

console.log(messages);
```

### Browser

Add the script to your HTML file (usually just before the closing `</body>` tag).  
Then use it in your JavaScript code, the `whatsappChatParser` variable will be globally available.

```html
<script src="path/to/index.global.js"></script>
<script>
  const messages = whatsappChatParser.parseString(
    '06/03/2017, 00:45 - Sample User: This is a test message',
  );

  console.log(messages);
</script>
```

Or with `type="module"` loading the ESM version:

```html
<script type="module">
  import * as whatsapp from 'path/to/index.js';

  const messages = whatsapp.parseString(
    '06/03/2017, 00:45 - Sample User: This is a test message',
  );

  console.log(messages);
</script>
```

You can also use the [jsDelivr CDN](https://www.jsdelivr.com/package/npm/whatsapp-chat-parser).

```html
<script src="https://cdn.jsdelivr.net/npm/whatsapp-chat-parser/dist/index.global.js"></script>
<!-- Or use a specific version -->
<script src="https://cdn.jsdelivr.net/npm/whatsapp-chat-parser@4.0.1/dist/index.global.js"></script>
```

## Message structure

The `messages` variable is an array of objects like this:

```js
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

When using the option [`parseAttachments`](#options), the message may contain an additional property `attachment`:

```js
[
  {
    date: '2018-06-02T23:50:00.000Z', // Date object
    author: 'Joe',
    message: '<attached: 00000042-PHOTO-2020-06-07-15-13-20.jpg>',
    attachment: {
      fileName: '00000042-PHOTO-2020-06-07-15-13-20.jpg',
    },
  },
];
```

In the case of a system message, the author will be `null`

```js
[
  {
    date: '2018-06-02T22:45:00.000Z', // Date object
    author: null,
    message: 'You created group "Party 🎉"',
  },
];
```

## API

### parseString(string, [options]) → Array

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
| daysFirst | `Boolean` | `undefined` | Specify if the dates in your log file start with a day (`true`) or a month (`false`). Manually specifying this may improve performance. By default the program will try to infer this information using 3 different methods (look at [`date.ts`](src/date.ts) for the implementation), if all fails it defaults to days first. |
| parseAttachments | `Boolean` | `false` | Specify if attachments should be parsed. If set to `true`, messages with attachments will include an `attachment` property with information about the attachment. |
<!-- prettier-ignore-end -->

## A note about messages order

Sometimes, likely due to connection issues, WhatsApp exports contain messages that are not chronologically ordered.  
This library won't change the order of the messages, but if your application expects a certain order make sure to sort the array of messages accordingly before use.

See [#247](https://github.com/Pustur/whatsapp-chat-parser/issues/247) for more info.

## How to export WhatsApp chats

- [Android](https://faq.whatsapp.com/android/chats/how-to-save-your-chat-history)
- [iPhone](https://faq.whatsapp.com/iphone/chats/how-to-back-up-to-icloud/)

## Technologies used

- Language: [TypeScript](https://www.typescriptlang.org/)
- Testing: [Vitest](https://vitest.dev/)
- Code formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb-base))

## Requirements

### Node

`Node.js >= 8.0.0`

### Browser

This package is written in TypeScript with target compilation to ES6.  
It should work in all relevant browsers from ~2017 onwards.

## Changelog

[CHANGELOG](CHANGELOG.md)

## License

[MIT](LICENSE)
