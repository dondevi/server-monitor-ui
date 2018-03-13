/**
 * @author dondevi
 * @create 2018-02-09
 */

/**
 * URL 匹配 DATA
 * @param  {Object} URLS  - 接口地址集合
 * @param  {Object} DATAS - 假数据集合
 * @return {Object}
 */
export function mapMockData (URLS, DATAS) {
  let MOCKS = {};
  for (let type in URLS) {
    MOCKS[type] = MOCKS[type] || {};
    for (let key in URLS[type]) {
      let url  = URLS[type][key];
      let data = DATAS[type][key];
      MOCKS[type][url] = data;
    }
  }
  return MOCKS;
}

/**
 * 通过 URL 获取假数据
 * @param  {Object} MOCKS  - 假数据集合
 * @param  {String} url    - 提交地址
 * @param  {*}      param  - 提交参数
 * @return {*}
 */
export function getMockData (MOCKS, url, param, option) {
  var match = MOCKS[url];
  if ("function" === typeof match) {
    match = match(param, option);
  }
  return match;
}
