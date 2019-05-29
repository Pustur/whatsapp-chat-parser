const { makeArrayOfMessages, parseMessages } = require('./parser.js');

/**
 * Given a string it will parse its content
 * Returns a promise that will contain the parsed messages
 */
function parseString(string, options) {
  return Promise.resolve(string)
    .then(data => data.split('\n'))
    .then(makeArrayOfMessages)
    .then(messages => parseMessages(messages, options));
}

module.exports = { parseString };
