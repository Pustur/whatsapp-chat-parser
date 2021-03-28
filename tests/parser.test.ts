import { makeArrayOfMessages, parseMessages } from '../src/parser';

describe('parser.js', () => {
  describe('makeArrayOfMessages', () => {
    const multilineMessage = ['23/06/2018, 01:55 p.m. - Loris: one', 'two'];
    const systemMessage = ['06/03/2017, 00:45 - You created group "Test"'];
    const emptyMessage = ['03/02/17, 18:42 - Luke: '];
    const multilineSystemMessage = [
      '06/03/2017, 00:45 - You created group "Test"',
      'This is another line',
    ];

    it('should merge multiline messages', () => {
      expect(makeArrayOfMessages(multilineMessage)[0].msg).toBe(
        '23/06/2018, 01:55 p.m. - Loris: one\ntwo',
      );
    });

    it('should not flag normal messages as system messages', () => {
      expect(makeArrayOfMessages(multilineMessage)[0].system).toBe(false);

      /**
       * Sometimes a message could be empty (for reasons unknown) but should
       * still not be labeled as a system message
       */
      expect(makeArrayOfMessages(emptyMessage)[0].system).toBe(false);

      /**
       * In the unlikely case that whatsapp would start using multiline messages
       * for system notifications we should account for it
       */
      expect(makeArrayOfMessages(multilineSystemMessage)[0].system).toBe(true);
    });

    it('should flag system messages', () => {
      expect(makeArrayOfMessages(systemMessage)[0].system).toBe(true);
    });

    it('should not break when multiline messages start with/contain a datetime', () => {
      expect(
        makeArrayOfMessages(multilineMessage.concat('2016-04-29 10:30:00'))[0]
          .msg,
      ).toBe('23/06/2018, 01:55 p.m. - Loris: one\ntwo\n2016-04-29 10:30:00');
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

    describe('formats', () => {
      /**
       * Examples of various date formats found in whatsapp chats
       *
       * m/d/yy, h:mm
       * m/d/yy, h:mm PM
       * m/d/yy, hh:mm
       * d.m.yyyy, hh:mm
       * dd/mm/yy, hh:mm
       * dd/mm/yy, hh.mm
       * dd-mm-yy hh:mm:ss
       * dd/mm/yyyy, hh:mm
       * dd/mm/yyyy, h:mm p.m.
       * [dd-mm-yy hh:mm:ss]
       * [dd/mm/yy, hh:mm:ss]
       */
      const format1 = [{ system: false, msg: '3/6/18, 1:55 p.m. - a: m' }];
      const format2 = [{ system: false, msg: '03-06-2018, 01.55 PM - a: m' }];
      const format3 = [{ system: false, msg: '13.06.18 21.25.15: a: m' }];
      const format4 = [{ system: false, msg: '[06.13.18 21:25:15] a: m' }];
      const format5 = [{ system: false, msg: '13.6.2018 klo 21.25.15 - a: m' }];
      const format6 = [{ system: false, msg: '13. 6. 2018. 21:25:15 a: m' }];
      const format7 = [{ system: false, msg: '[3/6/18 1:55:00 p. m.] a: m' }];
      // Format8 contains a left-to-right-mark before the date
      const format8 = [{ system: false, msg: '‎[3/6/18 1:55:00 p. m.] a: m' }];
      const format9 = [{ system: false, msg: '[2018/06/13, 21:25:15] a: m' }];
      const format10 = [{ system: false, msg: '[06/2018/13, 21:25:15] a: m' }];

      const parsed1 = parseMessages(format1);
      const parsed2 = parseMessages(format2);
      const parsed3 = parseMessages(format3);
      const parsed4 = parseMessages(format4);
      const parsed5 = parseMessages(format5);
      const parsed6 = parseMessages(format6);
      const parsed7 = parseMessages(format7);
      const parsed8 = parseMessages(format8);
      const parsed9 = parseMessages(format9);
      const parsed10 = parseMessages(format10);

      const expected1 = '2018-06-03T13:55:00.000Z';
      const expected2 = '2018-06-13T21:25:15.000Z';

      describe('the date', () => {
        it('should be parsed correctly in various formats', () => {
          expect(parsed1[0].date.toISOString()).toBe(expected1);
          expect(parsed2[0].date.toISOString()).toBe(expected1);
          expect(parsed3[0].date.toISOString()).toBe(expected2);
          expect(parsed4[0].date.toISOString()).toBe(expected2);
          expect(parsed5[0].date.toISOString()).toBe(expected2);
          expect(parsed6[0].date.toISOString()).toBe(expected2);
          expect(parsed7[0].date.toISOString()).toBe(expected1);
          expect(parsed8[0].date.toISOString()).toBe(expected1);
          expect(parsed9[0].date.toISOString()).toBe(expected2);
          expect(parsed10[0].date.toISOString()).toBe(expected2);
        });
      });
    });

    describe('options', () => {
      describe('daysFirst', () => {
        const messages = [{ system: false, msg: '3/6/18, 1:55 p.m. - a: m' }];
        const parsedDayFirst = parseMessages(messages, { daysFirst: true });
        const parsedMonthFirst = parseMessages(messages, { daysFirst: false });

        it('should allow the user to define if days come first or not', () => {
          expect(parsedDayFirst[0].date.getDate()).toBe(3);
          expect(parsedDayFirst[0].date.getMonth()).toBe(5);
          expect(parsedMonthFirst[0].date.getDate()).toBe(6);
          expect(parsedMonthFirst[0].date.getMonth()).toBe(2);
        });
      });

      describe('parseAttachments', () => {
        const messages = [
          {
            system: false,
            msg:
              '3/6/18, 1:55 p.m. - a: < attached: 00000042-PHOTO-2020-06-07-15-13-20.jpg >',
          },
          {
            system: false,
            msg: '3/6/18, 1:55 p.m. - a: m',
          },
        ];
        const parsedWithoutAttachments = parseMessages(messages, {
          parseAttachments: false,
        });
        const parsedWithAttachments = parseMessages(messages, {
          parseAttachments: true,
        });

        it('should correctly parse the attachment string', () => {
          expect(parsedWithAttachments[0]?.attachment?.fileName).toBe(
            '00000042-PHOTO-2020-06-07-15-13-20.jpg',
          );
        });

        it('should not add attachment property when parseAttachments is false', () => {
          expect(parsedWithoutAttachments[0].attachment).toBeUndefined();
        });

        it('should not add attachment property to normal messages', () => {
          expect(parsedWithAttachments[1].attachment).toBeUndefined();
        });
      });
    });
  });
});
