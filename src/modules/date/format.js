/**
 * =============================================================================
 *  Date 时间处理
 * =============================================================================
 *
 *  API:
 *    1. Date.prototype.format(formatString);  // 格式化日期
 *
 * =============================================================================
 *
 * @author dondevi
 * @create 2016-01-18
 * @version 1.1.0
 *
 * @update 2017-05-23 dondevi
 * @update 2017-09-28 dondevi
 *   1.Rebuild: To ES6
 *
 */


Date.prototype.format = function (format = "YYYY-MM-DD") {
  const values = {
    "(Y+)": this.getFullYear(),                     // Year
    "(M+)": this.getMonth() + 1,                    // Month
    "(D+)": this.getDate(),                         // Day
    "(h+)": this.getHours(),                        // Hour
    "(m+)": this.getMinutes(),                      // Minute
    "(s+)": this.getSeconds(),                      // Second
    "(q+)": Math.floor((this.getMonth() + 3) / 3),  // Quarter
    "(ms)": this.getMilliseconds()                  // Millisecond
  };
  return Object.keys(values).reduce((result, key) => {
    if (!new RegExp(key).test(format)) {
      return result;
    }
    var match  = RegExp.$1;
    var value  = values[key].toString();
    var length = value.length;
    if (1 === length) {
      value  = "0" + value;
      length = match.length;
    }
    var target = value.substr(-length, length);
    return result.replace(match, target);
  }, format);
};
