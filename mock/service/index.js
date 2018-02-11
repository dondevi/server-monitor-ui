/**
 * =============================================================================
 *  Mock Service
 * =============================================================================
 *
 * @author dondevi
 * @create 2017-09-28
 *
 */

import URLS from "service/urls/index.js";
import REQUEST from "service/request/index.js";
import ADAPTER from "mock/service/request/index.js";

/**
 * Init
 */
mockAllService();


/**
 * 激活全局 Mock 功能
 * @useage Add "?mock" in URL
 */
export function mockAllService () {
  const isMock = /mock/.test(window.location.search);
  if (!isMock) { return; }
  let { axiosDefaults } = require("service/request/axios.js");
  let { socketDefaults } = require("service/request/socket.js");
  axiosDefaults.adapter = ADAPTER.axios;
  socketDefaults.adapter = ADAPTER.socket;
}


/**
 * 提供局部 Mock 接口
 * @useage import { ... } form "mock/service";
 */
for (let key in URLS.axios) {
  module.exports[key] = (param, config = {}) => {
    config.adapter = ADAPTER.axios;
    return REQUEST.axios(URLS.axios[key], param, config);
  };
}

for (let key in URLS.socket) {
  module.exports[key] = (param, handler, config = {}) => {
    config.adapter = ADAPTER.socket;
    return REQUEST.socket(URLS.socket[key], param, handler, config);
  };
}

