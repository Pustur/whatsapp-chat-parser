/**
 * Checks that an item at a certain index of an array is greater than a certain
 * value
 */
function indexAboveValue(index, value) {
  return array => array[index] > value;
}

/**
 * Returns true for a negative number, false otherwise
 * 0 is considered positive
 */
function isNegative(number) {
  return number < 0;
}

/**
 * Given an array of arrays and an index, gropus the inner arrays by the value
 * at the index provided
 * See test cases for a better understanding of this function
 */
function groupArrayByValueAtIndex(array, index) {
  return Object.values(
    array.reduce((obj, item) => {
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

module.exports = { indexAboveValue, isNegative, groupArrayByValueAtIndex };
