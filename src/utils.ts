/**
 * Checks that an item at a certain index of an array is greater than a certain
 * value
 */
function indexAboveValue(index: number, value: number) {
  return (array: number[]): boolean => array[index] > value;
}

/**
 * Returns true for a negative number, false otherwise
 * 0 is considered positive
 */
function isNegative(number: number): boolean {
  return number < 0;
}

/**
 * Return the difference between the arguments `length` property for sorting
 * purposes.
 */
function sortByLengthAsc<T extends { length: number }>(a: T, b: T): number {
  return a.length - b.length;
}

/**
 * Given an array of arrays and an index, gropus the inner arrays by the value
 * at the index provided
 * See test cases for a better understanding of this function
 */
function groupArrayByValueAtIndex<T>(array: T[][], index: number): T[][][] {
  return Object.values(
    array.reduce((obj: { [key: string]: T[][] }, item) => {
      /**
       * Keys that are only numbers get sorted when using Object.values()
       * Adding a prefix avoids this issue
       */
      const key = `key_${item[index]}`;

      if (!obj[key]) {
        obj[key] = [];
      }

      obj[key].push(item);

      return obj;
    }, {}),
  );
}

export {
  indexAboveValue,
  isNegative,
  sortByLengthAsc,
  groupArrayByValueAtIndex,
};
