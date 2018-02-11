/**
 * =============================================================================
 *  Service URLs
 * =============================================================================
 *
 * comment regex: (^\/\/.*)|(\s+\/\/.*)|((\/\*)(.|\n)+?(\*\/))
 *
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2018-02-09 dondevi
 */

const path = "/(path)/websocket/";

export default {
  axios: {
  },
  socket: {
    getResourceState: path + "getResourceState",
    getAlertList: path + "getAlertList",
    getBusinessList: path + "getBusinessList",
  },
};
