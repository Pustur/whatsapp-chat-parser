import * as whatsappParser from '../src/index';

const chatExample = `06/03/2017, 00:45 - Messages to this group are now secured with end-to-end encryption. Tap for more info.
06/03/2017, 00:45 - You created group "ShortChat"
06/03/2017, 00:45 - Sample User: This is a test message
08/05/2017, 01:48 - TestBot: Hey I'm a test too!
09/04/2017, 01:50 - +410123456789: How are you?

Is everything alright?
`;

describe('index.js', () => {
  describe('parseString', () => {
    const shortChatPromise = whatsappParser.parseString(chatExample);

    it('should return an empty array if an empty string is parsed', () => {
      expect.assertions(1);

      return expect(whatsappParser.parseString('')).resolves.toEqual([]);
    });

    it('should contain a correct amount of parsed messages', () => {
      expect.assertions(1);

      return shortChatPromise.then(messages => {
        expect(messages).toHaveLength(5);
      });
    });

    it('should not swallow empty lines', () => {
      expect.assertions(1);

      return shortChatPromise.then(messages => {
        expect(messages[4].message).toBe(
          'How are you?\n\nIs everything alright?\n',
        );
      });
    });
  });

  describe('parseStringSync', () => {
    const messages = whatsappParser.parseStringSync(chatExample);

    it('should return an empty array if an empty string is parsed', () => {
      expect(whatsappParser.parseStringSync('')).toEqual([]);
    });

    it('should contain a correct amount of parsed messages', () => {
      expect(messages).toHaveLength(5);
    });

    it('should not swallow empty lines', () => {
      expect(messages[4].message).toBe(
        'How are you?\n\nIs everything alright?\n',
      );
    });
  });

  describe('fixes', () => {
    it(`should pass for issue #237`, () => {
      const messages = whatsappParser.parseStringSync(
        '30/12/2020 13:00 - a: m\n13/1/2021 13:00 - a: m',
      );

      expect(messages[0].date.toISOString()).toBe('2020-12-30T13:00:00.000Z');
      expect(messages[1].date.toISOString()).toBe('2021-01-13T13:00:00.000Z');
    });
  });
});
