/**
 * =============================================================================
 *  Echarts common options
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-16
 */

/**
 * Get line chart option
 * @param  {Object} option
 * @return {Object}
 */
export function getLineChartOption (option) {
  const tooltipOption = {
    trigger: "axis", padding: [5, 12], confine: true,
    axisPointer: {
      lineStyle: { color: "rgba(255,255,255,0.3)" },
    },
    // formatter: params =>
    //   `<small>${params[0].axisValueLabel}</small>` +
    //   `<br>${params[0].value}%`,
  };
  const seriesOption = {
    type: "line", showSymbol: false, areaStyle: {},
    itemStyle: { color: "rgba(255,255,255,0.5)" },
  };
  const chartOption = {
    tooltip: tooltipOption,
    grid:  { left: 0, top: 0, right: 0, bottom: 0 },
    xAxis: { type: "time", show: false },
    yAxis: { type: "value", show: false },
  };
  mergeOption(chartOption, option)
  mergeSeriesOption(chartOption, seriesOption);
  return chartOption;
}

/**
 * Merge options
 * @param  {Object} target
 * @param  {Object} option
 * @param  {Object}
 */
function mergeOption (target, option) {
  for (let key in option) {
    if (!option.hasOwnProperty(key)) { continue; }
    let value = option[key];
    if ("[object Object]" === Object.prototype.toString.call(value)) {
      if (!target.hasOwnProperty(key)) {
        target[key] = {};
      }
      mergeOption(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

/**
 * Merge series option
 * @param  {Object} option
 */
function mergeSeriesOption (option, seriesOption) {
  let { series } = option;
  if (Array.isArray(series)) {
    series.forEach(seriesItem => {
      Object.assign(seriesItem, seriesOption);
    });
  } else if (series) {
    Object.assign(series, seriesOption);
  } else {
    option.series = seriesOption;
  }
}
