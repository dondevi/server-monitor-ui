/**
 * =============================================================================
 *  Mock Datas
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 */

import * as DATA_system from "mock/service/datas/system.js";
import * as DATA_business from "mock/service/datas/business.js";
import * as DATA_database from "mock/service/datas/database.js";
import * as DATA_exception from "mock/service/datas/exception.js";

export default {
  axios: {},
  socket: {
    ...DATA_system,
    ...DATA_business,
    ...DATA_database,
    ...DATA_exception,
  },
};
