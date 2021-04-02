const regexSplitTime = /[:.]/;

/**
 * Converts time from 12 hour format to 24 hour format.
 *
 * Reference:
 * {@link https://stackoverflow.com/a/40197728/5303634}
 */
function convertTime12to24(time: string, ampm: string): string {
  // eslint-disable-next-line prefer-const
  let [hours, minutes, seconds] = time.split(regexSplitTime);

  if (hours === '12') hours = '00';
  if (ampm === 'PM') hours = String(parseInt(hours, 10) + 12);

  return `${hours}:${minutes}${seconds ? `:${seconds}` : ''}`;
}

/**
 * Normalizes a time string to have the following format: `hh:mm:ss`.
 */
function normalizeTime(time: string): string {
  const [hours, minutes, seconds] = time.split(regexSplitTime);

  return `${hours.padStart(2, '0')}:${minutes}:${seconds || '00'}`;
}

/**
 * Normalizes `am` / `a.m.` / etc. to `AM` (uppercase, no other characters).
 */
function normalizeAMPM(ampm: string): string {
  return ampm.replace(/[^apm]/gi, '').toUpperCase();
}

export { regexSplitTime, convertTime12to24, normalizeTime, normalizeAMPM };
