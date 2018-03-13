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

/**
 * Quasar Framework
 * @see http://quasar-framework.org/components/
 */
import Quasar, * as All from "quasar-framework-js";
import "quasar-framework-css";
import "quasar-extras/material-icons";
Vue.use(Quasar, { directives: All, components: All });

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
 * Mock
 */
import "mock";

/**
 * Router & APP
 */
import router from "router/index.js";
// import session from "router/session.js";
import app from "frames/app.vue";
new Vue({ router, render: h => h(app) }).$mount("#app");

