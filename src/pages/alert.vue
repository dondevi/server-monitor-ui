<!--
/**
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2018-02-09 dondevi
 */
-->

<template>
  <q-card class="bg-white">
    <q-card-title>异常告警</q-card-title>
    <audio ref="audio" :src="alertSound"></audio>

    <q-list link separator>
      <q-item v-for="(alertInfo, index) in alertList" :key="index"
              @click="openModal(alertInfo)">
        <q-item-main>
          <q-icon :name="['info', 'warning', 'error'][alertInfo.warningLevel]"
                  :color="['blue', 'orange', 'red'][alertInfo.warningLevel]" />
          {{ alertInfo.serverName + (alertInfo.exceptionType ? ` 【${alertInfo.exceptionType}】`: ``) }}
        </q-item-main>
        <q-item-side>
          <q-item-tile>{{ new Date(alertInfo.checkTime).format(`YYYY-MM-DD hh:mm:ss`) }}</q-item-tile>
        </q-item-side>
      </q-item>
    </q-list>

    <q-modal ref="alertModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout v-if="alertInfo">
        <q-toolbar slot="header">
          <q-btn flat @click="closeModal">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            {{ alertInfo.serverName + (alertInfo.exceptionType ? ` 【${alertInfo.exceptionType}】`: ``) }}
            {{ new Date(alertInfo.checkTime).format(`YYYY-MM-DD hh:mm:ss`) }}
          </q-toolbar-title>
        </q-toolbar>
        <dl class="layout-padding">
          <dt class="bg-light">方法</dt>
          <dd><pre>{{ alertInfo.functionName }}</pre></dd>
          <dt class="bg-light">参数</dt>
          <dd><pre>{{ alertInfo.args }}</pre></dd>
          <dt class="bg-light">日志</dt>
          <dd><pre>{{ alertInfo.errorLog }}</pre></dd>
        </dl>
      </q-modal-layout>
    </q-modal>

  </q-card>
</template>

<script>
  import { getAlertList as SOCKET_getAlertList } from "service";
  let alertSound = require("themes/alert.mp3");
  export default {
    data: () => ({
      alertSound,
      alertList: [],
      alertInfo: null,
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      refreshData () {
        return SOCKET_getAlertList(null, json => {
          this.alertList.push(json.data);
          if (json.data.hasWarning) {
            this.$refs.audio.play();
          }
        });
      },
      playSound () {},
      openModal (alertInfo) {
        this.alertInfo = alertInfo;
        this.$refs.alertModal.open();
      },
      closeModal (alertInfo) {
        this.$refs.alertModal.close();
      },
    },
  };
</script>

<style scoped>
  dt, dd {
    padding: 5px 10px;
  }
  pre {
    font-family: inherit;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
