<!--
/**
 * @author dondevi
 * @create 2018-02-02
 */
-->

<template>
  <q-list highlight>
    <q-list-header style="padding-right: 16px;"> 系统概览
      <span class="float-right">{{ current.checkTime | formatDate }}</span>
    </q-list-header>

    <q-item>
      <q-item-side icon="select_all"/>
      <q-item-main>
        <q-item-tile label> CPU
          <span class="float-right">{{ current.cpuRatio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel>
          <q-progress class="round-borders inset-shadow" style="height:10px"
            :percentage="current.cpuRatio" :color="cpuColor" />
        </q-item-tile>
        <q-item-tile sublabel>&nbsp;</q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show="resizeChart($refs.cpu)">
        <q-card :color="cpuColor">
          <q-card-title> CPU
            <big slot="right">{{ current.cpuRatio }} %</big>
          </q-card-title>
          <q-card-main>
            <chart ref="cpu" :option="cpuOption" theme="light" auto-resize/>
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>

    <q-item>
      <q-item-side icon="memory"/>
      <q-item-main>
        <q-item-tile label> 物理内存
          <span class="float-right">{{ current.memRatio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel>
          <q-progress class="round-borders inset-shadow" style="height:10px"
            :percentage="current.memRatio" :color="memColor" />
        </q-item-tile>
        <q-item-tile sublabel>
          {{ current.totalPhysicalMemorySize | formatByte }} -
          {{ current.usedPhysicalMemorySize | formatByte }} =
          {{ current.freePhysicalMemorySize | formatByte }}
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show="resizeChart($refs.mem)">
        <q-card :color="memColor">
          <q-card-title> 物理内存
            <big slot="right">{{ current.memRatio }} %</big>
          </q-card-title>
          <q-card-main>
            <chart ref="mem" :option="memOption" theme="light" auto-resize/>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            总量：{{ current.totalPhysicalMemorySize | formatByte }} <br>
            已用：{{ current.usedPhysicalMemorySize | formatByte }} <br>
            剩余：{{ current.freePhysicalMemorySize | formatByte }} <br>
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>

    <q-item>
      <q-item-side icon="hd"/>
      <q-item-main>
        <q-item-tile label> 物理磁盘
          <span class="float-right">{{ current.diskRatio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel>
          <q-progress class="round-borders inset-shadow" style="height:10px"
            :percentage="current.diskRatio" :color="diskColor" />
        </q-item-tile>
        <q-item-tile sublabel>
          {{ current.totalDiskSize | formatByte }} -
          {{ current.usedDiskSize | formatByte }} =
          {{ current.freeDiskSize | formatByte }}
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show="resizeChart($refs.disk)">
        <q-card :color="diskColor">
          <q-card-title> 物理磁盘
            <big slot="right">{{ current.diskRatio }} %</big>
          </q-card-title>
          <q-card-main>
            <chart ref="disk" :option="diskOption" theme="light" auto-resize/>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            总量：{{ current.totalDiskSize | formatByte }} <br>
            已用：{{ current.usedDiskSize | formatByte }} <br>
            剩余：{{ current.freeDiskSize | formatByte }} <br>
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>

    <q-item-separator/>

    <q-list-header>JVM 内存</q-list-header>
    <q-item v-for="jvm in jvms" :key="jvm.serverIP">
      <q-tooltip>{{ jvm.serverIP }}</q-tooltip>
      <q-item-side icon="developer_board"/>
      <q-item-main>
        <q-item-tile label> {{ jvm.serverName }}
          <span class="float-right">{{ jvm.current.jvmMemRatio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel>
          <q-progress class="round-borders inset-shadow" style="height:10px"
            :percentage="jvm.current.jvmMemRatio" :color="jvm.color" />
        </q-item-tile>
        <q-item-tile sublabel>
          {{ jvm.current.jvmMaxMemory | formatByte }} -
          {{ jvm.current.jvmUsingMemory | formatByte }} =
          {{ jvm.current.jvmFreeMemory | formatByte }}
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show="resizeChart($refs[`jvmMem-${jvm.serverIP}`][0])">
        <q-card :color="jvm.color">
          <q-card-title> JVM 内存（{{ jvm.serverName }}）
            <big slot="right">{{ jvm.current.jvmMemRatio }} %</big>
          </q-card-title>
          <q-card-main>
            <chart :ref="`jvmMem-${jvm.serverIP}`" :option="jvm.option" theme="light" auto-resize/>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            最大可用：{{ jvm.current.jvmMaxMemory | formatByte }} <br>
            已用：{{ jvm.current.jvmUsingMemory | formatByte }} <br>
            剩余：{{ jvm.current.jvmFreeMemory | formatByte }} <br>
          </q-card-main>
        </q-card>
      </q-popover>
    </q-item>

    <q-item-separator/>

    <q-item>
      <q-item-side icon="subject"/>
      <q-item-main>
        <q-item-tile label> 线程数
          <span class="float-right">{{ current.totalThread }}</span>
        </q-item-tile>
      </q-item-main>
      <q-popover anchor="bottom right" self="bottom left" fit
                 @show="resizeChart($refs.thread)">
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
                 @show="resizeChart($refs.ping)">
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
                 @show="resizeChart($refs.net)">
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
  let tooltipOption = {
    trigger: "axis", padding: [5, 12], confine: true,
    axisPointer: {
      lineStyle: { color: "rgba(255,255,255,0.3)" },
    },
    // formatter: params =>
    //   `<small>${params[0].axisValueLabel}</small>` +
    //   `<br>${params[0].value}%`,
  };
  let seriesOption = {
    type: "line", showSymbol: false, areaStyle: {},
    itemStyle: { color: "rgba(255,255,255,0.5)" },
  };
  let echartOption = {
    tooltip: tooltipOption,
    grid:  { left: 0, top: 0, right: 0, bottom: 0 },
    xAxis: { type: "time", show: false },
    yAxis: { type: "value", show: false },
  };
  export default {
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

        cpuOption: { ...echartOption, yAxis: { show: false, max: 100 }, series: {
          ...seriesOption, encode: { x: "checkTime", y: "cpuRatio"} }
        },
        memOption: { ...echartOption, yAxis: { show: false, max: 100 }, series: {
          ...seriesOption, encode: { x: "checkTime", y: "memRatio"} }
        },
        diskOption: { ...echartOption, yAxis: { show: false, max: 100 }, series: {
          ...seriesOption, encode: { x: "checkTime", y: "diskRatio"} }
        },
        threadOption: { ...echartOption, series: {
          ...seriesOption, encode: { x: "checkTime", y: "totalThread"} }
        },
        pingOption: { ...echartOption, series: [
          { ...seriesOption, encode: { x: "checkTime", y: "innerServerPing" } },
          { ...seriesOption, encode: { x: "checkTime", y: "remoteServerPing" } },
        ] },
        netOption: { ...echartOption, series: [
          { ...seriesOption, encode: { x: "checkTime", y: "netEstablished" } },
          { ...seriesOption, encode: { x: "checkTime", y: "netCloseWait" } },
          { ...seriesOption, encode: { x: "checkTime", y: "netTimeWait" } },
        ] },
      };
    },
    computed: {
      cpuColor () { return this.getPieceColor(this.current.cpuRatio); },
      memColor () { return this.getPieceColor(this.current.memRatio); },
      diskColor () { return this.getPieceColor(this.current.diskRatio); },
    },
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      getPieceColor (value) {
        let { pieces } = this;
        for (let piece of pieces) {
          if (value === piece.value ||
              value > piece.min && value <= piece.max) {
            return piece.color;
          }
        }
      },
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
          } = json.data;

          this.current = json.data;
          this.current.memRatio = ~~(usedPhysicalMemorySize / totalPhysicalMemorySize * 100);
          this.current.diskRatio = ~~(usedDiskSize / totalDiskSize * 100);

          if (50 <= this.history.length) {
            this.history.shift();
          }
          this.history.push(this.current);

          ["cpu", "mem", "disk", "thread", "ping", "net"].forEach(ref => {
            let chart = this.$refs[ref]
            chart.setOption({ dataset: { source: this.history } });
          });

          let jvm = this.jvms[serverIP] = this.jvms[serverIP] || {
            current: {},
            history: [],
            option: {
              ...echartOption,
              yAxis: { show: false, max: 100 },
              series: { ...seriesOption },
            },
          };
          jvm.serverName = serverName;
          jvm.serverIP = serverIP;
          jvm.current.jvmUsingMemory = jvmUsingMemory;
          jvm.current.jvmFreeMemory = jvmFreeMemory;
          jvm.current.jvmMaxMemory = jvmMaxMemory;
          jvm.current.jvmMemRatio = ~~(jvmUsingMemory / jvmMaxMemory * 100);
          jvm.color = this.getPieceColor(jvm.current.jvmMemRatio);
          if (50 <= jvm.history.length) {
            jvm.history.shift();
          }
          jvm.history.push([checkTime, jvm.current.jvmMemRatio]);
          this.$nextTick(() => {
            let chart = this.$refs[`jvmMem-${serverIP}`][0];
            chart.setOption({ series: { data: jvm.history } });
          });
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
  .q-popover .q-card {
    margin: 0;
  }
</style>
