/**
 * Converts time from 12 hour format to 24 hour format
 * From: https://stackoverflow.com/a/40197728/5303634
 */
function convertTime12to24(time, ampm) {
  // eslint-disable-next-line prefer-const
  let [hours, minutes, seconds] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (ampm === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}${seconds ? `:${seconds}` : ''}`;
}

/**
 * Normalizes am / a.m. / etc. to AM (uppercase, no other characters)
 */
function normalizeAMPM(ampm) {
  return ampm.replace(/[^apm]/gi, '').toUpperCase();
}

module.exports = { convertTime12to24, normalizeAMPM };
