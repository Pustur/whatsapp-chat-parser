const { makeArrayOfMessages, parseMessages } = require('./parser.js');

describe('parser.js', () => {
  describe('makeArrayOfMessages', () => {
    const multilineMessage = ['23/06/2018, 01:55 p.m. - Loris: one', 'two'];
    const systemMessage = ['06/03/2017, 00:45 - You created group "Test"'];

    it('should merge multiline messages', () => {
      expect(makeArrayOfMessages(multilineMessage)[0].msg).toBe(
        '23/06/2018, 01:55 p.m. - Loris: one\ntwo',
      );
    });

    it('should not flag normal messages as system messages', () => {
      expect(makeArrayOfMessages(multilineMessage)[0].system).toBe(false);
    });

    it('should flag system messages', () => {
      expect(makeArrayOfMessages(systemMessage)[0].system).toBe(true);
    });
  });

  describe('parseMessages', () => {
    it('should parse messages correctly', () => {
      const messages = [
        { system: false, msg: '23/06/2018, 01:55 a.m. - Luke: Hey!' },
      ];
      const parsed = parseMessages(messages);

      expect(parsed[0].date).toBe('23/06/2018');
      expect(parsed[0].time).toBe('01:55');
      expect(parsed[0].ampm).toBe('a.m.');
      expect(parsed[0].author).toBe('Luke');
      expect(parsed[0].message).toBe('Hey!');
    });

    it('should parse system messages correctly', () => {
      const messages = [
        { system: true, msg: '06/03/2017, 00:45 - You created group "Test"' },
      ];
      const parsed = parseMessages(messages);

      expect(parsed[0].date).toBe('06/03/2017');
      expect(parsed[0].time).toBe('00:45');
      expect(parsed[0].ampm).toBe(null);
      expect(parsed[0].author).toBe('System');
      expect(parsed[0].message).toBe('You created group "Test"');
    });
  });
});
