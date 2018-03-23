/**
 * =============================================================================
 *  Main Entry
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-02
 */

/**
 * Vue
 */
import Vue from "vue";
// Vue.config.errorHandler = (err, vm, info) => {};

/**
 * Quasar Framework
 * @see http://quasar-framework.org/components/
 */
import { Quasar, QuasarDirectives, QuasarComponents } from "quasar-framework-custom";
Vue.use(Quasar, { directives: QuasarDirectives, components: QuasarComponents });

/**
 * Echarts
 * @see https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
 * @see https://ecomfe.github.io/echarts-doc/public/cn/api.html
 */
// import ECharts from "vue-echarts/dist/vue-echarts.js";
// Vue.component("chart", ECharts);

/**
 * Filters
 */
import formatDate from "filters/formatDate.js";
import formatByte from "filters/formatByte.js";
Vue.filter("formatDate", formatDate);
Vue.filter("formatByte", formatByte);

/**
 * Components
 */
import ECharts from "components/echarts.vue";
Vue.component("chart", ECharts);

/**
 * Router & APP
 */
import router from "router/index.js";
// import session from "router/session.js";
import app from "frames/app.vue";
new Vue({ router, render: h => h(app) }).$mount("#app");
