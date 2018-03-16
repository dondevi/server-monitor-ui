<!--
/**
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2018-03-09 dondevi
 */
-->

<template>
  <q-list no-border link dark class="bg-dark">

    <audio ref="audio-0" :src="audios.fatal"></audio>
    <audio ref="audio-1" :src="audios.error"></audio>
    <audio ref="audio-2" :src="audios.warn"></audio>
    <audio ref="audio-3" :src="audios.info"></audio>

    <q-list-header style="padding-right: 16px;"> 异常报警
      <span class="float-right" v-if="exceptionList.length">
        <q-chip color="red" small>{{ exceptionList.length }}</q-chip>
      </span>
    </q-list-header>

    <q-item v-for="(exception, index) in exceptionList" :key="index"
            @click.native="openModal(exception)">
      <q-item-side :icon="getIcon(exception.level)"
                   :color="getColor(exception.level)"/>
      <q-item-main>
        <q-item-tile label :color="['negative'][exception.level]" class="ellipsis">
          {{ exception.sourceName }}
        </q-item-tile>
        <q-item-tile sublabel :color="['negative'][exception.level]">
          <small>{{ exception.time | formatDate }}</small>
        </q-item-tile>
        <q-item-tile sublabel :color="['negative'][exception.level]" class="ellipsis" >
          {{ exception.message }}
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-modal ref="modal-detail" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout v-if="exception">
        <q-toolbar slot="header" :class="`bg-` + getColor(exception.level)">
          <q-btn flat @click.native="closeModal">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            【{{ getLabel(exception.level) }}】
            {{ exception.sourceName }} {{ exception.sourceIP }}
            <span class="float-right">{{ exception.time | formatDate }}</span>
          </q-toolbar-title>
        </q-toolbar>
        <dl class="layout-padding">
          <dt class="bg-light">异常信息</dt>
          <dd><pre>{{ exception.message }}</pre></dd>
          <dt class="bg-light">用户信息</dt>
          <br>
          <dd><label>用户ID：</label>{{ exception.userId }}</dd>
          <dd><label>设备UUID：</label>{{ exception.uuid }}</dd>
          <dd><label>设备型号：</label>{{ exception.device }}</dd>
          <dd><label>客户端IP：</label>{{ exception.clientIP }}</dd>
          <dd><label>客户端版本号：</label>{{ exception.clientVersion }}</dd>
          <br>
          <!-- <dt class="bg-light">参数</dt> -->
          <!-- <dd><pre>{{ exception.args }}</pre></dd> -->
          <template v-if="exception.stackTrace">
            <dt class="bg-light">异常堆栈</dt>
            <dd><pre>{{ exception.stackTrace }}</pre></dd>
          </template>
        </dl>
      </q-modal-layout>
    </q-modal>

  </q-list>
</template>

<script>
  import { getException as SOCKET_getException } from "service";
  export default {
    data: () => ({
      audios: {
        fatal: require("assets/fatal.mp3"),
        error: require("assets/error.mp3"),
        warn: require("assets/warn.mp3"),
        info: require("assets/alert.mp3"),
      },
      exception: null,
      exceptionList: [],
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      getLabel (level) {
        return ["FATAL", "ERROR", "WARN", "INFO"][level];
      },
      getIcon (level) {
        return ["cancel", "error", "warning", "info"][level];
      },
      getColor (level) {
        return ["negative", "red", "warning", "info"][level];
      },
      playSound (level) {
        this.$refs[`audio-${level}`].play();
      },
      openModal (exception) {
        this.exception = exception;
        this.$refs["modal-detail"].show();
      },
      closeModal () {
        this.$refs["modal-detail"].hide();
      },
      refreshData () {
        return SOCKET_getException(null, json => {
          this.exceptionList.unshift(json);
          this.playSound(json.level);
        });
      },
    },
  };
</script>

<style scoped>
  dt, dd {
    padding: 5px 10px;
  }
  dd > label {
    display: inline-block;
    min-width: 120px;
  }
  pre {
    font-family: inherit;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .q-item-side {
    min-width: 25px;
  }
  .q-popover {
    background: none;
  }
</style>
