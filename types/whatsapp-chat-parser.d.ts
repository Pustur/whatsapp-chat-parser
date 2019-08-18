interface Message {
  date: Date;
  author: string;
  message: string;
}

interface ParseStringOptions {
  /**
   * Specify if the dates in your log file start with a day (true) or a month (false).
   * Manually specifying this may improve performance.
   */
  daysFirst?: boolean;
}

/**
 * Parses the contents of a WhatsApp chat log.
 * Returns a promise that will contain the parsed messages.
 */
export function parseString(
  string: string,
  options?: ParseStringOptions,
): Promise<Message[]>;
