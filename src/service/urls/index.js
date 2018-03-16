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

const path = "/monitorcenter-as-server/monitor/websocket/";

export default {
  axios: {
  },
  socket: {
    getSystemInfo: path + "systeminfostatistics",
    getException: path + "exceptioninfostatistics",
    getStatistics: path + "credinfostatistics",
    getDatabaseInfo: path + "databaseinfosatistics",
  },
};
