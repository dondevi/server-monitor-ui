<!--
/**
 * @author dondevi
 * @create 2018-02-02
 */
-->

<template>
  <section class="row">
    <div class="col-md-3">
      <q-card :color="cpuColor">
        <q-card-title> CPU
          <big slot="right">{{ cpuRatio }} %</big>
        </q-card-title>
        <q-card-main>
          <chart ref="cpu" :options="cpuOption" theme="light" auto-resize></chart>
        </q-card-main>
        <q-card-separator />
        <q-card-main>
          服务名称：{{ state.serverName }}
          <br>系统时间：{{ checkTime }}
          <br>线程数量：{{ state.totalThread }}
          <!-- <br>CPU 温度：- °C -->
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-3">
      <q-card :color="vRamColor">
        <q-card-title> JVM 内存
          <big slot="right">{{ vRamRatio }} %</big>
        </q-card-title>
        <q-card-main>
          <chart ref="vRam" :options="vRamOption" theme="light" auto-resize></chart>
        </q-card-main>
        <q-card-separator />
        <q-card-main>
          最大可使用内存：{{ getStorageSize(state.jvmMaxMemory) }}
          <br>已使用内存：{{ getStorageSize(state.jvmUseingMemory) }}
          <br>剩余内存：{{ getStorageSize(state.jvmFreeMemory) }}
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-3">
      <q-card :color="ramColor">
        <q-card-title> 物理内存
          <big slot="right">{{ ramRatio }} %</big>
        </q-card-title>
        <q-card-main>
          <chart ref="ram" :options="ramOption" theme="light" auto-resize></chart>
        </q-card-main>
        <q-card-separator />
        <q-card-main>
          总物理内存：{{ getStorageSize(state.totalPhysicalMemorySize) }}
          <br>已使用物理内存：{{ getStorageSize(state.usedPhysicalMemorySize) }}
          <br>剩余物理内存：{{ getStorageSize(state.freePhysicalMemorySize) }}
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-3">
      <q-card :color="diskColor">
        <q-card-title> 物理磁盘
          <big slot="right">{{ diskRatio }} %</big>
        </q-card-title>
        <q-card-main>
          <chart ref="disk" :options="diskOption" theme="light" auto-resize></chart>
        </q-card-main>
        <q-card-separator />
        <q-card-main>
          总物理磁盘：{{ getStorageSize(state.totalDiskSize) }}
          <br>已使用物理磁盘：{{ getStorageSize(state.usedDiskSize) }}
          <br>剩余物理磁盘：{{ getStorageSize(state.freeDiskSize) }}
        </q-card-main>
      </q-card>
    </div>
  </section>
</template>



<script>
  import { getResourceState as SOCKET_getResourceState } from "service";
  export default {
    data () {
      let option = {
        tooltip: {
          formatter (params) {
            return `<small>${params[0].axisValueLabel}</small>` +
                   `<br>${params[0].value[1]}%`;
          },
          trigger: "axis", padding: [5, 12],
          axisPointer: { lineStyle: { color: "rgba(255,255,255,0.3)" } }
        },
        grid: { left: 0, top: 0, right: 0, bottom: 0 },
        xAxis: { type: "time", show: false, },
        yAxis: { type: "value", show: false, max: 100 },
        series: {
          type: "line", showSymbol: false,
          itemStyle: { color: "rgba(255,255,255,0.5)" }, areaStyle: {}
        },
      };
      return {
        state: {},
        pieces: [
          { min: 0, max: 50, color: "green-5" },
          { min: 50, max: 80, color: "orange-5" },
          { min: 80, max: 100, color: "red-5" },
        ],
        cpuData: getInitData(),
        ramData: getInitData(),
        vRamData: getInitData(),
        diskData: getInitData(),
        cpuOption: { ...option },
        ramOption: { ...option },
        vRamOption: { ...option },
        diskOption: { ...option },
      };
    },
    computed: {
      checkTime () {
        return new Date(this.state.checkTime || 0).format("YYYY-MM-DD hh:mm:ss");
      },
      cpuRatio () {
        return ~~(this.state.cpuRatio);
      },
      ramRatio () {
        return ~~(this.state.usedPhysicalMemorySize / this.state.totalPhysicalMemorySize * 100);
      },
      vRamRatio () {
        return ~~(this.state.jvmUseingMemory / this.state.jvmMaxMemory * 100);
      },
      diskRatio () {
        return ~~(this.state.usedDiskSize / this.state.totalDiskSize * 100);
      },
      cpuColor () { return this.getPieceColor(this.cpuRatio); },
      ramColor () { return this.getPieceColor(this.ramRatio); },
      vRamColor () { return this.getPieceColor(this.vRamRatio); },
      diskColor () { return this.getPieceColor(this.diskRatio); },
    },
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      getPieceColor (ratio) {
        let { pieces } = this;
        for (let piece of pieces) {
          if (ratio > piece.min && ratio <= piece.max) {
            return piece.color;
          }
        }
        return "blue-3";
      },
      getStorageSize (storage = 0) {
        if (1073741824 <= storage) {
          return (storage / 1073741824).toFixed(1) + " TB";
        }
        if (1048576 <= storage) {
          return (storage / 1048576).toFixed(1) + " GB";
        }
        if (1024 <= storage) {
          return (storage / 1024).toFixed(1) + " MB";
        }
        return storage + " KB";
      },
      refreshData () {
        return SOCKET_getResourceState(null, json => {
          this.state = json.data;

          this.cpuData.shift();
          this.cpuData.push({
            name: this.checkTime,
            value: [ this.checkTime, this.cpuRatio ],
          });
          this.$refs.cpu.mergeOptions({
            series: [{ data: this.cpuData }],
          });

          this.ramData.shift();
          this.ramData.push({
            name: this.checkTime,
            value: [ this.checkTime, this.ramRatio ],
          });
          this.$refs.ram.mergeOptions({
            series: [{ data: this.ramData }],
          });

          this.vRamData.shift();
          this.vRamData.push({
            name: this.checkTime,
            value: [ this.checkTime, this.vRamRatio ],
          });
          this.$refs.vRam.mergeOptions({
            series: [{ data: this.vRamData }],
          });

          this.diskData.shift();
          this.diskData.push({
            name: this.checkTime,
            value: [ this.checkTime, this.diskRatio ],
          });
          this.$refs.disk.mergeOptions({
            series: [{ data: this.diskData }],
          });

        });
      },
    },
  };

  function getInitData () {
    let now = Date.now();
    return new Array(50).fill(null).map((e, i) => {
      return new Date(now - (50 - i) * 1000).format("YYYY/MM/DD hh:mm:ss");
    });
  }
</script>



<style scoped>
  .echarts {
    width: auto;
    height: 100px;
  }
  .q-card-separator + .q-card-main {
    background-color: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
  }
</style>
