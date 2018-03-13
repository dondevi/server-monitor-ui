/**
 * =============================================================================
 *  Mock WebSocket
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-09
 *
 * @update 2018-03-08 dondevi
 *   1.Rebuild: with class MockSocket
 */

import { inheritEventTarget } from "mock/modules/event.js";
import { openSocket, getResponse } from "mock/service/respond/socket.js";

/**
 * WebSocket mock adapter
 * @param  {String}   url - Socket address
 * @return {Object}
 */
export default function socketAdapter (url) {
  return new MockSocket(url);
};

/**
 * Class MockSocket
 * @param {String} url
 */
function MockSocket (url) {
  this.url = url;
  this.readyState = 0;
  this.onopen = null;
  this.onmessage = null;
  this.onerror = null;
  this.onclose = null;
  this._timer = -1;
  this._delay = 50000;
  inheritEventTarget(this);
  window.setTimeout(() => openSocket(this));
}

MockSocket.prototype.CONNECTING = MockSocket.CONNECTING = 0;
MockSocket.prototype.OPEN = MockSocket.OPEN = 1;
MockSocket.prototype.CLOSING = MockSocket.CLOSING = 2;
MockSocket.prototype.CLOSED = MockSocket.CLOSED = 3;

MockSocket.prototype._trigger = function (type, props) {
  let event = new Event(type);
  Object.assign(event, props);
  this[`on${type}`] && this[`on${type}`](props);
  this.dispatchEvent(event);
}

MockSocket.prototype.send = function (data) {
  let response = getResponse(this.url, data, this);
  this._trigger("message", { data: response });
};

MockSocket.prototype.close = function (code, reason) {
  this.readyState = this.CLOSED;
  this._trigger("close", { code, reason });
  window.clearTimeout(this._timer);
};
