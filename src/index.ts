import { makeArrayOfMessages, parseMessages } from './parser';
import { Message, ParseStringOptions } from './types';

/**
 * Given a string it will parse its content
 * Returns a promise that will contain the parsed messages
 */
export function parseString(
  string: string,
  options?: ParseStringOptions,
): Promise<Message[]> {
  return Promise.resolve(string)
    .then(data => data.split(/(?:\r\n|\r|\n)/))
    .then(makeArrayOfMessages)
    .then(messages => parseMessages(messages, options));
}
