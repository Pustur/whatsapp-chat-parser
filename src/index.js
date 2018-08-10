const fs = require('fs');
const path = require('path');
const { makeArrayOfMessages, parseMessages } = require('./parser.js');

/**
 * Reads a file and returns a promise that will resolve with the data or reject
 * with the error
 */
function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(process.env.PWD, filepath),
      'utf8',
      (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      },
    );
  });
}

/**
 * Given a filepath it will try to open the file and parse its content
 * Returns a promise that will contain the parsed messages
 */
function parseFile(filepath, options) {
  return readFile(filepath)
    .then(data => data.split('\n'))
    .then(makeArrayOfMessages)
    .then(messages => parseMessages(messages, options));
}

module.exports = { parseFile };
