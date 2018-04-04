/**
 * =============================================================================
 *  Mock Service
 * =============================================================================
 *  @useage
 *    import mockService form "mock/service";
 *    mockService.{type}.{key}(...);
 *  @example
 *    mockService.axios.getInfo(...);
 * =============================================================================
 *
 * @author dondevi
 * @create 2017-09-28
 *
 * @update 2018-03-30 dondevi
 *   1.Update: `module.exports` to `export` !
 *
 */

import URLS from "service/urls";
import REQUEST from "service/request";
import ADAPTER from "mock/service/request";

export default factoryMockService();


/**
 * 覆盖 service 接口
 * @useage Add "?mock" in URL
 */
export function injectMockService () {
  // let { axiosDefaults } = require("service/request/axios.js");
  let { socketDefaults } = require("service/request/socket.js");
  // axiosDefaults.adapter = ADAPTER.axios;
  socketDefaults.adapter = ADAPTER.socket;
}


/**
 * 生成 Mock Service
 */
function factoryMockService () {
  const mockService = {};
  for (let type in URLS) {
    mockService[type] = mockService[type] || {};
    for (let key in URLS[type]) {
      mockService[type][key] = (param, handler, config = {}) => {
        config.adapter = ADAPTER[type];
        return REQUEST[type](URLS[type][key], param, handler, config);
      };
    }
  }
  return mockService;
}
