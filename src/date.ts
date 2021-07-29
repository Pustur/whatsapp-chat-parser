import { indexAboveValue, isNegative, groupArrayByValueAtIndex } from './utils';

/**
 * Takes an array of numeric dates and tries to understand if the days come
 * before the month or the other way around by checking if numbers go above
 * `12`.
 *
 * Output is `true` if days are first, `false` if they are second, or `null` if
 * it failed to understand the order.
 */
function checkAbove12(numericDates: number[][]): boolean | null {
  const daysFirst = numericDates.some(indexAboveValue(0, 12));

  if (daysFirst) return true;

  const daysSecond = numericDates.some(indexAboveValue(1, 12));

  if (daysSecond) return false;

  return null;
}

/**
 * Takes an array of numeric dates and tries to understand if the days come
 * before the month or the other way around by checking if a set of numbers
 * during the same year decrease at some point.
 *
 * If it does it's probably the days since months can only increase in a given
 * year.
 *
 * Output is `true` if days are first, `false` if they are second, or `null` if
 * it failed to understand the order.
 */
function checkDecreasing(numericDates: number[][]): boolean | null {
  const datesByYear = groupArrayByValueAtIndex(numericDates, 2);
  const results = datesByYear.map(dates => {
    const daysFirst = dates.slice(1).some((date, i) => {
      const [first1] = dates[i];
      const [first2] = date;

      return isNegative(first2 - first1);
    });

    if (daysFirst) return true;

    const daysSecond = dates.slice(1).some((date, i) => {
      const [, second1] = dates[i];
      const [, second2] = date;

      return isNegative(second2 - second1);
    });

    if (daysSecond) return false;

    return null;
  });

  const anyTrue = results.some(value => value === true);

  if (anyTrue) return true;

  const anyFalse = results.some(value => value === false);

  if (anyFalse) return false;

  return null;
}

/**
 * Takes an array of numeric dates and tries to understand if the days come
 * before the month or the other way around by looking at which number changes
 * more frequently.
 *
 * Output is `true` if days are first, `false` if they are second, or `null` if
 * it failed to understand the order.
 */
function changeFrequencyAnalysis(numericDates: number[][]): boolean | null {
  const diffs = numericDates
    .slice(1)
    .map((date, i) => date.map((num, j) => Math.abs(numericDates[i][j] - num)));
  const [first, second] = diffs.reduce(
    (total, diff) => {
      const [first1, second1] = total;
      const [first2, second2] = diff;

      return [first1 + first2, second1 + second2];
    },
    [0, 0],
  );

  if (first > second) return true;
  if (first < second) return false;

  return null;
}

/**
 * Takes an array of numeric dates and tries to understand if the days come
 * before the month or the other way around by running the dates through various
 * checks.
 *
 * Output is `true` if days are first, `false` if they are second, or `null` if
 * it failed to understand the order.
 */
function daysBeforeMonths(numericDates: number[][]): boolean | null {
  const firstCheck = checkAbove12(numericDates);

  if (firstCheck !== null) return firstCheck;

  const secondCheck = checkDecreasing(numericDates);

  if (secondCheck !== null) return secondCheck;

  return changeFrequencyAnalysis(numericDates);
}

/**
 * Takes `year`, `month` and `day` as strings and pads them to `4`, `2`, `2`
 * digits respectively.
 */
function normalizeDate(
  year: string,
  month: string,
  day: string,
): [string, string, string] {
  return [
    // 2 digit years are assumed to be in the 2000-2099 range
    year.padStart(4, '2000'),
    month.padStart(2, '0'),
    day.padStart(2, '0'),
  ];
}

/**
 * Pushes the longest number in a date to the end, if there is one. Necessary to
 * ensure the year is the last number.
 */
function orderDateComponents(date: string): [string, string, string] {
  const regexSplitDate = /[-/.] ?/;
  const [a, b, c] = date.split(regexSplitDate);
  const maxLength = Math.max(a.length, b.length, c.length);

  if (c.length === maxLength) return [a, b, c];
  if (b.length === maxLength) return [a, c, b];
  return [b, c, a];
}

export {
  checkAbove12,
  checkDecreasing,
  changeFrequencyAnalysis,
  daysBeforeMonths,
  normalizeDate,
  orderDateComponents,
};
