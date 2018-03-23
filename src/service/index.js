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

// for (let key in URLS.axios) {
//   module.exports[key] = REQUEST.axios.bind(undefined, URLS.axios[key]);
// }

for (let key in URLS.socket) {
  module.exports[key] = REQUEST.socket.bind(undefined, URLS.socket[key]);
}
