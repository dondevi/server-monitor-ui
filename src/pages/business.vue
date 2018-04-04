<!--
/**
 * =============================================================================
 *  Business Statistic
 * =============================================================================
 * @author dondevi
 * @create 2018-02-06
 *
 * @update 2018-03-13 dondevi
 * @update 2018-03-27 dondevi
 *   1.Update: <q-item-group>
 */
-->

<template>
  <q-list no-border class="bg-white">
    <q-list-header style="padding-right: 16px;"> 业务概览
      <span class="float-right">{{ status.checkTime | formatDate }}</span>
    </q-list-header>
    <q-item>
      <q-item-side icon="arrow_upward" color="blue-4"/>
      <q-item-main>
        <q-item-tile label> 当前递交
          <span class="float-right">{{ status.currentSubmit }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <!-- <q-item>
      <q-item-side icon="hourglass_empty" color="orange-4"/>
      <q-item-main>
        <q-item-tile label> 正在处理
          <span class="float-right">{{ status.currentProcess }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item> -->
    <q-item>
      <q-item-side icon="check" color="green-4"/>
      <q-item-main>
        <q-item-tile label> 当前合格
          <span class="float-right">{{ status.currentQualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="clear" color="red-4"/>
      <q-item-main>
        <q-item-tile label> 当前不合格
          <span class="float-right">{{ status.currentUnqualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="unarchive" color="blue-4"/>
      <q-item-main>
        <q-item-tile label> 递交总量
          <span class="float-right">{{ status.totalSubmit }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="check_circle" color="green-4"/>
      <q-item-main>
        <q-item-tile label> 合格总量
          <span class="float-right">{{ status.totalQualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="cancel" color="red-4"/>
      <q-item-main>
        <q-item-tile label> 不合格总量
          <span class="float-right">{{ status.totalUnqualified }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-list-header>操作耗时</q-list-header>

    <q-item-group label="机审平均" icon="adb"
      :status="status"
      :records="records"
      :x-field="{ name: 'time' }"
      :y-field="[
        { label: '机审平均', name: 'machinePerSeconds', unit: 'ms' },
        { label: '最长', name: 'machineMaxConsume', unit: 'ms' },
        { label: '最短', name: 'machineMinConsume', unit: 'ms' },
      ]"/>

    <q-item-group label="人审平均" icon="person"
      :status="status"
      :records="records"
      :x-field="{ name: 'time' }"
      :y-field="[
        { label: '人审平均', name: 'humenPerSeconds', unit: 'ms' },
        { label: '最长', name: 'humenMaxConsume', unit: 'ms' },
        { label: '最短', name: 'humenMinConsume', unit: 'ms' },
      ]"/>

    <q-item-group label="终审平均" icon="portrait"
      :status="status"
      :records="records"
      :x-field="{ name: 'time' }"
      :y-field="[
        { label: '终审平均', name: 'finalPerSeconds', unit: 'ms' },
        { label: '最长', name: 'finalMaxConsume', unit: 'ms' },
        { label: '最短', name: 'finalMinConsume', unit: 'ms' },
      ]"/>
  </q-list>
</template>

<script>
  import service from "service";
  import QItemGroup from "components/q-item-group.vue";
  export default {
    components: { QItemGroup },
    data: () => ({
      status: {},
      records: [],
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      refreshData () {
        return service.socket.getStatistics(null, json => {
          this.status = json;
          if (60 <= this.records.length) { this.records.shift(); }
          this.records.push(this.status);
        });
      },
    },
  };
</script>
