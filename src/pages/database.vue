<!--
/**
 * @author dondevi
 * @create 2018-03-13
 */
-->

<template>
  <q-list no-border dark class="bg-dark">
    <q-list-header style="padding-right: 16px;"> 数据库概览
      <span class="float-right">{{ current.checkTime | formatDate }}</span>
    </q-list-header>
    <q-item>
      <q-item-side icon="language"/>
      <q-item-main>
        <q-item-tile label> 连接数
          <span class="float-right">{{ current.connections }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 最大连接数
          <span class="float-right">{{ current.max_connections }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 可用连接数
          <span class="float-right">{{ current.max_used_connections }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="opacity"/>
      <q-item-main>
        <q-item-tile label> 数据库流量 </q-item-tile>
        <q-item-tile sublabel> 总流速
          <span class="float-right">{{ current.bytes_traffic | formatByte }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 接收速率
          <span class="float-right">{{ current.bytes_received | formatByte }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 发送速率
          <span class="float-right">{{ current.bytes_sent | formatByte }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 每分钟流速
          <span class="float-right">{{ current.traffic }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-item>
      <q-item-side icon="timelapse"/>
      <q-item-main>
        <q-item-tile label> 键缓冲 </q-item-tile>
        <q-item-ratio label="使用率" is-tile
          :encode="{ x: 'checkTime', y: 'key_used_ratio' }"
          :history="history" :ratio="current.key_used_ratio"
          :total="+current.key_used + +current.key_free"
          :used="current.key_used"
          :free="current.key_free"/>
        <q-item-tile sublabel> 平均命中率
          <span class="float-right">{{ current.key_avg_hit_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 写命中率
          <span class="float-right">{{ current.key_write_hit_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 读命中率
          <span class="float-right">{{ current.key_read_hit_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 效率
          <span class="float-right">{{ current.key_efficiency }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-item>
      <q-item-side icon="filter_tilt_shift"/>
      <q-item-main>
        <q-item-tile label> 查询缓存 </q-item-tile>
        <q-item-tile sublabel> 使用率
          <span class="float-right">{{ current.qcache_used_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 碎片率
          <span class="float-right">{{ current.qcache_frag_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 命中率（查询比）
          <span class="float-right">{{ current.qcache_hit_select_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 命中率（插入比）
          <span class="float-right">{{ current.qcache_hits_inserts_ratio }} %</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="line_style"/>
      <q-item-main>
        <q-item-tile label> 线程缓存 </q-item-tile>
        <q-item-tile sublabel> 使用率
          <span class="float-right">{{ current.thread_cache_used_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 命中率
          <span class="float-right">{{ current.thread_cache_hit_ratio }} %</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="rounded_corner"/>
      <q-item-main>
        <q-item-tile label> 表缓存 </q-item-tile>
        <q-item-tile sublabel> 命中率
          <span class="float-right">{{ current.table_cache_hit_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 使用率
          <span class="float-right">{{ current.table_cache_used_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 表创建速度
          <span class="float-right">{{ current.opened_tables }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-item>
      <q-item-side icon="flip_to_front"/>
      <q-item-main>
        <q-item-tile label> 临时表创建 </q-item-tile>
        <q-item-tile sublabel> 内存临时表数量
          <span class="float-right">{{ current.created_tmp_tables }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 磁盘临时表数量
          <span class="float-right">{{ current.created_tmp_disk_tables }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 磁盘临时表占比
          <span class="float-right">{{ current.created_tmp_tables_on_disk_ratio }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 磁盘临时文件数量
          <span class="float-right">{{ current.created_tmp_files }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="search"/>
      <q-item-main>
        <q-item-tile label> MySQL 查询 </q-item-tile>
        <q-item-tile sublabel> 传入服务器并被执行的： </q-item-tile>
        <q-item-tile sublabel> Insert 语句
          <span class="float-right">{{ current.inserted }}</span>
        </q-item-tile>
        <q-item-tile sublabel> Update 语句
          <span class="float-right">{{ current.updated }}</span>
        </q-item-tile>
        <q-item-tile sublabel> Delete 语句
          <span class="float-right">{{ current.deleted }}</span>
        </q-item-tile>
        <q-item-tile sublabel> Select 语句
          <span class="float-right">{{ current.selected }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="sort"/>
      <q-item-main>
        <q-item-tile label> 排序操作 </q-item-tile>
        <q-item-tile sublabel> 总次数
          <span class="float-right">{{ current.sort_times }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item-separator/>

    <q-item>
      <q-item-side icon="pool"/>
      <q-item-main>
        <q-item-tile label> InnoDB 缓冲池 </q-item-tile>
        <q-item-tile sublabel> 使用率
          <span class="float-right">{{ current.innodb_buffer_pool_pages_usage }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 读命中率
          <span class="float-right">{{ current.innodb_buffer_pool_pages_read_hit_ratio }} %</span>
        </q-item-tile>
        <q-item-tile sublabel> 读次数（磁盘）
          <span class="float-right">{{ current.innodb_buffer_pool_reads }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 读次数（内存-随机）
          <span class="float-right">{{ current.innodb_buffer_pool_read_ahead_rnd }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 读次数（内存-顺序）
          <span class="float-right">{{ current.innodb_buffer_pool_read_ahead_seq }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 刷新次数
          <span class="float-right">{{ current.innodb_buffer_pool_pages_flushed }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 读请求次数
          <span class="float-right">{{ current.innodb_buffer_pool_read_requests }}</span>
        </q-item-tile>
        <q-item-tile sublabel> 写请求次数
          <span class="float-right">{{ current.innodb_buffer_pool_write_requests }}</span>
        </q-item-tile>
        <q-item-separator/>
        <q-item-tile sublabel> 已完成的： </q-item-tile>
        <q-item-tile sublabel> Insert 语句
          <span class="float-right">{{ current.innodb_rows_inserted }}</span>
        </q-item-tile>
        <q-item-tile sublabel> Update 语句
          <span class="float-right">{{ current.innodb_rows_updated }}</span>
        </q-item-tile>
        <q-item-tile sublabel> Delete 语句
          <span class="float-right">{{ current.innodb_rows_deleted }}</span>
        </q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  import { getDatabaseInfo as SOCKET_getDatabaseInfo } from "service";
  import QItemRatio from "components/q-item-ratio.vue";
  export default {
    components: { QItemRatio },
    data: () => ({
      current: {},
      history: [],
    }),
    mounted () {
      this.socket = this.refreshData();
    },
    destroyed () {
      this.socket.close();
    },
    methods: {
      refreshData () {
        return SOCKET_getDatabaseInfo(null, json => {
          this.current = json;
          if (60 <= this.history.length) {
            this.history.shift();
          }
          this.history.push(this.current);
        });
      },
    },
  };
</script>

<style scoped>
  .q-item-side {
    min-width: 0;
  }
  .q-popover {
    background: none;
  }
</style>
