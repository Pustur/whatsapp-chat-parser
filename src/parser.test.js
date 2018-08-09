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
    describe('normal messages', () => {
      const messages = [
        { system: false, msg: '23/06/2018, 01:55 a.m. - Luke: Hey!' },
      ];
      const parsed = parseMessages(messages);

      describe('the date', () => {
        it('should be an instance of the Date object', () => {
          expect(parsed[0].date).toBeInstanceOf(Date);
        });

        it('should contain the correct date', () => {
          expect(parsed[0].date.getFullYear()).toBe(2018);
          expect(parsed[0].date.getMonth()).toBe(5);
          expect(parsed[0].date.getDate()).toBe(23);
        });

        it('should contain the correct time', () => {
          expect(parsed[0].date.getHours()).toBe(1);
          expect(parsed[0].date.getMinutes()).toBe(55);
          expect(parsed[0].date.getSeconds()).toBe(0);
        });
      });

      describe('the author', () => {
        it('should contain the correct author', () => {
          expect(parsed[0].author).toBe('Luke');
        });
      });

      describe('the message', () => {
        it('should contain the correct message', () => {
          expect(parsed[0].message).toBe('Hey!');
        });
      });
    });

    describe('system messages', () => {
      const messages = [
        { system: true, msg: '06/03/2017, 00:45 - You created group "Test"' },
      ];
      const parsed = parseMessages(messages);

      describe('the date', () => {
        it('should be an instance of the Date object', () => {
          expect(parsed[0].date).toBeInstanceOf(Date);
        });

        it('should contain the correct date', () => {
          expect(parsed[0].date.getFullYear()).toBe(2017);
          expect(parsed[0].date.getMonth()).toBe(2);
          expect(parsed[0].date.getDate()).toBe(6);
        });

        it('should contain the correct time', () => {
          expect(parsed[0].date.getHours()).toBe(0);
          expect(parsed[0].date.getMinutes()).toBe(45);
          expect(parsed[0].date.getSeconds()).toBe(0);
        });
      });

      describe('the author', () => {
        it('should contain the correct author', () => {
          expect(parsed[0].author).toBe('System');
        });
      });

      describe('the message', () => {
        it('should contain the correct message', () => {
          expect(parsed[0].message).toBe('You created group "Test"');
        });
      });
    });
  });
});
