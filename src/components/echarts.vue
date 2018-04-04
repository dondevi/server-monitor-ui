<!--
/**
 * =============================================================================
 *  Echarts
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-09
 *
 * @update 2018-04-03 dondevi
 *   1.Add: zrender, startAnimation(), stopAnimation()
 */
-->

<template>
  <div class="echarts"></div>
</template>

<script>
  import echarts from "echarts/lib/echarts";
  import "echarts/lib/component/tooltip";
  import "echarts/lib/component/grid";
  import "echarts/lib/component/dataset";
  import "echarts/lib/chart/line";
  import "echarts/lib/chart/bar";
  // import "echarts/lib/chart/pie";
  export default {
    props: {
      option: Object,
      theme: [String, Object],
      initOption: Object,
      autoResize: Boolean,
    },
    data: () => ({
      chart: null,
      zrender: null,
    }),
    mounted () {
      if (this.option) {
        this.chart = echarts.init(this.$el, this.theme, this.initOption);
        this.zrender = this.chart.getZr();
        this.setOption(this.option);
      }
    },
    beforDetroy () {
      this.chart && this.chart.dispose();
      this.chart = null;
    },
    methods: {
      setOption () {
        this.chart && this.chart.setOption(...arguments);
      },
      resize () {
        this.chart && this.chart.resize(...arguments);
      },
      /**
       * Hack for fixing memory leak
       * @see zrender@4..3/lib/zrender.js
       * @see zrender@4..3/lib/animation/Animation.js
       */
      stopAnimation () {
        this.zrender && this.zrender.animation.stop();
      },
      startAnimation () {
        this.zrender && this.zrender.animation.start();
      },
    },
  };
</script>

<style>
  .echarts {
    display: block;
    height: 150px;
  }
</style>
