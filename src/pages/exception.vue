<!--
/**
 * =============================================================================
 *  Exception Info
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2018-03-09 dondevi
 * @update 2018-03-30 dondevi
 *   1.Update: Audios - lazy load, mutable
 */
-->

<template>
  <q-list dark no-border class="bg-dark">

    <q-list-header> 异常信息
      <q-chip color="red" pointing="left" v-if="exceptions.length">
        {{ exceptions.length }}
      </q-chip>
      <q-btn class="float-right on-left" round @click.native="toggleAudio">
        <q-icon :name="audio.muted ? 'volume_off' : 'volume_up'"/>
      </q-btn>
    </q-list-header>

    <q-item>
      <q-item-main>
        <chart ref="chart" :option="option" theme="light" auto-resize/>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-item v-for="(exception, index) in exceptions" :key="index"
            @click.native="openModal(exception)" link>
      <q-item-side :icon="getIcon(exception.level)"
                   :color="getColor(exception.level)"/>
      <q-item-main>
        <q-item-tile label :color="['negative'][exception.level]" class="ellipsis">
          {{ exception.sourceName }}
          <time class="float-right">{{ exception.checkTime | formatDate }}</time>
        </q-item-tile>
        <!-- <q-item-tile sublabel :color="['negative'][exception.level]">
          <time>{{ exception.checkTime | formatDate }}</time>
        </q-item-tile> -->
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
            <span class="float-right">{{ exception.checkTime | formatDate }}</span>
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
  import service from "service";
  export default {
    data: () => ({
      audio: {
        muted: false,
        list: {
          0: { src: require("assets/fatal.mp3"), dom: null },  // Fatal
          1: { src: require("assets/error.mp3"), dom: null },  // Error
          2: { src: require("assets/warn.mp3"), dom: null },   // Warn
          3: { src: require("assets/alert.mp3"), dom: null },  // Info
        },
      },

      option: {
        tooltip: { trigger: "axis", axisPointer: { type : "shadow" } },
        grid: { top: 5, right: 0, bottom: 0, left: 0, containLabel: true },
        xAxis: { type: "category",
          data: ["FATAL", "ERROR", "WARN", "INFO"],
          axisTick: { alignWithLabel: true },
          nameTextStyle: { color: "rgba(255,255,255,0.4)" },
          axisLine: { lineStyle: { color: "rgba(255,255,255,0.4)" } },
        },
        yAxis: { type: "value", splitLine: { show: false },
          nameTextStyle: { color: "rgba(255,255,255,0.4)" },
          axisLine: { lineStyle: { color: "rgba(255,255,255,0.4)" } },
        },
        series: { type:"bar", data: [
          { value: 0, itemStyle: { color: "rgba(219,40,40,0.7)" } },
          { value: 0, itemStyle: { color: "rgba(244,67,54,0.7)" } },
          { value: 0, itemStyle: { color: "rgba(242,192,55,0.7)" } },
          { value: 0, itemStyle: { color: "rgba(49,204,236,0.7)" } },
        ] },
      },
      exception: null,
      exceptions: [],
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      getLabel: (level) => ["FATAL", "ERROR", "WARN", "INFO"][level],
      getIcon: (level) => ["cancel", "error", "warning", "info"][level],
      getColor: (level) => ["negative", "red", "warning", "info"][level],
      toggleAudio () {
        const muted = !this.audio.muted;
        this.audio.muted = muted;
        Object.values(this.audio.list).forEach(audio => {
          if (audio.dom && !audio.dom.paused) {
            audio.dom.muted = muted;
          }
        });
      },
      playSound (level) {
        const audio = this.audio.list[level];
        if (audio.dom) {
          audio.dom.muted = this.audio.muted;
          audio.dom.play();
        } else {
          audio.dom = new Audio(audio.src);
          audio.dom.oncanplay = event => this.playSound(level);
        }
      },
      openModal (exception) {
        this.exception = exception;
        this.$refs["modal-detail"].show();
      },
      closeModal () {
        this.$refs["modal-detail"].hide();
      },
      refreshData () {
        return service.socket.getException(null, json => {
          const { level } = json;
          this.exceptions.unshift(json);
          this.playSound(level);
          this.option.series.data[level].value += 1;
          this.$refs.chart.setOption({
            series: { data: this.option.series.data }
          });
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
  .q-chip {
    z-index: 1;
  }
</style>
