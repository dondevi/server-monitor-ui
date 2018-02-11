/**
 * =============================================================================
 *  Main Entry
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-02
 */

// Vue
import Vue from "vue";

/**
 * Quasar Framework
 * @see http://quasar-framework.org/components/
 */
import Quasar, * as All from "quasar-framework";
import "quasar-framework/dist/quasar.mat.css";
import "quasar-extras/material-icons";
Vue.use(Quasar, { directives: All, components: All });

/**
 * Echarts
 * @see https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
 * @see https://ecomfe.github.io/echarts-doc/public/cn/api.html
 */
import ECharts from "vue-echarts/dist/vue-echarts.js";
// import ECharts from "vue-echarts/components/ECharts.vue";
// import "vue-echarts/node_modules/echarts/lib/component/tooltip";
// import "vue-echarts/node_modules/echarts/lib/chart/line";
// import "vue-echarts/node_modules/echarts/lib/chart/pie";
Vue.component("chart", ECharts);

/**
 * Custom
 */
import "mock";
import "modules/date/format.js";

/**
 * Router & APP
 */
import router from "router/index.js";
// import session from "router/session.js";
import app from "layouts/app.vue";
new Vue({ router, render: h => h(app) }).$mount("#app");

