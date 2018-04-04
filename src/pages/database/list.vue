<!--
/**
 * =============================================================================
 *  Database list
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-03-13
 *
 * @update 2018-03-27 dondevi
 *   1.Update: <q-item-group>
 * @update 2018-04-04 dondevi
 *   1.Move: This file to `pages/database/list.vue`
 *   2.Move: Detail codes to `pages/database/detail.vue`
 *   3.Optimize: Move `<q-popover>` out of `v-for` to reduce DOM !
 *   4.Optimize: Unobserved values in `records` !
 */
-->

<template>
  <section>
    <q-list class="bg-dark q-mb-md" no-border dark link>
      <q-list-header> 数据库 </q-list-header>
      <!-- Item -->
      <q-item v-for="database in databases" :key="database.dataBaseName"
              @click.native="switchDatabase($event, database)">
        <q-tooltip>{{ database.dataBaseIP }}</q-tooltip>
        <q-item-side icon="storage" :color="database.color"/>
        <q-item-main>
          <q-item-tile label> {{ database.dataBaseName }} </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <!-- Detail -->
    <q-popover ref="popover" :anchor-click="false"
               anchor="bottom right" self="bottom left" max-height="90vh" fit>
      <com-database-detail :current="current"/>
    </q-popover>
  </section>
</template>

<script>
  import service from "service";
  import comDatabaseDetail from "pages/database/detail.vue";
  export default {
    components: { comDatabaseDetail },
    data: () => ({
      current: null,
      databases: {},
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      refreshData () {
        return service.socket.getDatabaseInfo(null, json => {
          let { sourceID, dataBaseName, dataBaseIP } = json;
          let database = this.databases[sourceID];
          // Database
          if (!database) {
            database = { status: {}, records: [] };
            this.$set(this.databases, sourceID, database);
            // Don't need to be Obervered
            Object.assign(database, { sourceID, dataBaseName, dataBaseIP });
          }
          // Status
          let { key_used, key_free } = json;
          json.key_total = key_used + key_free;
          database.status = Object.assign({}, json);
          // Records
          unobservedPush(database.records, json, 60);
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
