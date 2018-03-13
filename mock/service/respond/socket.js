/**
 * =============================================================================
 *  Mock Response for Websocket
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-08
 *
 * @update 2018-03-09 dondevi
 *   1.Add: openSocket(), pushMessage()
 */

import { socket as RESPONSES } from "mock/service/respond";

/**
 * Mock socket server
 * @param  {Object} socket
 */
export function openSocket (socket) {
  socket.readyState = socket.OPEN;
  socket._trigger("open");
  pushMessage(socket);
}

/**
 * Push message
 * @param  {Object} socket
 */
function pushMessage (socket) {
  let response = getResponse(socket.url, null, socket);
  socket._trigger("message", { data: response });
  if (socket._delay) {
    socket._timer = window.setTimeout(() => pushMessage(socket), socket._delay);
  }
}

/**
 * Get response form mock data or function
 * @param  {String} url    - Socket address
 * @param  {Object} data   - Socket message
 * @param  {Object} socket - Socket object
 * @return {Object}
 */
export function getResponse (url, data, socket) {
  let response = RESPONSES[url];
  try {
    if (!(url in RESPONSES)) { throw { status: 404 }; }
    if ("function" === typeof response) {
      response = response(data, socket);
    }
  } catch (exception) {
    status = exception.status || 500;
    switch (status) {
      case 401: exception = `${url} 401 (Unauthorized)`; break;
      case 403: exception = `${url} 403 (Forbidden)`; break;
      case 404: exception = `${url} 404 (Not Found)`; break;
      case 200: exception = exception.exception; break;
    }
    console.error(exception);
    socket.close(1011, exception);
  }
  return JSON.stringify({ data: response });
};
