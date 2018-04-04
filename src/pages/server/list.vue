<!--
/**
 * =============================================================================
 *  System Environment Status
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-02
 *
 * @update 2018-03-27 dondevi
 *   1.Update: <q-item-group>
 * @update 2018-04-04 dondevi
 *   1.Move: This file to `pages/server/list.vue`
 *   2.Move: Detail codes to `pages/server/detail.vue`
 *   3.Optimize: Move `<q-popover>` out of `v-for` to reduce DOM !
 *   4.Optimize: Unobserved values in `records` !
 */
-->

<template>
  <section>
    <q-list class="bg-dark q-mb-md" no-border dark link>
      <q-list-header> 服务器 </q-list-header>
      <!-- Item -->
      <q-item v-for="server in servers" :key="server.sourceName"
              @click.native="switchDatabase($event, server)">
        <q-tooltip>{{ server.sourceIP }}</q-tooltip>
        <q-item-side icon="lens" :color="server.color"/>
        <!-- <q-item-side icon="dock" :color="server.color"/> -->
        <q-item-main>
          <q-item-tile label> {{ server.sourceName }} </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <!-- Detail -->
    <q-popover ref="popover" :anchor-click="false"
               anchor="bottom right" self="bottom left" max-height="90vh" fit>
      <com-server-detail :current="current"/>
    </q-popover>
  </section>
</template>

<script>
  import service from "service";
  import comServerDetail from "pages/server/detail.vue";
  export default {
    components: { comServerDetail },
    data: () => ({
      current: null,
      servers: {},
      pieces: [
        { min: -Infinity, max: 0, color: "blue-3" },
        { min: 0, max: 70, color: "green-5" },
        { min: 70, max: 90, color: "orange-5" },
        { min: 90, max: 100, color: "red-5" },
      ],
    }),
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
      refreshData () {
        return service.socket.getSystemInfo(null, json => {
          let { sourceID, sourceName, sourceIP } = json;
          let server = this.servers[sourceID];
          // server
          if (!server) {
            server = { status: {}, records: [] };
            this.$set(this.servers, sourceID, server);
            // Don't need to be Obervered
            Object.assign(server, { sourceID, sourceName, sourceIP });
          }
          // Status
          let {
            usedPhysicalMemorySize, totalPhysicalMemorySize,
            usedDiskSize, totalDiskSize,
            jvmUsingMemory, jvmMaxMemory,
          } = json;
          json.memRatio = ~~(usedPhysicalMemorySize / totalPhysicalMemorySize * 100);
          json.diskRatio = ~~(usedDiskSize / totalDiskSize * 100);
          json.jvmMemRatio = ~~(jvmUsingMemory / jvmMaxMemory * 100);
          server.status = Object.assign({}, json);
          // Color
          let { cpuRatio, memRatio, diskRatio, jvmMemRatio } = json;
          let maxRatio = Math.max(cpuRatio, memRatio, diskRatio, jvmMemRatio);
          server.color = this.getPieceColor(maxRatio);
          // Records
          unobservedPush(server.records, json, 60);
        });
      },
      switchDatabase (event, current) {
        this.current = current;
        /**
         * Hack for reposition
         * @see quasar-framework@0.15.10/src/components/popover/QPopover.js
         */
        this.$refs.popover.anchorEl = event.currentTarget || event.srcElement;
        this.$refs.popover.toggle();
      },
    },
  };

  /**
   * Hack: Push unobserved value to observed array with limit
   * @see vue@2.5/src/core/observer/array.js
   * @param  {Array}  observedArray
   * @param  {Object} unobservedValue
   * @param  {Number} limit
   */
  function unobservedPush (observedArray, unobservedValue, limit = 60) {
    let { length } = observedArray;
    observedArray[length] = unobservedValue;
    length > limit ? observedArray.shift()
                   : observedArray.__ob__.dep.notify();
  }
</script>

<style scoped>
  .q-popover {
    background: none;
  }
</style>
