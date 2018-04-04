<!--
/**
 * =============================================================================
 *  Dashboard
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-09
 *
 * @todo 2018-03-30 dondevi
 *   1.Optimize: Too many doms
 *
 * @update 2018-03-07 dondevi
 *   1.Rename: `resource` to `system`
 *   2.Rename: `alert` to `exception`
 * @update 2018-03-13 dondevi
 *   1.Add: com-database
 * @update 2018-04-04 dondevi
 *   1.Rename: `system` to `server`
 */
-->

<template>
  <q-page class="row layout-padding">
    <div class="col-md-3 q-pa-sm"> <com-business/> </div>
    <div class="col-md-3 q-pa-sm"> <com-server/> <com-database/> </div>
    <div class="col-md-6 q-pa-sm"> <com-exception/> </div>
  </q-page>
</template>

<script>
  import comBusiness from "pages/business.vue";
  const comServer = () => import("pages/server/list.vue");
  const comDatabase = () => import("pages/database/list.vue");
  const comException = () => import("pages/exception.vue");
  export default {
    components: { comBusiness, comServer, comDatabase, comException },
  };
</script>

<style scoped>
  .q-layout-page >>> .q-item-side {
    min-width: 0;
  }
</style>
