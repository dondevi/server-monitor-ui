/**
 * =============================================================================
 *  Router
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-02
 *
 * @update 2018-03-06 dondevi
 *   1.Rename: "layous/" to "frames/"
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const main = () => import("frames/main");
const dashboard = () => import("pages/dashboard");


const routes = [
  { path: "/", component: main, meta: { title: "Server Monitor" }, children: [
    { path: "/", component: dashboard, meta: { title: "Dashboard" } },
  ] },
];


const router = new VueRouter({ routes });

export default router;
