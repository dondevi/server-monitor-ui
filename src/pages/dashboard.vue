<!--
/**
 * Dashboard
 *
 * @author dondevi
 * @create 2018-02-09
 */
-->

<template>
  <section class="layout-padding">
    <com-resource></com-resource>
    <com-business></com-business>
    <com-alert></com-alert>
  </section>
</template>

<script>
  import comResource from "pages/resource.vue";
  import comAlert from "pages/alert.vue";
  import comBusiness from "pages/business.vue";
  export default {
    components: { comResource, comAlert, comBusiness},
  };
</script>
