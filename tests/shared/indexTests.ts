function indexTests(whatsappParser) {
  describe('index.js', () => {
    describe('parseString', () => {
      const shortChatPromise = whatsappParser.parseString(
        `06/03/2017, 00:45 - Messages to this group are now secured with end-to-end encryption. Tap for more info.
06/03/2017, 00:45 - You created group "ShortChat"
06/03/2017, 00:45 - Sample User: This is a test message
08/05/2017, 01:48 - TestBot: Hey I'm a test too!
09/04/2017, 01:50 - +410123456789: How are you?

Is everything alright?
`,
      );

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
  });
}

module.exports = indexTests;
