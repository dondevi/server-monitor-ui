/**
 * =============================================================================
 *  Common Request
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 *
 */

import axios from "axios";

import { BASEURL } from "service/config.js";

/**
 * Axios 实例
 */
export const axiosInstance = axios.create();
export const axiosDefaults = axiosInstance.defaults;  // 暴露给 Mock

/**
 * Axios 默认配置
 * @see https://www.npmjs.com/package/axios#request-config
 * @see https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
 * @type {Object}
 */
axiosDefaults.baseURL = BASEURL;
axiosDefaults.transformRequest = [transformRequest].concat(axios.defaults.transformRequest);


/**
 * 通用请求函数
 * @param  {String} url    - 请求地址（相对路径）
 * @param  {*}      data   - 请求参数
 * @param  {Object} config - Axios 配置
 * @return {Promise}
 */
export default function axiosRequest (url, data, config) {
  config = Object.assign({ method: "post", url, data }, config);
  return axiosInstance(config).then(processResponse).catch(processError);
};

/**
 * 转换提交参数
 * @param  {*} request - 提交参数
 */
function transformRequest (request) {
  return {
    requestNo: Date.now(),
    param: request,
  };
}

/**
 * 处理 Axios 响应数据
 * @param  {Object} response - 响应对象
 */
function processResponse (response) {
  const { data } = response;
  if (data.error) {
    return Promise.reject({ response });
  }
  return data;
}

/**
 * 处理 Axios 错误数据
 * @param  {Object} error - 错误对象
 */
import { Toast, Alert } from "quasar-framework-js";
function processError (error) {
  const { status, data } = error.response;
  // 业务错误
  if (200 === status) {
    const { message } = data.exception;
    Toast.create({ html: message, timeout: 5000 });
    return Promise.reject(message);
  // 网络错误
  } else if (!/401|403/.test(status)) {
    Alert.create({
      icon: "error",
      html: `请求失败：${status}<br><small>${error.config.url}</small>`,
      duration: 0,
    });
  }
  return Promise.reject(error);  // 避免后续 then 的执行
}
