/**
 * @author dondevi
 * @create 2018-02-11
 */

import URLS from "service/urls/index.js";
import DATAS from "mock/service/datas/index.js";

import axiosAdapter from "mock/service/request/axios.js";
import socketAdapter from "mock/service/request/socket.js";

import { mapMockData } from "mock/service/util.js";

const MOCKS = mapMockData(URLS, DATAS);

export default {
  axios: axiosAdapter.bind(undefined, MOCKS.axios),
  socket: socketAdapter.bind(undefined, MOCKS.socket),
};
