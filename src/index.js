const fs = require('fs');
const path = require('path');
const util = require('util');
const { makeArrayOfMessages, parseMessages } = require('./parser.js');

/**
 * Just like fs.readFile but returns a promise
 */
const readFile = util.promisify(fs.readFile);

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
 * Given a filepath it will try to open the file and parse its content
 * Returns a promise that will contain the parsed messages
 */
function parseFile(filepath, options) {
  return processPromiseResult(
    readFile(path.resolve(process.env.PWD, filepath), 'utf8'),
    options,
  );
}

/**
 * Given a string it will parse its content
 * Returns a promise that will contain the parsed messages
 */
function parseString(string, options) {
  return processPromiseResult(Promise.resolve(string), options);
}

module.exports = { parseFile, parseString };
