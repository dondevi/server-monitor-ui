<!--
/**
 * @author dondevi
 * @create 2018-03-09
 */
-->

<template>
  <div class="echarts"></div>
</template>

<script>
  import echarts from "echarts/lib/echarts";

  export default {
    props: {
      option: Object,
      theme: [String, Object],
      initOption: Object,
      autoResize: Boolean,
    },
    data: () => ({
      chart: null,
    }),
    mounted () {
      if (this.option) {
        this.chart = echarts.init(this.$el, this.theme, this.initOption);
        this.chart.setOption(this.option);
      }
    },
    beforDetroy () {
      this.chart && this.chart.dispose();
    },
    methods: {
      setOption () {
        this.chart && this.chart.setOption(...arguments);
      },
      resize () {
        this.chart && this.chart.resize(...arguments);
      },
      onResize (size) {
        console.log(size)
      },
    },
  };
</script>

<style>
  .echarts {
    display: block;
    height: 400px;
  }
</style>
