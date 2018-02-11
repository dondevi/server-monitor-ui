/**
 * =============================================================================
 *  Mock Datas
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 */

import * as DATA_resource from "mock/service/datas/resource.js";
import * as DATA_alert from "mock/service/datas/alert.js";
import * as DATA_business from "mock/service/datas/business.js";

export default {
  axios: {},
  socket: {
    ...DATA_resource,
    ...DATA_alert,
    ...DATA_business,
  },
};
