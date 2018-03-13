<!--
/**
 * @author dondevi
 * @create 2018-03-13
 */
-->

<template>
  <q-list>
    <q-list-header style="padding-right: 16px;"> 数据库概览
      <span class="float-right">{{ current.checkTime | formatDate }}</span>
    </q-list-header>
    <q-item>
      <q-item-side icon="language"/>
      <q-item-main>
        <q-item-tile label> 连接数
          <span class="float-right">{{ current.connections }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="opacity"/>
      <q-item-main>
        <q-item-tile label> 流量
          <span class="float-right">{{ current.traffic | formatByte }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="flash_on"/>
      <q-item-main>
        <q-item-tile label> 效率
          <span class="float-right">{{ current.keyEfficiency }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="timelapse"/>
      <q-item-main>
        <q-item-tile label> 缓冲区使用率
          <span class="float-right">{{ current.innoDBBufferUsage }} %</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="schedule"/>
      <q-item-main>
        <q-item-tile label> 执行操作耗时
          <span class="float-right">{{ current.selectsPerSecond }} ms</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="schedule"/>
      <q-item-main>
        <q-item-tile label> 读数据耗时
          <span class="float-right">{{ current.innoDBReadsPerSecond }} ms</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="schedule"/>
      <q-item-main>
        <q-item-tile label> 写数据耗时
          <span class="float-right">{{ current.innoDBWritesPerSecond }} ms</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  import { getDatabaseInfo as SOCKET_getDatabaseInfo } from "service";
  export default {
    data: () => ({
      current: {},
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      refreshData () {
        return SOCKET_getDatabaseInfo(true, json => {
          this.current = json.data;
        });
      },
    },
  };
</script>

<style scoped>
  .q-item-side {
    min-width: 0;
  }
</style>
