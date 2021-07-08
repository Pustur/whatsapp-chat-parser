import { makeArrayOfMessages, parseMessages } from './parser';
import { Message, ParseStringOptions } from './types';

const newlinesRegex = /(?:\r\n|\r|\n)/;

/**
 * Parses a string containing a WhatsApp chat log.
 *
 * Returns a promise that will contain the parsed messages.
 *
 * @since 1.2.0
 */
export function parseString(
  string: string,
  options: ParseStringOptions = { parseAttachments: false },
): Promise<Message[]> {
  return Promise.resolve(string)
    .then(data => data.split(newlinesRegex))
    .then(makeArrayOfMessages)
    .then(messages => parseMessages(messages, options));
}

/**
 * Parses a string containing a WhatsApp chat log.
 *
 * Returns an array of parsed messages.
 *
 * @since 3.2.0
 */
export function parseStringSync(
  string: string,
  options: ParseStringOptions = { parseAttachments: false },
): Message[] {
  const lines = string.split(newlinesRegex);
  return parseMessages(makeArrayOfMessages(lines), options);
}
