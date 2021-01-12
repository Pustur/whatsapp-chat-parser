interface Message {
  /**
   * The date of the message.
   */
  date: Date;
  /**
   * The author of the message. Will be `System` for messages without an author.
   */
  author: string;
  /**
   * The message itself.
   */
  message: string;
  /**
   * Available for messages containing attachments when setting the option
   * `parseAttachments` to `true`.
   */
  attachment?: {
    /**
     * The filename of the attachment, including the extension.
     */
    fileName: string;
  };
}

interface ParseStringOptions {
  /**
   * Specify if the dates in your log file start with a day `true` or a month
   * `false`.
   * Manually specifying this may improve performance.
   */
  daysFirst?: boolean;
  /**
   * Specify if attachments should be parsed.
   * If set to `true`, messages containing attachments will include an
   * `attachment` property.
   */
  parseAttachments?: boolean;
}

/**
 * Parses the contents of a WhatsApp chat log.
 * Returns a promise that will contain the parsed messages.
 */
export function parseString(
  string: string,
  options?: ParseStringOptions,
): Promise<Message[]>;
