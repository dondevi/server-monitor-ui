<!--
/**
 * =============================================================================
 *  Database detail
 *  Show current status
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-04-04
 */
-->
<template>
  <q-list no-border dark class="bg-dark" v-if="current">
    <q-list-header> {{ current.dataBaseName }}
      <span class="float-right on-left">
        {{ current.status.checkTime | formatDate }}
      </span>
    </q-list-header>

    <q-item-group label="连接数" icon="language"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '最大', name: 'max_connections' },
        { label: '可用', name: 'max_used_connections' },
      ]"/>
    <q-item-group label="总流量" icon="opacity"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '总流量', name: 'traffic_all', type: 'byte' },
        { label: '接收', name: 'bytes_received', type: 'byte' },
        { label: '发送', name: 'bytes_sent', type: 'byte' },
        { label: '每秒', name: 'traffic_perSecond', type: 'byte', unit: '/s' },
      ]"/>

    <q-item-separator/>

    <q-item-group label="键缓冲" icon="timelapse"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '使用率', name: 'key_used_ratio', unit: '%',
          ratio: { used: 'key_used', free: 'key_free', total: 'key_total' },
        },
        { label: '平均命中率', name: 'key_avg_hit_ratio', unit: '%' },
        { label: '写命中率', name: 'key_write_hit_ratio', unit: '%' },
        { label: '读命中率', name: 'key_read_hit_ratio', unit: '%' },
        { label: '效率', name: 'key_efficiency', unit: '%' },
      ]"/>

    <q-item-separator/>

    <q-item-group label="查询缓存" icon="filter_tilt_shift"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '使用率', name: 'qcache_used_ratio', unit: '%' },
        { label: '命中率（查询比）', name: 'qcache_hit_select_ratio', unit: '%' },
        { label: '命中率（插入比）', name: 'qcache_hits_inserts_ratio', unit: '%' },
        { label: '碎片率', name: 'qcache_frag_ratio', unit: '%' },
      ]"/>
    <q-item-group label="线程缓存" icon="line_style"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '使用率', name: 'thread_cache_used_ratio', unit: '%' },
        { label: '命中率', name: 'thread_cache_hit_ratio', unit: '%' },
        { label: '连接数', name: 'thread_connections' },
      ]"/>
    <q-item-group label="表缓存" icon="rounded_corner"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '使用率', name: 'table_cache_used_ratio', unit: '%' },
        { label: '命中率', name: 'table_cache_hit_ratio', unit: '%' },
        { label: '表创建速度', name: 'opened_tables' },
      ]"/>

    <q-item-separator/>

    <q-item-group label="临时表创建" icon="flip_to_front"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '内存临时表数量', name: 'created_tmp_tables' },
        { label: '磁盘临时表数量', name: 'created_tmp_disk_tables' },
        { label: '磁盘临时表占比', name: 'created_tmp_tables_on_disk_ratio', unit: '%' },
        { label: '磁盘临时文件数量', name: 'created_tmp_files' },
      ]"/>
    <q-item-group label="MySQL 查询" icon="search"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: 'Insert 语句', name: 'inserted' },
        { label: 'Update 语句', name: 'updated' },
        { label: 'Delete 语句', name: 'deleted' },
        { label: 'Select 语句', name: 'selected' },
        { label: 'Select 查询状态', name: 'selects_perSecond', unit: 'kb/s' },
      ]">
      <!-- <q-tooltip>传入服务器并被执行的语句</q-tooltip> -->
    </q-item-group>
    <q-item-group label="排序操作" icon="sort"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '总次数', name: 'sort_times' },
      ]"/>

    <q-item-separator/>

    <q-item-group label="InnoDB 缓冲池" icon="pool"
      :status="current.status"
      :records="current.records"
      :x-field="{ name: 'checkTime' }"
      :y-field="[
        { label: '使用率', name: 'innodb_buffer_pool_pages_usage', unit: '%' },
        { label: '读命中率', name: 'innodb_buffer_pool_pages_read_hit_ratio', unit: '%' },
        { label: '读次数（磁盘）', name: 'innodb_buffer_pool_reads' },
        { label: '读次数（内存-随机）', name: 'innodb_buffer_pool_read_ahead_rnd' },
        { label: '读次数（内存-顺序）', name: 'innodb_buffer_pool_read_ahead_seq' },
        { label: '刷新次数', name: 'innodb_buffer_pool_pages_flushed' },
        { label: '读请求次数', name: 'innodb_buffer_pool_read_requests' },
        { label: '写请求次数', name: 'innodb_buffer_pool_write_requests' },
        { label: '数据读操作耗时', name: 'innodb_pool_reads_perSecond', unit: 'KB/s' },
        { label: '数据写操作耗时', name: 'innodb_pool_reads_perSecond', unit: 'KB/s' },
        { label: '已完成的 Insert 语句', name: 'innodb_rows_inserted' },
        { label: '已完成的 Update 语句', name: 'innodb_rows_updated' },
        { label: '已完成的 Delete 语句', name: 'innodb_rows_deleted' },
      ]"/>
  </q-list>
</template>

<script>
  import QItemRatio from "components/q-item-ratio.vue";
  import QItemGroup from "components/q-item-group.vue";
  export default {
    components: { QItemRatio, QItemGroup },
    props: {
      current: Object,
    },
  };
</script>
