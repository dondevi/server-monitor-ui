/**
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2108-03-08 dondevi
 *   1.Update: data structure
 *   2.Update: randomValue() to curry function
 */

import { randomValue, randomInt } from "mock/modules/random.js";

const servers = [
  { name: "Server-1", ip: "192.168.112.101" },
  { name: "Server-2", ip: "192.168.112.102" },
  { name: "Server-3", ip: "192.168.112.103" },
];

// Fixed value
const jvmMaxMemory = 2739712;
const totalPhysicalMemorySize = 12328484;
const totalDiskSize = 41153856;

// Computed value
const server = randomValue(0, 0, 2, -1, 1);
const cpuRatio = randomValue(randomInt(10, 80), 5, 90, -20, 20);
const jvmUsingMemory = randomValue(548864, 102400, jvmMaxMemory - 512000, -51200, 51200);
const usedPhysicalMemorySize = randomValue(12108668, 102400, totalPhysicalMemorySize - 512000, -102400, 102400);
const usedDiskSize = randomValue(31323264, 102400, totalDiskSize - 512000, -256000, 256000);
const totalThread = randomValue(118, 20, Infinity, -20, 20);
const innerServerPing = randomValue(100, 20, Infinity, -20, 20);
const remoteServerPing = randomValue(100, 20, Infinity, -20, 20);
const netEstablished = randomValue(100, 20, Infinity, -20, 20);
const netCloseWait = randomValue(100, 20, Infinity, -20, 20);
const netTimeWait = randomValue(100, 20, Infinity, -20, 20);

export const getSystemInfo = (param, socket) => {
  socket._delay = 5000;
  return {
    // 检查时间
    "checkTime": Date.now(),
    // 服务器名称
    "serverName": servers[server.next()].name,
    // 服务器IP
    "serverIP": servers[server.now()].ip,
    // jvm最大可使用内存(kb)
    "jvmMaxMemory": jvmMaxMemory,
    // jvm目前占用的内存(kb)
    "jvmUsingMemory": jvmUsingMemory.next(),
    // jvm剩余可使用内存(kb)
    "jvmFreeMemory": jvmMaxMemory - jvmUsingMemory.now(),
    // cpu使用率
    "cpuRatio": cpuRatio.next(),
    // 总物理内存(kb)
    "totalPhysicalMemorySize": totalPhysicalMemorySize,
    // 已使用的物理内存(kb)
    "usedPhysicalMemorySize": usedPhysicalMemorySize.next(),
    // 剩余物理内存(kb)
    "freePhysicalMemorySize": totalPhysicalMemorySize - usedPhysicalMemorySize.now(),
    // 总物理磁盘(kb)
    "totalDiskSize": totalDiskSize,
    // 已使用的物理磁盘(kb)
    "usedDiskSize": usedDiskSize.next(),
    // 剩余物理磁盘(kb)
    "freeDiskSize": totalDiskSize - usedDiskSize.now(),
    // 线程总数
    "totalThread": totalThread.next(),
    // 内部服务ping值
    "innerServerPing": innerServerPing.next(),
    // 远程服务ping值
    "remoteServerPing": remoteServerPing.next(),
    // 网络连接数
    "netEstablished": netEstablished.next(),
    // 网络连接关闭数
    "netCloseWait": netCloseWait.next(),
    // 网络连接等待数
    "netTimeWait": netTimeWait.next(),
  };
};
