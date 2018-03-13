/**
 * @author dondevi
 * @create 2018-03-07
 *
 * @update 2018-03-13 dondevi
 */

import { randomValue, randomInt } from "mock/modules/random.js";

const databases = [
  { name: "Database-1", ip: "192.168.111.102" },
  { name: "Database-2", ip: "192.168.111.103" },
  { name: "Database-3", ip: "192.168.111.104" },
  { name: "Database-4", ip: "192.168.111.105" },
];

const database = randomValue(0, 0, 3, -1, 1);
const connections = randomValue(1000, 10, 1000, -10, 10);
const traffic = randomValue(1000, 10, 1000, -10, 10);
const keyEfficiency = randomValue(1000, 10, 1000, -10, 10);
const innoDBBufferUsage = randomValue(10, 10, 100, -5, 5);
const selectsPerSecond = randomValue(100, 10, 1000, -10, 10);
const innoDBReadsPerSecond = randomValue(100, 10, 1000, -10, 10);
const innoDBWritesPerSecond = randomValue(100, 10, 1000, -10, 10);

export const getDatabaseInfo = (param, socket) => {
  return {
    // 检查时间
    "checkTime": Date.now(),
    // 数据库名称
    "dataBaseName": databases[database()].name,
    // 数据库IP
    "dataBaseIP": databases[database.value].ip,
    // 连接数
    "connections": connections(),
    // 流量(kb)
    "traffic": traffic(),
    // 效率
    "keyEfficiency": keyEfficiency(),
    // 缓冲区使用率
    "innoDBBufferUsage": innoDBBufferUsage(),
    // 操作执行耗时
    "selectsPerSecond": selectsPerSecond(),
    // 数据读操作耗时
    "innoDBReadsPerSecond": innoDBReadsPerSecond(),
    // 数据写操作耗时
    "innoDBWritesPerSecond": innoDBWritesPerSecond(),
  };
}
