/**
 * @author dondevi
 * @create 2018-02-11
 */

import axiosAdapter from "mock/service/request/axios.js";
import socketAdapter from "mock/service/request/socket.js";

export default {
  axios: axiosAdapter,
  socket: socketAdapter,
};
