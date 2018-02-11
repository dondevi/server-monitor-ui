/**
 * =============================================================================
 *   Service Config
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-09
 */

const { host, pathname } = window.location;

/**
 * 环境判断
 * @type {Boolean}
 */
// const isLocal = /localhost|192\.168\./.test(host);

/**
 * 基本地址
 * @type {String}
 */
export const BASEURL = `//${host}`;
export const BASEURL_WS = `ws://${host}`;
