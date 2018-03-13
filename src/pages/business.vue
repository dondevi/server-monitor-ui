<!--
/**
 * @author dondevi
 * @create 2018-02-06

 * @update 2018-03-13 dondevi
 */
-->

<template>
  <q-list>
    <q-list-header style="padding-right: 16px;"> 业务概览
      <span class="float-right">{{ current.checkTime | formatDate }}</span>
    </q-list-header>
    <q-item>
      <q-item-side icon="arrow_upward" color="blue-4"/>
      <q-item-main>
        <q-item-tile label> 当前递交
          <span class="float-right">{{ current.currentSubmit }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="hourglass_empty" color="orange-4"/>
      <q-item-main>
        <q-item-tile label> 正在处理
          <!-- <span class="float-right">{{ current. }}</span> -->
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="check" color="green-4"/>
      <q-item-main>
        <q-item-tile label> 当前合格
          <span class="float-right">{{ current.currentQualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="clear" color="red-4"/>
      <q-item-main>
        <q-item-tile label> 当前不合格
          <span class="float-right">{{ current.currentUnqualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="unarchive" color="blue-4"/>
      <q-item-main>
        <q-item-tile label> 递交总量
          <span class="float-right">{{ current.totalSubmit }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="check_circle" color="green-4"/>
      <q-item-main>
        <q-item-tile label> 合格总量
          <span class="float-right">{{ current.totalQualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="cancel" color="red-4"/>
      <q-item-main>
        <q-item-tile label> 不合格总量
          <span class="float-right">{{ current.totalUnqualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-list-header>操作耗时</q-list-header>
    <q-item>
      <q-item-side icon="adb"/>
      <q-item-main>
        <q-item-tile label> 机审平均
          <span class="float-right">{{ current.machinePerSeconds }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 最长
          <span class="float-right">{{ current.machineMaxConsume }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 最短
          <span class="float-right">{{ current.machineMinConsume }} ms</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="person"/>
      <q-item-main>
        <q-item-tile label> 人审平均
          <span class="float-right">{{ current.humenPerSeconds }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 最长
          <span class="float-right">{{ current.humenMaxConsume }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 最短
          <span class="float-right">{{ current.humenMinConsume }} ms</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="portrait"/>
      <q-item-main>
        <q-item-tile label> 终审平均
          <span class="float-right">{{ current.finalPerSeconds }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 最长
          <span class="float-right">{{ current.finalMaxConsume }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 最短
          <span class="float-right">{{ current.finalMinConsume }} ms</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  import { getStatistics as SOCKET_getStatistics } from "service";
  export default {
    data: () => ({
      current: {},
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
        return SOCKET_getStatistics(true, json => {
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
