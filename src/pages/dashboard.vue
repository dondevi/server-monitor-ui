<!--
/**
 * =============================================================================
 *  Dashboard
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-09
 *
 * @update 2018-03-07 dondevi
 *   1.Rename: "resource" to "system"
 *   2.Rename: "alert" to "exception"
 * @update 2018-03-13 dondevi
 *   1.Add: com-database
 */
-->

<template>
  <q-page class="row" padding>
    <div class="col-md-3 q-pa-sm">
      <com-system class="bg-white"/>
    </div>
    <div class="col-md-3 q-pa-sm">
      <com-business class="bg-white"/>
    </div>
    <div class="col-md-3 q-pa-sm">
      <com-database class="bg-white"/>
    </div>
    <div class="col-md-3 q-pa-sm">
      <com-exception class="bg-white"/>
    </div>
  </q-page>
</template>

<script>
  import comSystem from "pages/system.vue";
  import comBusiness from "pages/business.vue";
  import comDatabase from "pages/database.vue";
  import comException from "pages/exception.vue";
  export default {
    components: { comSystem, comBusiness, comDatabase, comException },
  };
</script>
