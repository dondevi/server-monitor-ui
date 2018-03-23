/**
 * =============================================================================
 *  Common WebSocket
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-09
 *
 * @update 2018-02-11 dondevi
 *
 */

import { BASEURL_WS } from "service/config.js";

export const socketDefaults = {};

/**
 * WebSocket Request
 * @param  {String}   url
 * @param  {*}        param
 * @param  {Function} handler - Message Handler with json
 * @param  {Object}   option
 * @param  {String}   option.url
 * @param  {*}        option.param
 * @param  {Function} option.onmessage - Message Handler with event
 * @param  {Function} option.onopen
 * @param  {Function} option.onerror
 * @param  {Function} option.onclose
 * @return {Object}   socket  - WebSocket instance
 */
export default function socketRequest (url, param, handler, option) {
  if ("[object Object]" === Object.prototype.toString.call(url)) {
    url = option.url;
    param = option.param;
    option = url;
  }
  option = Object.assign({
    onopen: param && (event => {
      option.socket.send(param);
    }),
    onmessage: event => {
      handler(JSON.parse(event.data));
    },
  }, socketDefaults, option);
  if (option.adapter) {
    option.socket = option.adapter(url);
  } else {
    option.socket = new WebSocket(BASEURL_WS + url);
  }
  let socket = option.socket;
  // Keep alive
  const timer = window.setInterval(() => socket.send(""), 30000);
  option.onopen && socket.addEventListener("open", option.onopen);
  option.onmessage && socket.addEventListener("message", option.onmessage);
  option.onerror && socket.addEventListener("error", option.onerror);
  option.onclose && socket.addEventListener("close", event => {
    window.clearInterval(timer);
    option.onclose(event);
  });
  return socket;
}
