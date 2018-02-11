/**
 * =============================================================================
 *  Mock Request
 * =============================================================================
 *
 * @author dondevi
 * @create 2017-11-29
 *
 * @update 2018-02-09 dondevi
 *   1.Move: getMockData() to "/mock/service/util.js"
 */

import { getMockData } from "mock/service/util.js";

/**
 * Axios 假数据适配器
 * @param  {Object} MOCKS  - 假数据集合
 * @param  {Object} config - Axios 配置
 * @return {Promise}
 */
export default function axiosAdapter (MOCKS, config) {
  return new Promise((resolve, reject) => {
    const url      = config.url.replace(config.baseURL, "");
    const hasMock  = url in MOCKS;
    const request  = transformRequest(config.data, config.headers);
    try {
      var status   = hasMock ? 202 : 404;
      var mockData = getMockData(MOCKS, url, request.param);
    } catch (exception) {
      status   = 500;
      mockData = { error: true, exception };
      console.error(exception);
    }
    const response = transformResponse(mockData, request.requestNo);
    const axiosResponse = { data: response, config, status };
    settle(resolve, reject, axiosResponse);
  });
}

/**
 * 转换提交参数
 * @param  {*} request - 提交参数
 */
function transformRequest (request, headers) {
  // if (/x-www-form-urlencoded/.test(headers["Content-Type"])) {
  //   return { param: unserialize(request) }
  // }
  // if (/application\/json/.test(headers["Content-Type"])) {
    return JSON.parse(request);
  // }
}

/**
 * 转换响应数据
 * @param  {Object} response - 响应数据
 */
function transformResponse (response, requestNo) {
  if (response && response.error) {
    return response;
  }
  return { data: response, error: false, requestNo };
}

/**
 * 根据状态码处理 Promise
 * @see https://github.com/mzabriskie/axios/blob/master/lib/core/settle.js
 * @param {Function} resolve  - 完成
 * @param {Function} reject   - 拒绝
 * @param {object}   response - Axios 响应数据
 */
function settle (resolve, reject, response) {
  const { url, validateStatus } = response.config;
  const { status } = response;
  if (!status || !validateStatus || validateStatus(status)) {
    return resolve(response);
  }
  const error = new Error(`Request failed: ${url} [${status}]`);
  error.config = response.config;
  error.response = response; // For process logic in catch()
  reject(error);
};
