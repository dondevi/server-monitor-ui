/**
 * =============================================================================
 *  Router
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-02
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const main = () => import("views/main");
const dashboard = () => import("pages/dashboard");

// const resource = () => import("pages/resource");
// const alert = () => import("pages/alert");
// const business = () => import("pages/business");


const routes = [
  { path: "/", component: main, children: [
    { path: "/", component: dashboard },
  ] },
  // { path: "/", redirect: "/resource", component: main, meta: { needAuth: true }, children: [
  //   { path: "resource", component: resource },
  //   { path: "alert", component: alert },
  //   { path: "business", component: business },
  // ] },
];


const router = new VueRouter({ routes });

export default router;
