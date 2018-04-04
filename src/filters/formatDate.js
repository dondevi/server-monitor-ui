/**
 * =============================================================================
 *  Format Date
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-08
 */

export default function formatDate (value, format = "YYYY-MM-DD hh:mm:ss") {
  if (!value) { return ""; }

  const date = new Date(value);
  const values = {
    "(Y+)": date.getFullYear(),                     // Year
    "(M+)": date.getMonth() + 1,                    // Month
    "(D+)": date.getDate(),                         // Day
    "(h+)": date.getHours(),                        // Hour
    "(m+)": date.getMinutes(),                      // Minute
    "(s+)": date.getSeconds(),                      // Second
    "(q+)": Math.floor((date.getMonth() + 3) / 3),  // Quarter
    "(ms)": date.getMilliseconds()                  // Millisecond
  };

  return Object.keys(values).reduce((result, key) => {
    if (!new RegExp(key).test(format)) {
      return result;
    }
    let match  = RegExp.$1;
    let value  = values[key].toString();
    let length = value.length;
    if (1 === length) {
      value  = "0" + value;
      length = match.length;
    }
    let target = value.substr(-length, length);
    return result.replace(match, target);
  }, format);
};
