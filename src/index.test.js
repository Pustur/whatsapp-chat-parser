const whatsappParser = require('./index.js');

describe('index.js', () => {
  describe('parseFile', () => {
    it('should reject if no filepath is given', () => {
      expect.assertions(1);

      return expect(whatsappParser.parseFile()).rejects.toBeTruthy();
    });

    it('should reject if no file is found', () => {
      expect.assertions(1);

      return expect(whatsappParser.parseFile('')).rejects.toBeTruthy();
    });

    it("should reject if the file has a different format than whatsapp's", () => {
      expect.assertions(1);

      return expect(
        whatsappParser.parseFile('./samples/not-a-whatsapp-chat.txt'),
      ).rejects.toBeTruthy();
    });

    it('should return an empty array if an empty file is parsed', () => {
      expect.assertions(1);

      return expect(
        whatsappParser.parseFile('./samples/empty.txt'),
      ).resolves.toEqual([]);
    });

    it('should contain a correct amount of parsed messages', () => {
      expect.assertions(1);

      return whatsappParser
        .parseFile('./samples/short-chat.txt')
        .then(messages => {
          expect(messages).toHaveLength(5);
        });
    });
  });
});
