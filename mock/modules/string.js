/**
 * 反序列化 Search Params
 * @param  {String} search - 序列化字符串
 * @return {Object}        - 反序列化对象
 */
export function unserialize (search) {
  return search.split("&").reduce((acc, cur) => {
    const item = cur.split("=");
    acc[item[0]] = item[1];
    return acc;
  }, {});
}
