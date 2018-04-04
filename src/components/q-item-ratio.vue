<!--
/**
 * =============================================================================
 *  QItem with Echats in QPopover
 *    and show ratio value
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-16
 *
 * @update 2018-04-03 dondevi
 *   1.Optimize: Echarts with QPopover
 * @update 2018-04-04 dondevi
 *   1.Fixed: Echarts resize on popover showing
 */
-->

<template>
  <q-item highlight class="cursor-pointer" :class="{ 'q-pl-none q-pr-none': isTile }">
    <!-- Icon -->
    <q-item-side :icon="icon" v-if="icon && !isTile"/>
    <!-- Item -->
    <q-item-main>
      <q-item-tile :label="!isTile" :sublabel="isTile"> {{ label }}
        <span class="float-right">{{ ratio }} %</span>
      </q-item-tile>
      <q-item-tile sublabel>
        <q-progress class="round-borders inset-shadow" style="height:10px"
          :percentage="+ratio" :color="color" />
      </q-item-tile>
      <!-- <q-item-tile sublabel v-if="total">
        {{ total | formatByte }} -
        {{ used | formatByte }} =
        {{ free | formatByte }}
      </q-item-tile> -->
    </q-item-main>
    <slot></slot>
    <!-- Popover -->
    <q-popover ref="popover" anchor="bottom right" self="bottom left" fit
               @show.once="resizeChart" @show="onPopoverShow" @hide="onPopoverHide">
      <q-card :color="color">
        <q-card-title> {{ label }}
          <big slot="right">{{ ratio }} %</big>
        </q-card-title>
        <q-card-main>
          <chart ref="chart" :option="option" theme="light" auto-resize/>
        </q-card-main>
        <q-card-separator />
        <q-card-main v-if="total" @click.native="$refs.popover.hide">
          最大：{{ total | formatByte }} <br>
          已用：{{ used | formatByte }} <br>
          剩余：{{ free | formatByte }} <br>
        </q-card-main>
      </q-card>
    </q-popover>
  </q-item>
</template>

<script>
  import { getLineChartOption } from "config/echarts.js";
  export default {
    props: {
      "is-tile": Boolean,
      "label": String,
      "icon": String,
      "encode": Object,
      "ratio": [Number, String],
      "total": [Number, String],
      "used": [Number, String],
      "free": [Number, String],
      "records": Array,
    },
    data () {
      return {
        pieces: [
          { min: -Infinity, max: 0, color: "blue-3" },
          { min: 0, max: 70, color: "green-5" },
          { min: 70, max: 90, color: "orange-5" },
          { min: 90, max: 100, color: "red-5" },
        ],
        option: getLineChartOption({
          yAxis: { max: 100 },
          series: { encode: this.encode },
        }),
      };
    },
    computed: {
      color () { return this.getPieceColor(this.ratio); },
    },
    watch: {
      records () {
        if (this.$refs.popover.showing) {
          this.needRenderChart = false;
          this.renderChart();
        } else {
          this.needRenderChart = true;
        }
      },
    },
    mounted () {
      this.onPopoverHide();
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
      onPopoverShow () {
        this.$refs.chart.startAnimation();
        if (this.needRenderChart) {
          this.resizeChart();
          this.renderChart();
        }
      },
      onPopoverHide () {
        this.$refs.chart.stopAnimation();
      },
      renderChart () {
        // if (Array.isArray(this.records[0])) {
          // this.$refs.chart.setOption({ series: { data: this.records } });
        // } else {
          this.$refs.chart.setOption({ dataset: { source: this.records } });
        // }
      },
      resizeChart () {
        const width = this.$el.offsetWidth;
        this.$refs.chart.resize({ width, slinet: true });
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
    animation: none;
  }
  .q-popover .q-card {
    margin: 0;
  }
</style>
