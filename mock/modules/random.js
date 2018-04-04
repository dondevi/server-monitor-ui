/**
 * =============================================================================
 *  Genarate Random value series for chart
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-08
 *
 * @todo 2018-03-30 dondevi
 *   1.Fix: Memory leak
 *
 * @update 2018-03-14 dondevi
 *   1.Update: randomValue() - next()
 */

/**
 * Get random value from initial setting
 * @param  {Number} value     - Current value
 * @param  {Number} minValue  - Min limit
 * @param  {Number} maxValue  - Max limit
 * @param  {Number} minOffset - Min limit of random offet from current value
 * @param  {Number} maxOffset - Max limit of random offet from current value
 * @return {Object}           - Random value & Next Function
 */
export function randomValue (value, minValue, maxValue, minOffset, maxOffset) {
  const now = () => value;
  const next = () => {
    value = value + randomInt(minOffset, maxOffset);
    value = Math.max(value, minValue);
    value = Math.min(value, maxValue);
    value = Math.round(value);
    return value;
  };
  return { now, next };
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
