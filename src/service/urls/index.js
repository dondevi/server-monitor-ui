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

const path = "/systemmonitor-server/websocket/";

export default {
  axios: {
  },
  socket: {
    getSystemInfo: path + "getSystemInfo",
    getException: path + "getException",
    getStatistics: path + "getStatistics",
    getDatabaseInfo: path + "getDatabaseInfo",
  },
};
