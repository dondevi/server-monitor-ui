/**
 * @see https://github.com/dbsid/db2_slob/blob/master/misc/mystat.pl
 *
 * @author dondevi
 * @create 2018-03-07
 *
 * @update 2018-03-13 dondevi
 * @update 2018-03-16 dondevi
 */

import { randomValue, randomInt } from "mock/modules/random.js";

const databases = [
  { name: "Database-1", ip: "192.168.111.102", id: "1" },
  { name: "Database-2", ip: "192.168.111.103", id: "2" },
  { name: "Database-3", ip: "192.168.111.104", id: "3" },
  { name: "Database-4", ip: "192.168.111.105", id: "4" },
];


const database = randomValue(0, 0, 3, -1, 1);
const key_used_ratio = randomValue(0, 5, 100, -10, 10);
const key_free_ratio = randomValue(100, 5, 100, -10, 10);
const key_used = randomValue(0, 1048576, 8388608, -1024, 1024);
const key_free = randomValue(8388608, 1048576, 8388608, -1024, 1024);
const key_write_hit_ratio = randomValue(92, 5, 100, -10, 10);
const key_read_hit_ratio = randomValue(99, 5, 100, -10, 10);
const key_avg_hit_ratio = randomValue(95.5, 5, 100, -10, 10);
const key_efficiency = randomValue(0.54, 0, 1, -0.1, 0.1);
const qcache_frag_ratio = randomValue(100, 5, 100, -10, 10);
const qcache_used_ratio = randomValue(1.6403198, 0, 100, -10, 10);
const qcache_hit_select_ratio = randomValue(0, 5, 100, -10, 10);
const qcache_hits_inserts_ratio = randomValue(0, 5, 100, -10, 10);
const thread_connections = randomValue(82, 5, 100, -10, 10);
const thread_cache_hit_ratio = randomValue(99, 5, 100, -10, 10);
const thread_cache_used_ratio = randomValue(44, 5, 100, -10, 10);
const table_cache_hit_ratio = randomValue(0, 5, 100, -10, 10);
const table_cache_used_ratio = randomValue(0, 5, 100, -10, 10);
const inserted = randomValue(49949, 1000, 99999, -500, 500);
const updated = randomValue(0, 5, 100, -50, 50);
const deleted = randomValue(3900, 100, 9999, -50, 50);
const selected = randomValue(13636994, 100000, 99999999, -5000, 5000);
const selects_perSecond = randomValue(13694, 1000, 999999, -500, 500);
const sort_times = randomValue(25707, 500, 99999, -250, 250);
const innodb_buffer_pool_pages_usage = randomValue(12.5, 5, 100, -10, 10);
const innodb_buffer_pool_pages_read_hit_ratio = randomValue(0.0057600364, 0, 1, -0.01, 0.01);
const max_connections = randomValue(1518769, 10000, 9999999, -1000, 1000);
const max_used_connections = randomValue(1001, 1000, 99999, -100, 100);
const traffic_all = randomValue(4652522, 1073741824, 1099511627776, -1048576, 1048576);
const bytes_received = randomValue(15134017854, 1073741824, 1099511627776, -1048576, 1048576);
const bytes_sent = randomValue(32528630802, 1073741824, 1099511627776, -1048576, 1048576);
const traffic_perSecond = randomValue(100, 10, 1000, -10, 10);
const opened_tables = randomValue(397013, 5000, 999999, -1000, 1000);
const created_tmp_tables = randomValue(1772451, 100, 99999, -10, 10);
const created_tmp_disk_tables = randomValue(46483, 100, 99999, -10, 10);
const created_tmp_files = randomValue(242, 10, 1000, -10, 10);
const created_tmp_tables_on_disk_ratio = randomValue(97, 5, 100, -10, 10);
const innodb_buffer_pool_reads = randomValue(10105, 1000, 99999, -100, 100);
const innodb_buffer_pool_read_ahead_rnd = randomValue(0, 5, 100, -10, 10);
const innodb_buffer_pool_read_ahead_seq = randomValue(0, 5, 100, -10, 10);
const innodb_buffer_pool_read_requests = randomValue(175432910, 100000, 999999999, -1000, 1000);
const innodb_buffer_pool_pages_flushed = randomValue(149982, 1000, 999999, -100, 100);
const innodb_buffer_pool_write_requests = randomValue(768770, 1000, 999999, -100, 100);
const innodb_rows_inserted = randomValue(37351, 1000, 99999, -100, 100);
const innodb_rows_updated = randomValue(29396, 1000, 99999, -100, 100);
const innodb_rows_deleted = randomValue(14774, 1000, 99999, -100, 100);
const innodb_pool_reads_perSecond = randomValue(100, 10, 1000, -10, 10);
const innodb_pool_writes_perSecond = randomValue(100, 10, 1000, -10, 10);

export const getDatabaseInfo = (param, socket) => {
  socket._delay = 5000;
  return {
    // 检查时间
    "checkTime": Date.now(),
    // 数据库名称
    "dataBaseName": databases[database.next()].name,
    // 数据库 IP
    "dataBaseIP": databases[database.now()].ip,
    // 数据库 ID
    "sourceID": databases[database.now()].id,
    // 效率
    "key_efficiency": key_efficiency.next(),
    // 键缓冲空间用过的最大使用率 (%)
    "key_used_ratio": key_used_ratio.next(),
    // 键缓冲空间空闲率 (%)
    "key_free_ratio": key_free_ratio.next(),
    // 键缓冲已用空间
    "key_used": key_used.next(),
    // 键缓冲空闲空间
    "key_free": key_free.next(),
    // 键缓冲写命中率 (%)
    "key_write_hit_ratio": key_write_hit_ratio.next(),
    // 键缓冲读命中率 (%)
    "key_read_hit_ratio": key_read_hit_ratio.next(),
    // 键缓冲读写平均命中率 (%)
    "key_avg_hit_ratio": key_avg_hit_ratio.next(),
    // 查询缓存空间碎片率 (%)
    "qcache_frag_ratio": qcache_frag_ratio.next(),
    // 查询缓存空间利用率 (%)
    "qcache_used_ratio": qcache_used_ratio.next(),
    // 查询缓存命中率 (%):查询比
    "qcache_hit_select_ratio": qcache_hit_select_ratio.next(),
    // 查询缓存命中率 (%):插入比
    "qcache_hits_inserts_ratio": qcache_hits_inserts_ratio.next(),
    // 线程缓存命中率 (%)
    "thread_cache_hit_ratio": thread_cache_hit_ratio.next(),
    // 线程缓存使用率 (%)
    "thread_cache_used_ratio": thread_cache_used_ratio.next(),
    // 当前线程连接数
    "thread_connections": thread_connections.next(),
    // 表缓存命中率 (%)
    "table_cache_hit_ratio": table_cache_hit_ratio.next(),
    // 表缓存使用率 (%)
    "table_cache_used_ratio": table_cache_used_ratio.next(),
    // 目前传入服务器并被执行的所有insert语句
    "inserted": inserted.next(),
    // 目前传入服务器并被执行的所有update语句
    "updated": updated.next(),
    // 目前传入服务器并被执行的所有delete语句
    "deleted": deleted.next(),
    // 目前传入服务器并被执行的所有select语句
    "selected": selected.next(),
    // selects 每秒的查询状态 (kb/s)
    "selects_perSecond": selects_perSecond.next(),
    // 所有排序操作总次数
    "sort_times": sort_times.next(),
    // 缓冲池利用率
    "innodb_buffer_pool_pages_usage": innodb_buffer_pool_pages_usage.next(),
    // 缓冲池命中率 (%)
    "innodb_buffer_pool_pages_read_hit_ratio": innodb_buffer_pool_pages_read_hit_ratio.next(),
    // 最大连接数
    "max_connections": max_connections.next(),
    // 可用连接数
    "max_used_connections": max_used_connections.next(),
    // 当前数据库总流速 (kb)
    "traffic_all": traffic_all.next(),
    // 每秒流量 (kb/s)
    "traffic_perSecond": traffic_perSecond.next(),
    // 当前数据库接收速率 (kb)
    "bytes_received": bytes_received.next(),
    // 当前数据库发送速率 (kb)
    "bytes_sent": bytes_sent.next(),
    // 表创建速度
    "opened_tables": opened_tables.next(),
    // 创建内存临时表的数量
    "created_tmp_tables": created_tmp_tables.next(),
    // 创建磁盘临时表的数量
    "created_tmp_disk_tables": created_tmp_disk_tables.next(),
    // 创建磁盘临时文件的数量
    "created_tmp_files": created_tmp_files.next(),
    // 创建磁盘临时表占临时表的比例
    "created_tmp_tables_on_disk_ratio": created_tmp_tables_on_disk_ratio.next(),
    // 从磁盘中读取次数
    "innodb_buffer_pool_reads": innodb_buffer_pool_reads.next(),
    // 从内存中随机读取次数
    "innodb_buffer_pool_read_ahead_rnd": innodb_buffer_pool_read_ahead_rnd.next(),
    // 从内存中顺序读取次数
    "innodb_buffer_pool_read_ahead_seq": innodb_buffer_pool_read_ahead_seq.next(),
    // 读取请求次数
    "innodb_buffer_pool_read_requests": innodb_buffer_pool_read_requests.next(),
    // 刷新次数
    "innodb_buffer_pool_pages_flushed": innodb_buffer_pool_pages_flushed.next(),
    // 写请求数量
    "innodb_buffer_pool_write_requests": innodb_buffer_pool_write_requests.next(),
    // 已经完成的insert语句数量
    "innodb_rows_inserted": innodb_rows_inserted.next(),
    // 已经完成的update语句数量
    "innodb_rows_updated": innodb_rows_updated.next(),
    // 已经完成的delete语句数量
    "innodb_rows_deleted": innodb_rows_deleted.next(),
    // 数据读操作耗时 (kb/s)
    "innodb_pool_reads_perSecond": innodb_pool_reads_perSecond.next(),
    // 数据写操作耗时 (kb/s)
    "innodb_pool_writes_perSecond": innodb_pool_writes_perSecond.next(),
  };
}
