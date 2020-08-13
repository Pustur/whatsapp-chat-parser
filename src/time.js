const regexSplitTime = /[:.]/;

/**
 * Converts time from 12 hour format to 24 hour format
 * From: https://stackoverflow.com/a/40197728/5303634
 */
function convertTime12to24(time, ampm) {
  // eslint-disable-next-line prefer-const
  let [hours, minutes, seconds] = time.split(regexSplitTime);

  if (hours === '12') hours = '00';
  if (ampm === 'PM') hours = parseInt(hours, 10) + 12;

  return `${hours}:${minutes}${seconds ? `:${seconds}` : ''}`;
}

/**
 * Normalizes a time string to have the following format: hh:mm:ss
 */
function normalizeTime(time) {
  const [hours, minutes, seconds] = time.split(regexSplitTime);

  return `${hours.length === 1 ? `0${hours}` : hours}:${minutes}:${
    seconds || '00'
  }`;
}

/**
 * Normalizes am / a.m. / etc. to AM (uppercase, no other characters)
 */
function normalizeAMPM(ampm) {
  return ampm.replace(/[^apm]/gi, '').toUpperCase();
}

module.exports = {
  regexSplitTime,
  convertTime12to24,
  normalizeTime,
  normalizeAMPM,
};
