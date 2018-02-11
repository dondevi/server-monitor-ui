/**
 * =============================================================================
 *  Mock WebSocket
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-09
 */

import { getMockData } from "mock/service/util.js";

/**
 * WebSocket 假数据适配器
 * @param  {Object}   MOCKS   - 假数据集合
 * @param  {String}   url
 * @param  {*}        param
 * @param  {Object}   config  - WebSocket Request 配置
 * @return {Promise}
 */
export default function socketAdapter (MOCKS, url, param, handler, option) {
  let server = {
    time: 50000, // Will be setted at getMockData()
    run () {
      socket.send();
      if (!server.time) { return; }
      socket.timer = window.setTimeout(server.run, server.time);
    },
  };
  let socket = option.socket = {
    send (data) {
      let mockData = getMockData(MOCKS, url, data, server);
      option.onmessage && option.onmessage({
        data: JSON.stringify({ data: mockData }),
      });
    },
    close () {
      window.clearTimeout(socket.timer);
      option.onclose && option.onclose();
    },
  };
  option.onopen && option.onopen();
  server.time && server.run();
  return socket;
}
