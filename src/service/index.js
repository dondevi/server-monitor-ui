/**
 * =============================================================================
 *  Service
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2018-02-09 dondevi
 */

import URLS from "service/urls/index.js";
import REQUEST from "service/request/index.js";

export default factoryService();

/**
 * 生成 service
 * @return {Object}
 */
function factoryService () {
  const service = {};
  for (let type in URLS) {
    service[type] = service[type] || {};
    for (let key in URLS[type]) {
      service[type][key] = REQUEST[type].bind(undefined, URLS[type][key]);
    }
  }
  return service;
}

