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
import "quasar-extras/material-icons";
import "quasar-framework-css";
import Quasar, * as All from "quasar-framework-js";
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
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import "echarts/lib/component/dataset";
import "echarts/lib/chart/line";
// import echarts from "echarts";
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/sankey";
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
