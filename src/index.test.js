const whatsappParser = require('./index.js');

describe('index.js', () => {
  describe('parseFile', () => {
    const shortChatPromise = whatsappParser.parseFile(
      './samples/short-chat.txt',
    );

    it('should reject if no filepath is given', () => {
      expect.assertions(1);

      return expect(whatsappParser.parseFile()).rejects.toBeTruthy();
    });

    it('should reject if no file is found', () => {
      expect.assertions(1);

      return expect(whatsappParser.parseFile('')).rejects.toBeTruthy();
    });

    it('should return an empty array if an empty file is parsed', () => {
      expect.assertions(1);

      return expect(
        whatsappParser.parseFile('./samples/empty.txt'),
      ).resolves.toEqual([]);
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
