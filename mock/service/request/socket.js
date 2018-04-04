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

/**
 * @see https://medium.com/@tverwaes/setting-up-prototypes-in-v8-ec9c9491dfe2
 */
const mockSocketProto = MockSocket.prototype;
mockSocketProto.CONNECTING = MockSocket.CONNECTING = 0;
mockSocketProto.OPEN = MockSocket.OPEN = 1;
mockSocketProto.CLOSING = MockSocket.CLOSING = 2;
mockSocketProto.CLOSED = MockSocket.CLOSED = 3;

mockSocketProto._trigger = function (type, props) {
  let event = new Event(type);
  Object.assign(event, props);
  this[`on${type}`] && this[`on${type}`](props);
  this.dispatchEvent(event);
}

mockSocketProto.send = function (data) {
  if (data) {
    let response = getResponse(this.url, data, this);
    this._trigger("message", { data: response });
  }
};

mockSocketProto.close = function (code, reason) {
  this.readyState = this.CLOSED;
  this._trigger("close", { code, reason });
  window.clearTimeout(this._timer);
};
