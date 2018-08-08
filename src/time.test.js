const { convertTime12to24, normalizeAMPM } = require('./time.js');

describe('time.js', () => {
  describe('convertTime12to24', () => {
    it('should convert 12 AM/PM correctly', () => {
      expect(convertTime12to24('12:00', 'PM')).toBe('12:00');
      expect(convertTime12to24('12:00', 'AM')).toBe('00:00');
    });

    it('should convert time in the hh:mm format', () => {
      expect(convertTime12to24('05:06', 'PM')).toBe('17:06');
      expect(convertTime12to24('07:19', 'AM')).toBe('07:19');
    });

    it('should convert time in the hh:mm:ss format', () => {
      expect(convertTime12to24('01:02:34', 'PM')).toBe('13:02:34');
      expect(convertTime12to24('02:04:54', 'AM')).toBe('02:04:54');
    });
  });

  describe('normalizeAMPM', () => {
    it('should convert am format correctly', () => {
      expect(normalizeAMPM('am')).toBe('AM');
      expect(normalizeAMPM('pm')).toBe('PM');
      expect(normalizeAMPM('AM')).toBe('AM');
      expect(normalizeAMPM('PM')).toBe('PM');
    });

    it('should convert a.m. format correctly', () => {
      expect(normalizeAMPM('a.m.')).toBe('AM');
      expect(normalizeAMPM('p.m.')).toBe('PM');
      expect(normalizeAMPM('A.M.')).toBe('AM');
      expect(normalizeAMPM('P.M.')).toBe('PM');
    });
  });
});
