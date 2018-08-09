const {
  checkAbove12,
  checkDecreasing,
  changeFrequencyAnalysis,
  normalizeDate,
} = require('./date.js');

describe('date.js', () => {
  describe('checkAbove12', () => {
    const daysFirst = [[3, 6, 2017], [13, 11, 2017], [26, 12, 2017]];
    const monthsFirst = [[4, 2, 2017], [6, 11, 2017], [12, 13, 2017]];
    const undetectable = [[4, 6, 2017], [11, 10, 2017], [12, 12, 2017]];

    it('should return true if days come first', () => {
      expect(checkAbove12(daysFirst)).toBe(true);
    });

    it('should return false if months come first', () => {
      expect(checkAbove12(monthsFirst)).toBe(false);
    });

    it("should return null if it can't understand the order", () => {
      expect(checkAbove12(undetectable)).toBe(null);
    });
  });

  describe('checkDecreasing', () => {
    const daysFirst = [[8, 3, 2017], [10, 5, 2017], [6, 9, 2017]];
    const monthsFirst = [[6, 3, 2017], [8, 5, 2017], [9, 4, 2017]];
    const undetectable = [[1, 1, 2017], [3, 3, 2017], [6, 6, 2017]];
    const differentYears1 = [[8, 3, 2017], [7, 5, 2017], [6, 9, 2018]];
    const differentYears2 = [[8, 3, 2017], [10, 2, 2017], [6, 9, 2018]];
    const differentYears3 = [[8, 3, 2017], [10, 5, 2017], [6, 9, 2018]];

    it('should return true if days come first', () => {
      expect(checkDecreasing(daysFirst)).toBe(true);
    });

    it('should return false if months come first', () => {
      expect(checkDecreasing(monthsFirst)).toBe(false);
    });

    it("should return null if it can't understand the order", () => {
      expect(checkDecreasing(undetectable)).toBe(null);
    });

    it('should take different years into account', () => {
      expect(checkDecreasing(differentYears1)).toBe(true);
      expect(checkDecreasing(differentYears2)).toBe(false);
      expect(checkDecreasing(differentYears3)).toBe(null);
    });
  });

  describe('changeFrequencyAnalysis', () => {
    const daysFirst = [[3, 4, 2017], [7, 5, 2017], [11, 6, 2017]];
    // Diff: [8, 2, 0]
    const monthsFirst = [[1, 1, 2017], [1, 3, 2017], [2, 7, 2017]];
    // Diff: [1, 6, 0]
    const undetectable = [[6, 3, 2017], [8, 5, 2017], [9, 4, 2017]];
    // Diff: [3, 3, 0]

    it('should return true if days come first', () => {
      expect(changeFrequencyAnalysis(daysFirst)).toBe(true);
    });

    it('should return false if months come first', () => {
      expect(changeFrequencyAnalysis(monthsFirst)).toBe(false);
    });

    it("should return null if it can't understand the order", () => {
      expect(changeFrequencyAnalysis(undetectable)).toBe(null);
    });
  });

  describe('normalizeDate', () => {
    const expected = ['2011', '03', '04'];

    it('should return the correctly formatted date', () => {
      expect(normalizeDate('11', '3', '4')).toEqual(expected);
    });

    it('should not alter an already correctly formatted date', () => {
      expect(normalizeDate('2011', '03', '04')).toEqual(expected);
    });
  });
});
