<!--
/**
 * =============================================================================
 *  QItem for showing group values,
 *    with QPopover for showing line chart by Echarts
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-26
 *
 * @todo 2018-03-29 dondevi
 *   1.Update: Multi charts for y-field group by type
 *
 * @update 2018-03-27 dondevi
 *   1.Rebuild
 * @update 2018-04-03 dondevi
 *   1.Optimize: Echarts with QPopover
 * @update 2018-04-04 dondevi
 *   1.Fixed: Echarts resize on popover showing
 */
-->

<template>
  <q-item highlight class="cursor-pointer">
    <!-- Icon -->
    <q-item-side :icon="icon" v-if="icon"/>
    <!-- Item -->
    <q-item-main>
      <q-item-tile label> {{ c_label }}
        <span class="float-right">{{ c_value }}</span>
      </q-item-tile>
      <q-item-tile sublabel v-for="y in c_yField" :key="y.name">
        <template v-if="y.label !== c_label">
          {{ y.label }}
          <span class="float-right">{{ y.value }}</span>
        </template>
      </q-item-tile>
      <slot name="tile"></slot>
    </q-item-main>
    <slot></slot>
    <!-- Popover -->
    <q-popover ref="popover" anchor="bottom right" self="bottom left" fit
               @show.once="resizeChart" @show="onPopoverShow" @hide="onPopoverHide" v-if="c_yField">
      <q-card color="blue-5">
        <q-card-title> {{ c_label }}
          <big slot="right">{{ c_value }}</big>
        </q-card-title>
        <q-card-main>
          <chart ref="chart" :option="option" theme="light" auto-resize/>
        </q-card-main>
        <q-card-separator/>
        <q-card-main @click.native="$refs.popover.hide">
          <template v-for="(y, i) in c_yField">
            {{y.label}}：{{ y.value }} <br>
          </template>
        </q-card-main>
      </q-card>
    </q-popover>

  </q-item>
</template>

<script>
  import { getLineChartOption } from "config/echarts.js";
  // import QItemRatio from "components/q-item-ratio.vue";
  import formatByte from "filters/formatByte.js";
  import formatDate from "filters/formatDate.js";
  export default {
    // components: { QItemRatio },
    props: {
      "icon": String,
      "label": String,
      "value": [Number, String, Function],
      "status": { type: Object, required: true },
      "records": Array,
      "xField": Object,
      "yField": { type: Array, required: true },
    },
    data () {
      return {
        needRenderChart: false,
        option: getLineChartOption({
          series: this.yField.map(y => {
            return { encode: { x: this.xField.name, y: y.name } };
          }),
        }),
      };
    },
    computed: {
      c_label () {
        return this.label || this.c_yField[0].label;
      },
      c_value () {
        const { label, value } = this.c_yField[0];
        return this.label === label && (this.value || value) || "";
      },
      c_yField () {
        return this.yField.map(y => {
          if (undefined === y.value) {
            y.value = this.status[y.name];
          }
          if (undefined === y.value) {
            y.value = "";
            return y;
          }
          let filter = { "byte": formatByte, "date": formatDate }[y.type];
          if (filter) {
            y.value = filter(y.value);
          }
          if (y.unit) {
            y.value += (/^\//.test(y.unit) ? "" : " ") + y.unit;
          }
          return y;
        });
      },
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
      onPopoverShow () {
        this.$refs.chart.startAnimation();
        if (this.needRenderChart) {
          this.renderChart();
        }
      },
      onPopoverHide () {
        this.$refs.chart.stopAnimation();
      },
      renderChart () {
        this.$refs.chart.setOption({ dataset: { source: this.records } });
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
  }
  .q-popover .q-card {
    margin: 0;
  }
</style>
