/**
 * =============================================================================
 *  Mock Response for Axios
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-08
 */

import { axios as RESPONSES } from "mock/service/respond";

/**
 * Get response form mock data or function
 * @param  {String} url     - Request address
 * @param  {Object} request - Request param
 * @return {Object}
 */
export function getResponse (url, request) {
  let status = 200;
  let data = null;
  try {
    if (!(url in RESPONSES)) { throw { status: 404 }; }
    let response = RESPONSES[url];
    if ("function" === typeof response) {
      response = response(request);
    }
    data = { error: false, data: response };
  } catch (exception) {
    status = exception.status || 500;
    switch (status) {
      case 401: exception = `${url} 401 (Unauthorized)`; break;
      case 403: exception = `${url} 403 (Forbidden)`; break;
      case 404: exception = `${url} 404 (Not Found)`; break;
      case 200: exception = exception.exception; break;
    }
    console.error(exception);
    data = { error: true, exception };
    exception = null;
  }
  data.requestNo = request.requestNo;
  return { status, data };
}
