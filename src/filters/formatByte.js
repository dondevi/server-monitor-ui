/**
 * =============================================================================
 *  Format Byte
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-08
 */

export default function formatByte (value, digits = 1, radix = 1024) {
  if (!+value) { return value; }
  const units = [/*"B", */"KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let exponent = Math.floor(Math.log(value) / Math.log(radix));
  let result = value / Math.pow(radix, exponent);
  return result.toFixed(digits) + " " + units[exponent];
};
