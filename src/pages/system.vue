<!--
/**
 * @author dondevi
 * @create 2018-02-02
 */
-->

<template>
  <q-list no-border dark class="bg-dark">
    <q-list-header style="padding-right: 16px;"> 系统概览
      <span class="float-right">{{ current.checkTime | formatDate }}</span>
    </q-list-header>

    <q-item-ratio label="CPU" icon="select_all"
      :encode="{ x: 'checkTime', y: 'cpuRatio' }"
      :history="history" :ratio="current.cpuRatio"/>

    <q-item-ratio label="物理内存" icon="memory"
      :encode="{ x: 'checkTime', y: 'memRatio' }"
      :history="history" :ratio="current.memRatio"
      :total="current.totalPhysicalMemorySize"
      :used="current.usedPhysicalMemorySize"
      :free="current.freePhysicalMemorySize"/>

    <q-item-ratio label="物理磁盘" icon="hd"
      :encode="{ x: 'checkTime', y: 'diskRatio' }"
      :history="history" :ratio="current.diskRatio"
      :total="current.totalDiskSize"
      :used="current.usedDiskSize"
      :free="current.freeDiskSize"/>

    <q-item-separator/>

    <q-list-header>JVM 内存</q-list-header>

    <q-item-ratio v-for="jvm in jvms" :key="jvm.serverIP"
      :label="jvm.serverName" icon="developer_board"
      :encode="{ x: 'checkTime', y: 'jvmMemRatio' }"
      :history="jvm.history" :ratio="jvm.current.jvmMemRatio"
      :total="jvm.current.jvmMaxMemory"
      :used="jvm.current.jvmUsingMemory"
      :free="jvm.current.jvmFreeMemory">
      <q-tooltip>{{ jvm.serverIP }}</q-tooltip>
    </q-item-ratio>

    <q-item-separator/>

    <q-item>
      <q-item-side icon="subject"/>
      <q-item-main>
        <q-item-tile label> 线程数
          <span class="float-right">{{ current.totalThread }}</span>
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show.once="resizeChart($refs.thread)">
        <q-card color="blue-4">
          <q-card-title> 线程
            <big slot="right">{{ current.totalThread }}</big>
          </q-card-title>
          <q-card-main>
            <chart ref="thread" :option="threadOption" theme="light" auto-resize/>
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>

    <q-item>
      <q-item-side icon="slow_motion_video"/>
      <q-item-main>
        <q-item-tile label> Ping 值 </q-item-tile>
        <q-item-tile sublabel> 内部服务
          <span class="float-right">{{ current.innerServerPing }} ms</span>
        </q-item-tile>
        <q-item-tile sublabel> 远程服务
          <span class="float-right">{{ current.remoteServerPing }} ms</span>
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show.once="resizeChart($refs.ping)">
        <q-card color="blue-4">
          <q-card-title> Ping 值
            <big slot="right">{{ (current.innerServerPing + current.remoteServerPing) / 2 }}</big>
          </q-card-title>
          <q-card-main>
            <chart ref="ping" :option="pingOption" theme="light" auto-resize/>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            内部服务： {{ current.innerServerPing }} ms<br>
            远程服务： {{ current.remoteServerPing }} ms<br>
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>

    <q-item>
      <q-item-side icon="language"/>
      <q-item-main>
        <q-item-tile label> 网络连接 </q-item-tile>
        <q-item-tile sublabel> 连接数
          <span class="float-right">{{ current.netEstablished }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 关闭数
          <span class="float-right">{{ current.netCloseWait }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 等待数
          <span class="float-right">{{ current.netTimeWait }}</span>
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show.once="resizeChart($refs.net)">
        <q-card color="blue-4">
          <q-card-title> 网络连接
            <big slot="right">{{ current.netEstablished }}</big>
          </q-card-title>
          <q-card-main>
            <chart ref="net" :option="netOption" theme="light" auto-resize/>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            连接：{{ current.netEstablished }} <br>
            关闭：{{ current.netCloseWait }} <br>
            等待：{{ current.netTimeWait }}
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>
  </q-list>
</template>



<script>
  import { getSystemInfo as SOCKET_getSystemInfo } from "service";
  import { getLineChartOption } from "config/echarts.js";
  import QItemRatio from "components/q-item-ratio.vue";

  export default {
    components: { QItemRatio },
    data () {
      let now = Date.now();
      return {
        current: {},
        history: [],
        jvms: {},

        pieces: [
          { value: 0, color: "blue-3" },
          { min: 0, max: 70, color: "green-5" },
          { min: 70, max: 90, color: "orange-5" },
          { min: 90, max: 100, color: "red-5" },
        ],

        threadOption: getLineChartOption({
          series: { encode: { x: "checkTime", y: "totalThread"} },
        }),
        pingOption: getLineChartOption({ series: [
          { encode: { x: "checkTime", y: "innerServerPing" } },
          { encode: { x: "checkTime", y: "remoteServerPing" } },
        ]}),
        netOption: getLineChartOption({ series: [
          { encode: { x: "checkTime", y: "netEstablished" } },
          { encode: { x: "checkTime", y: "netCloseWait" } },
          { encode: { x: "checkTime", y: "netTimeWait" } },
        ]}),
      };
    },
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      resizeChart (chart) {
        chart.resize();
      },
      refreshData () {
        return SOCKET_getSystemInfo(null, json => {
          let {
            serverName, serverIP, checkTime,
            usedPhysicalMemorySize, totalPhysicalMemorySize,
            usedDiskSize, totalDiskSize,
            jvmUsingMemory, jvmFreeMemory, jvmMaxMemory,
          } = json;

          this.current = json;
          this.current.memRatio = ~~(usedPhysicalMemorySize / totalPhysicalMemorySize * 100);
          this.current.diskRatio = ~~(usedDiskSize / totalDiskSize * 100);

          if (60 <= this.history.length) {
            this.history.shift();
          }
          this.history.push(this.current);

          ["thread", "ping", "net"].forEach(ref => {
            let chart = this.$refs[ref]
            chart.setOption({ dataset: { source: this.history } });
          });

          if (!this.jvms[serverIP]) {
            this.$set(this.jvms, serverIP, {
              current: {}, history: [],
            });
          }
          let jvm = this.jvms[serverIP];
          jvm.serverName = serverName;
          jvm.serverIP = serverIP;
          jvm.current.jvmUsingMemory = jvmUsingMemory;
          jvm.current.jvmFreeMemory = jvmFreeMemory;
          jvm.current.jvmMaxMemory = jvmMaxMemory;
          jvm.current.jvmMemRatio = ~~(jvmUsingMemory / jvmMaxMemory * 100);
          if (60 <= jvm.history.length) {
            jvm.history.shift();
          }
          jvm.history.push([checkTime, jvm.current.jvmMemRatio]);
        });
      },
    },
  };
</script>



<style scoped>
  .echarts {
    height: 100px;
  }
  .q-item-side {
    min-width: 0;
  }
  .q-card-separator + .q-card-main {
    background-color: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
  }
  .q-popover {
    background: none;
  }
  .q-popover .q-card {
    margin: 0;
  }
</style>
