/**
 * @author dondevi
 * @create 2018-03-08
 */

import URLS from "service/urls";
import DATAS from "mock/service/datas";

export const axios = mapResponses(URLS.axios, DATAS.axios);
export const socket = mapResponses(URLS.socket, DATAS.socket);

/**
 * Get responses mapping data
 * @param  {Object} urls
 * @param  {Object} datas
 * @return {Object}
 */
export function mapResponses (urls, datas) {
  let result = {};
  for (let key in urls) {
    let url  = urls[key];
    let data = datas[key];
    result[url] = data;
  }
  return result;
}
