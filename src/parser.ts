import { daysBeforeMonths, normalizeDate, orderDateComponents } from './date';
import {
  regexSplitTime,
  convertTime12to24,
  normalizeAMPM,
  normalizeTime,
} from './time';
import { Attachment, Message, RawMessage, ParseStringOptions } from './types';

const sharedRegex =
  /^(?:\u200E|\u200F)*\[?(\d{1,4}[-/.]\s?\d{1,4}[-/.]\s?\d{1,4})[,.]?\s\D*?(\d{1,2}[.:]\d{1,2}(?:[.:]\d{1,2})?)(?:\s([ap]\.?\s?m\.?))?\]?(?:\s-|:)?\s/;
const authorAndMessageRegex = /(.+?):\s([^]*)/;
const messageRegex = /([^]+)/;
const regexParser = new RegExp(
  sharedRegex.source + authorAndMessageRegex.source,
  'i',
);
const regexParserSystem = new RegExp(
  sharedRegex.source + messageRegex.source,
  'i',
);
const regexAttachment = /<.+:(.+)>|([A-Z\d-]+\.\w+)\s[(<].+[)>]/;

/**
 * Takes an array of lines and detects the lines that are part of a previous
 * message (multiline messages) and merges them.
 *
 * It also labels messages without an author as system messages.
 */
function makeArrayOfMessages(lines: string[]): RawMessage[] {
  return lines.reduce((acc: RawMessage[], line) => {
    /*
     * If the line doesn't match the regex it's probably part of the previous
     * message or a "WhatsApp event"
     */
    if (!regexParser.test(line)) {
      /*
       * If it doesn't match the first regex but still matches the system regex
       * it should be considered a "WhatsApp event" so it gets labeled "system"
       */
      if (regexParserSystem.test(line)) {
        acc.push({ system: true, msg: line });
      }

      // Else it's part of the previous message and it should be concatenated
      else if (typeof acc[acc.length - 1] !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const prevMessage = acc.pop()!;

        acc.push({
          system: prevMessage.system,
          msg: `${prevMessage.msg}\n${line}`,
        });
      }
    } else {
      acc.push({ system: false, msg: line });
    }

    return acc;
  }, []);
}

/**
 * Parses a message extracting the attachment if it's present.
 */
function parseMessageAttachment(message: string): Attachment | null {
  const attachmentMatch = message.match(regexAttachment);

  if (!attachmentMatch) return null;
  return {
    fileName: (attachmentMatch[1] || attachmentMatch[2]).trim(),
  };
}

/**
 * Parses and array of raw messages into an array of structured objects.
 */
function parseMessages(
  messages: RawMessage[],
  options: ParseStringOptions = {},
): Message[] {
  let { daysFirst } = options;
  const { parseAttachments } = options;

  // Parse messages with regex
  const parsed = messages.map(obj => {
    const { system, msg } = obj;

    // If it's a system message another regex should be used to parse it
    if (system) {
      const [, date, time, ampm, message] = regexParserSystem.exec(
        msg,
      ) as RegExpExecArray;

      return { date, time, ampm: ampm || null, author: null, message };
    }

    const [, date, time, ampm, author, message] = regexParser.exec(
      msg,
    ) as RegExpExecArray;

    return { date, time, ampm: ampm || null, author, message };
  });

  // Understand date format if not supplied (do days come first?)
  if (typeof daysFirst !== 'boolean') {
    const numericDates = Array.from(
      new Set(parsed.map(({ date }) => date)),
      date => orderDateComponents(date).map(Number),
    );

    daysFirst = daysBeforeMonths(numericDates);
  }

  // Convert date and time in a `Date` object, return the final object
  return parsed.map(({ date, time, ampm, author, message }) => {
    let day: string;
    let month: string;
    let year: string;
    const splitDate = orderDateComponents(date);

    if (daysFirst === false) {
      [month, day, year] = splitDate;
    } else {
      [day, month, year] = splitDate;
    }

    [year, month, day] = normalizeDate(year, month, day);

    const [hours, minutes, seconds] = normalizeTime(
      ampm ? convertTime12to24(time, normalizeAMPM(ampm)) : time,
    ).split(regexSplitTime);

    const finalObject: Message = {
      date: new Date(+year, +month - 1, +day, +hours, +minutes, +seconds),
      author,
      message,
    };

    // Optionally parse attachments
    if (parseAttachments) {
      const attachment = parseMessageAttachment(message);
      if (attachment) finalObject.attachment = attachment;
    }

    return finalObject;
  });
}

export { makeArrayOfMessages, parseMessages };
