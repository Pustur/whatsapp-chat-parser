(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global['whatsapp-chat-parser'] = factory()));
})(this, function() {
  'use strict';

  /**
   * Checks that an item at a certain index of an array is greater than a certain
   * value
   */
  function indexAboveValue(index, value) {
    return array => array[index] > value;
  }

  /**
   * Returns true for a negative number, false otherwise
   * 0 is considered positive
   */
  function isNegative(number) {
    return number < 0;
  }

  /**
   * Given an array of arrays and an index, gropus the inner arrays by the value
   * at the index provided
   * See test cases for a better understanding of this function
   */
  function groupArrayByValueAtIndex(array, index) {
    return Object.values(
      array.reduce((obj, item) => {
        /**
         * Keys that are only numbers get sorted when using Object.values()
         * Adding a prefix avoids this issue
         */
        const key = `key_${item[index]}`;

        if (!obj[key]) {
          obj[key] = [];
        }

        obj[key].push(item);

        return obj;
      }, {}),
    );
  }

  var utils = { indexAboveValue, isNegative, groupArrayByValueAtIndex };

  const {
    indexAboveValue: indexAboveValue$1,
    isNegative: isNegative$1,
    groupArrayByValueAtIndex: groupArrayByValueAtIndex$1,
  } = utils;

  /**
   * Takes an array of numeric dates and tries to understand if the days come
   * before the month or the other way around by checking if numbers go above 12
   *
   * Output is true if days are first, false if they are second, or null if it
   * failed to understand the order
   */
  function checkAbove12(numericDates) {
    const daysFirst = numericDates.some(indexAboveValue$1(0, 12));

    if (daysFirst) {
      return true;
    }

    const daysSecond = numericDates.some(indexAboveValue$1(1, 12));

    if (daysSecond) {
      return false;
    }

    return null;
  }

  /**
   * Takes an array of numeric dates and tries to understand if the days come
   * before the month or the other way around by checking if a set of numbers
   * during the same year decrease at some point
   * If it does it's probably the days since months can only increase in a given
   * year
   *
   * Output is true if days are first, false if they are second, or null if it
   * failed to understand the order
   */
  function checkDecreasing(numericDates) {
    const datesByYear = groupArrayByValueAtIndex$1(numericDates, 2);
    const results = datesByYear.map(dates => {
      const daysFirst = dates.slice(1).some((date, i) => {
        const [first1] = dates[i];
        const [first2] = date;

        return isNegative$1(first2 - first1);
      });

      if (daysFirst) {
        return true;
      }

      const daysSecond = dates.slice(1).some((date, i) => {
        const [, second1] = dates[i];
        const [, second2] = date;

        return isNegative$1(second2 - second1);
      });

      if (daysSecond) {
        return false;
      }

      return null;
    });

    const anyTrue = results.some(value => value === true);

    if (anyTrue) {
      return true;
    }

    const anyFalse = results.some(value => value === false);

    if (anyFalse) {
      return false;
    }

    return null;
  }

  /**
   * Takes an array of numeric dates and tries to understand if the days come
   * before the month or the other way around by looking at which number changes
   * more frequently
   *
   * Output is true if days are first, false if they are second, or null if it
   * failed to understand the order
   */
  function changeFrequencyAnalysis(numericDates) {
    const diffs = numericDates
      .slice(1)
      .map((date, i) =>
        date.map((num, j) => Math.abs(numericDates[i][j] - num)),
      );
    const [first, second] = diffs.reduce(
      (total, diff) => {
        const [first1, second1] = total;
        const [first2, second2] = diff;

        return [first1 + first2, second1 + second2];
      },
      [0, 0],
    );

    if (first > second) {
      return true;
    }

    if (first < second) {
      return false;
    }

    return null;
  }

  /**
   * Takes an array of numeric dates and tries to understand if the days come
   * before the month or the other way around by running the dates through all
   * checks (checkAbove12, checkDecreasing, changeFrequencyAnalysis)
   *
   * Output is true if days are first, false if they are second, or null if it
   * failed to understand the order
   */
  function daysBeforeMonths(numericDates) {
    const firstCheck = checkAbove12(numericDates);

    if (firstCheck !== null) {
      return firstCheck;
    }

    const secondCheck = checkDecreasing(numericDates);

    if (secondCheck !== null) {
      return secondCheck;
    }

    return changeFrequencyAnalysis(numericDates);
  }

  /**
   * Takes year, month and day as strings and pads them as needed
   */
  function normalizeDate(year, month, day) {
    return [
      year.padStart(4, '2000'),
      month.padStart(2, '0'),
      day.padStart(2, '0'),
    ];
  }

  var date = {
    checkAbove12,
    checkDecreasing,
    changeFrequencyAnalysis,
    daysBeforeMonths,
    normalizeDate,
  };

  /**
   * Converts time from 12 hour format to 24 hour format
   * From: https://stackoverflow.com/a/40197728/5303634
   */
  function convertTime12to24(time, ampm) {
    // eslint-disable-next-line prefer-const
    let [hours, minutes, seconds] = time.split(/[:.]/);

    if (hours === '12') {
      hours = '00';
    }

    if (ampm === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}${seconds ? `:${seconds}` : ''}`;
  }

  /**
   * Normalizes a time string to have the following format: hh:mm:ss
   */
  function normalizeTime(time) {
    const [hours, minutes, seconds] = time.split(/[:.]/);

    return `${
      hours.length === 1 ? `0${hours}` : hours
    }:${minutes}:${seconds || '00'}`;
  }

  /**
   * Normalizes am / a.m. / etc. to AM (uppercase, no other characters)
   */
  function normalizeAMPM(ampm) {
    return ampm.replace(/[^apm]/gi, '').toUpperCase();
  }

  var time = { convertTime12to24, normalizeTime, normalizeAMPM };

  const {
    daysBeforeMonths: daysBeforeMonths$1,
    normalizeDate: normalizeDate$1,
  } = date;
  const {
    convertTime12to24: convertTime12to24$1,
    normalizeAMPM: normalizeAMPM$1,
    normalizeTime: normalizeTime$1,
  } = time;

  const regexParser = /\[?(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}),? (\d{1,2}[.:]\d{1,2}(?:[.:]\d{1,2})?)(?: ([ap]\.?m\.?))?\]?(?: -|:)? (.+?): ([^]*)/i;
  const regexParserSystem = /\[?(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}),? (\d{1,2}[.:]\d{1,2}(?:[.:]\d{1,2})?)(?: ([ap]\.?m\.?))?\]?(?: -|:)? ([^]+)/i;
  const regexStartsWithDateTime = /\[?(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}),? (\d{1,2}[.:]\d{1,2}(?:[.:]\d{1,2})?)(?: ([ap]\.?m\.?))?\]?/i;

  /**
   * Given an array of lines, detects the lines that are part of a previous
   * message (multiline messages) and merges them
   * It also labels the system messages
   * The result is an array of messages
   */
  function makeArrayOfMessages(lines) {
    return lines.reduce((acc, line) => {
      /**
       * If the line doesn't conform to the regex it's probably part of the
       * previous message or a "whatsapp event"
       */
      if (!regexParser.test(line)) {
        /**
         * If it doesn't match the first regex but still starts with a datetime
         * it should be considered a "whatsapp event" so it gets labeled "system"
         */
        if (regexStartsWithDateTime.test(line)) {
          return acc.concat({ system: true, msg: line });
        }

        // Last element not set, just skip this (might be an empty file)
        if (typeof acc.slice(-1)[0] === 'undefined') {
          return acc;
        }

        // Else it's part of the previous message and it should be concatenated
        return acc.slice(0, -1).concat({
          system: acc.slice(-1)[0].system,
          msg: `${acc.slice(-1)[0].msg}\n${line}`,
        });
      }

      return acc.concat({ system: false, msg: line });
    }, []);
  }

  /**
   * Given an array of messages, parses them and returns an object with the fields
   * date, author, message
   */
  function parseMessages(messages, options = { daysFirst: undefined }) {
    let { daysFirst } = options;

    // Parse messages with regex
    const parsed = messages.map(obj => {
      const { system, msg } = obj;

      // If it's a system message another regex should be used to parse it
      if (system) {
        const [, date, time, ampm, message] = regexParserSystem.exec(msg);

        return { date, time, ampm: ampm || null, author: 'System', message };
      }

      const [, date, time, ampm, author, message] = regexParser.exec(msg);

      return { date, time, ampm: ampm || null, author, message };
    });

    // Understand date format if not supplied (days come first?)
    if (typeof daysFirst !== 'boolean') {
      const numericDates = Array.from(
        new Set(parsed.map(({ date }) => date)),
        date => date.split(/[-/.]/).map(Number),
      );

      daysFirst = daysBeforeMonths$1(numericDates);
    }

    // Convert date/time in date object, return final object
    return parsed.map(({ date, time, ampm, author, message }) => {
      let day;
      let month;
      let year;

      if (daysFirst === false) {
        [month, day, year] = date.split(/[-/.]/);
      } else {
        [day, month, year] = date.split(/[-/.]/);
      }

      [year, month, day] = normalizeDate$1(year, month, day);

      const [hours, minutes, seconds] = normalizeTime$1(
        ampm ? convertTime12to24$1(time, normalizeAMPM$1(ampm)) : time,
      ).split(/[:.]/);

      return {
        date: new Date(year, month - 1, day, hours, minutes, seconds),
        author,
        message,
      };
    });
  }

  var parser = {
    makeArrayOfMessages,
    parseMessages,
  };

  const {
    makeArrayOfMessages: makeArrayOfMessages$1,
    parseMessages: parseMessages$1,
  } = parser;

  /**
   * Given a promise that will resolve in a string it will process and parse it
   */
  function processPromiseResult(promise, options) {
    return promise
      .then(data => data.split('\n'))
      .then(makeArrayOfMessages$1)
      .then(messages => parseMessages$1(messages, options));
  }

  /**
   * Given a string it will parse its content
   * Returns a promise that will contain the parsed messages
   */
  function parseString(string, options) {
    return processPromiseResult(Promise.resolve(string), options);
  }

  var src = parseString;

  return src;
});
