/**
 * @author dondevi
 * @create 2018-03-09
 */

/**
 * Inherit EventTarget methods by delegate DOM
 * @param  {Object} object
 */
export function inheritEventTarget (object) {
  const target = document.createDocumentFragment();
  const methods = ["addEventListener", "dispatchEvent", "removeEventListener"];
  methods.forEach(method => {
    object[method] = target[method].bind(target);
  });
}
