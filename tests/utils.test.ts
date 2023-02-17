import { describe, it, expect } from 'vitest';
import {
  indexAboveValue,
  isNegative,
  groupArrayByValueAtIndex,
} from '../src/utils';

describe('utils.js', () => {
  describe('indexAboveValue', () => {
    it('should compare values correctly', () => {
      const array = [34, 16];

      expect(indexAboveValue(0, 33)(array)).toBe(true);
      expect(indexAboveValue(0, 34)(array)).toBe(false);
      expect(indexAboveValue(1, 15)(array)).toBe(true);
      expect(indexAboveValue(1, 16)(array)).toBe(false);
      expect(indexAboveValue(1, 17)(array)).toBe(false);
    });
  });

  describe('isNegative', () => {
    it('should return true for negative numbers', () => {
      expect(isNegative(-1)).toBe(true);
      expect(isNegative(-15)).toBe(true);
      expect(isNegative(Number.NEGATIVE_INFINITY)).toBe(true);
    });

    it('should return false for positive numbers', () => {
      expect(isNegative(0)).toBe(false);
      expect(isNegative(1)).toBe(false);
      expect(isNegative(15)).toBe(false);
      expect(isNegative(Number.POSITIVE_INFINITY)).toBe(false);
    });
  });

  describe('groupArrayByValueAtIndex', () => {
    it('should split array into chunks based on the value at index', () => {
      const array = [
        [8, 30, 'sample'],
        [9, 50, 'sample'],
        [6, 30, 'sample'],
      ];

      expect(groupArrayByValueAtIndex(array, 0)).toEqual([
        [[8, 30, 'sample']],
        [[9, 50, 'sample']],
        [[6, 30, 'sample']],
      ]);
      expect(groupArrayByValueAtIndex(array, 1)).toEqual([
        [
          [8, 30, 'sample'],
          [6, 30, 'sample'],
        ],
        [[9, 50, 'sample']],
      ]);
      expect(groupArrayByValueAtIndex(array, 2)).toEqual([
        [
          [8, 30, 'sample'],
          [9, 50, 'sample'],
          [6, 30, 'sample'],
        ],
      ]);
    });
  });
});
