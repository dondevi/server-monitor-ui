<!--
/**
 * @author dondevi
 * @create 2018-02-06
 */
-->

<template>
  <section class="row">
    <div class="col-md-2">
      <q-card class="bg-white">
        <q-card-title><big>{{ this.businessInfo.submit }}</big></q-card-title>
        <q-card-main>
          <q-icon name="vertical_align_top" color="blue-5" /> 今日递交
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-2">
      <q-card class="bg-white">
        <q-card-title><big>{{ this.businessInfo.processing }}</big></q-card-title>
        <q-card-main>
          <q-icon name="schedule" color="orange-5" /> 正在处理
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-2">
      <q-card class="bg-white">
        <q-card-title><big>{{ this.businessInfo.qualified }}</big></q-card-title>
        <q-card-main>
          <q-icon name="check" color="green-5" /> 今日合格
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-2">
      <q-card class="bg-white">
        <q-card-title><big>{{ this.businessInfo.unqualified }}</big></q-card-title>
        <q-card-main>
          <q-icon name="clear" color="red-5" /> 今日不合格
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-2">
      <q-card class="bg-white">
        <q-card-title><big>{{ this.businessInfo.totalQualified }}</big></q-card-title>
        <q-card-main>
          <q-icon name="check_circle" color="green-5" /> 合格总量
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-2">
      <q-card class="bg-white">
        <q-card-title><big>{{ this.businessInfo.totalUnqualified }}</big></q-card-title>
        <q-card-main>
          <q-icon name="cancel" color="red-5" /> 不合格总量
        </q-card-main>
      </q-card>
    </div>
  </section>
</template>

<script>
  import { getBusinessList as SOCKET_getBusinessList } from "service";
  export default {
    data: () => ({
      businessInfo: {},
    }),
    mounted () {
      this.socket = this.refreshData();
      this.interval = window.setInterval(() => {
        this.socket.send(true);
      }, 30000);
    },
    destroyed () {
      this.socket.close();
      window.clearInterval(this.interval);
    },
    methods: {
      refreshData () {
        return SOCKET_getBusinessList(true, json => {
          this.businessInfo = json.data;
        });
      },
    },
  };
</script>

<style scoped>
  .q-card {
    text-align: center;
  }
  .q-card-main {
    font-size: 16px;
    text-indent: -5px;
  }
</style>
