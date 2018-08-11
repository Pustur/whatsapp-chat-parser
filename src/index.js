const fs = require('fs');
const path = require('path');
const util = require('util');
const { makeArrayOfMessages, parseMessages } = require('./parser.js');

/**
 * Just like fs.readFile but returns a promise
 */
const readFile = util.promisify(fs.readFile);

/**
 * Given a filepath it will try to open the file and parse its content
 * Returns a promise that will contain the parsed messages
 */
function parseFile(filepath, options) {
  return readFile(path.resolve(process.env.PWD, filepath), 'utf8')
    .then(data => data.split('\n'))
    .then(makeArrayOfMessages)
    .then(messages => parseMessages(messages, options));
}

module.exports = { parseFile };
