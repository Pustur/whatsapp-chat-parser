import { makeArrayOfMessages, parseMessages } from './parser';
import { Message, ParseStringOptions } from './types';

const newlinesRegex = /(?:\r\n|\r|\n)/;

/**
 * Parses a string containing a WhatsApp chat log.
 *
 * Returns an array of parsed messages.
 *
 * @since 3.2.0
 * @since 4.0.0 Renamed from parseStringSync
 */
export function parseString(
  string: string,
  options: ParseStringOptions = { parseAttachments: false },
): Message[] {
  const lines = string.split(newlinesRegex);
  return parseMessages(makeArrayOfMessages(lines), options);
}
