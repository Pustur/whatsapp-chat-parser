const { makeArrayOfMessages, parseMessages } = require('./parser.js');

/**
 * Given a promise that will resolve in a string it will process and parse it
 */
function processPromiseResult(promise, options) {
  return promise
    .then(data => data.split('\n'))
    .then(makeArrayOfMessages)
    .then(messages => parseMessages(messages, options));
}

/**
 * Given a string it will parse its content
 * Returns a promise that will contain the parsed messages
 */
function parseString(string, options) {
  return processPromiseResult(Promise.resolve(string), options);
}

module.exports = parseString;
