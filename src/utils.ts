/**
 * Checks that the number at a certain index of an array is greater than a
 * certain value.
 */
function indexAboveValue(index: number, value: number) {
  return (array: number[]): boolean => array[index] > value;
}

/**
 * Returns `true` for a negative number, `false` otherwise.
 *
 * `0` and `-0` are considered positive.
 */
function isNegative(number: number): boolean {
  return number < 0;
}

/**
 * Takes an array of arrays and an index and groups the inner arrays by the
 * value at the index provided.
 * @see `utils.test.ts` for a better understanding of this function.
 */
function groupArrayByValueAtIndex<T extends unknown[]>(
  array: T[],
  index: number,
): T[][] {
  return Object.values(
    array.reduce((obj: { [key: string]: T[] }, item) => {
      /*
       * Keys that are numbers (even strings containing a number) get sorted
       * when using `Object.values()`.
       * Adding a prefix avoids this issue.
       */
      const key = `_${item[index]}`;

      if (!obj[key]) obj[key] = [];

      obj[key].push(item);

      return obj;
    }, {}),
  );
}

export { indexAboveValue, isNegative, groupArrayByValueAtIndex };
