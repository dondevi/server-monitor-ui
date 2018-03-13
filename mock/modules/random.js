/**
 * @author dondevi
 * @create 2018-03-08
 */

/**
 * Get random value from initial setting
 * @param  {Number} value     - Current value
 * @param  {Number} minValue  - Min limit
 * @param  {Number} maxValue  - Max limit
 * @param  {Number} minOffset - Min limit of random offet from current value
 * @param  {Number} maxOffset - Max limit of random offet from current value
 * @return {Number}           - Random value
 */
export function randomValue (value, minValue, maxValue, minOffset, maxOffset) {
  return function inner () {
    value = value + randomInt(minOffset, maxOffset);
    value = Math.max(value, minValue);
    value = Math.min(value, maxValue);
    return inner.value =  Math.round(value);
  };
}

/**
 * Get random integer in range
 * @param  {Number} min - Min limit
 * @param  {Number} max - Max limit
 * @return {Number} int - Random integer
 */
export function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
