const regexParser = /\[?(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}),? (\d{1,2}[.:]\d{1,2}(?:[.:]\d{1,2})?)(?: ([ap]\.?m\.?))?\]?(?: -|:)? (.+?): ((?:.|\s)+)/i;
const regexParserSystem = /\[?(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}),? (\d{1,2}[.:]\d{1,2}(?:[.:]\d{1,2})?)(?: ([ap]\.?m\.?))?\]?(?: -|:)? ((?:.|\s)+)/i;
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
       * we should consider it a "whatsapp event" and discard it
       */
      if (regexStartsWithDateTime.test(line)) {
        return acc.concat({ system: true, msg: line });
      }

      // Else it's part of the previous message and it should be concatenated
      return acc
        .slice(0, -1)
        .concat({ system: false, msg: `${acc.slice(-1)[0].msg}\n${line}` });
    }

    return acc.concat({ system: false, msg: line });
  }, []);
}

/**
 * Given an array of messages, parses them and returns an object with the fields
 * date, time, ampm, author, message
 */
function parseMessages(messages) {
  return messages.map(obj => {
    const { system, msg } = obj;

    // If it's a system message another regex should be used to parse it
    if (system) {
      const [, date, time, ampm, message] = regexParserSystem.exec(msg);

      return { date, time, ampm: ampm || null, author: 'System', message };
    }

    const [, date, time, ampm, author, message] = regexParser.exec(msg);

    return { date, time, ampm: ampm || null, author, message };
  });
}

module.exports = {
  makeArrayOfMessages,
  parseMessages,
};
