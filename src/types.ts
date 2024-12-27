interface RawMessage {
  system: boolean;
  msg: string;
}

interface Attachment {
  /**
   * The filename of the attachment, including the extension.
   */
  fileName: string;
}

interface Poll {

}

interface Message {
  /**
   * The date of the message.
   */
  date: Date;
  /**
   * The author of the message. Will be null for messages without an author (system messages).
   */
  author: string | null;
  /**
   * The message itself.
   */
  message: string;
  /**
   * Available for messages containing attachments when setting the option
   * `parseAttachments` to `true`.
   */
  attachment?: Attachment;
  /**
 * Available for messages containing attachments when setting the option
 * `parseAttachments` to `true`.
 */
  polls?: Poll[]
}

interface ParseStringOptions {
  /**
   * Specify if the dates in your log file start with a day (`true`) or a month
   * (`false`).
   *
   * Manually specifying this may improve performance.
   */
  daysFirst?: boolean | null;
  /**
   * Specify if attachments should be parsed.
   *
   * If set to `true`, messages containing attachments will include an
   * `attachment` property.
   */
  parseAttachments?: boolean;
  /**
 * Specify if parses polls
 */
  parsePollMessage?: boolean
}

export { RawMessage, Attachment, Message, ParseStringOptions };
