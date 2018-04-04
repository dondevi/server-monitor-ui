<!--
/**
 * =============================================================================
 *  Server detail
 *  Show current status
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-04-04
 */
-->
<template>
  <q-list no-border dark class="bg-dark" v-if="current">
    <q-list-header> {{ current.sourceName }}
      <span class="float-right on-right">
        {{ current.status.checkTime | formatDate }}
      </span>
    </q-list-header>

    <q-item-ratio label="CPU" icon="select_all"
      :encode="{ x: 'checkTime', y: 'cpuRatio' }"
      :records="current.records" :ratio="current.status.cpuRatio"/>

    <q-item-ratio label="物理内存" icon="memory"
      :encode="{ x: 'checkTime', y: 'memRatio' }"
      :records="current.records" :ratio="current.status.memRatio"
      :total="current.status.totalPhysicalMemorySize"
      :used="current.status.usedPhysicalMemorySize"
      :free="current.status.freePhysicalMemorySize"/>

    <q-item-ratio label="物理磁盘" icon="hd"
      :encode="{ x: 'checkTime', y: 'diskRatio' }"
      :records="current.records" :ratio="current.status.diskRatio"
      :total="current.status.totalDiskSize"
      :used="current.status.usedDiskSize"
      :free="current.status.freeDiskSize"/>

    <q-item-ratio label="JVM 内存" icon="developer_board"
      :encode="{ x: 'checkTime', y: 'jvmMemRatio' }"
      :records="current.records" :ratio="current.status.jvmMemRatio"
      :total="current.status.jvmMaxMemory"
      :used="current.status.jvmUsingMemory"
      :free="current.status.jvmFreeMemory"/>

    <q-item-separator/>

    <q-item-group label="线程数" icon="subject"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[{ label: '线程数', name: 'totalThread' }]"/>

    <q-item-group label="Ping 值" icon="slow_motion_video"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '内部服务', name: 'innerServerPing', unit: 'ms' },
        { label: '远程服务', name: 'remoteServerPing', unit: 'ms' },
      ]"/>

    <q-item-group label="网络连接" icon="language"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '连接数', name: 'netEstablished' },
        { label: '关闭数', name: 'netCloseWait' },
        { label: '等待数', name: 'netTimeWait' },
      ]"/>
  </q-list>
</template>

<script>
  import QItemRatio from "components/q-item-ratio.vue";
  import QItemGroup from "components/q-item-group.vue";
  export default {
    components: { QItemRatio, QItemGroup },
    props: {
      current: Object,
    },
  };
</script>
