/**
 * @author dondevi
 * @create 2018-02-05
 */

let serverName = "Server 1";
let jvmMaxMemory = 2739712;
let totalPhysicalMemorySize = 12328484;
let totalDiskSize = 41153856;

let cpuRatio = Math.random() * 70 - 10;
let jvmUseingMemory = 548864;
let usedPhysicalMemorySize = 12108668;
let usedDiskSize = 31323264;
let totalThread = 118;

export const getResourceState = (param, server) => {
  server.time = 5000;
  cpuRatio = randomValue(cpuRatio, 10, 80, -10, 10);
  jvmUseingMemory = randomValue(jvmUseingMemory, 102400, jvmMaxMemory - 512000, -102400, 102400);
  usedPhysicalMemorySize = randomValue(usedPhysicalMemorySize, 102400, totalPhysicalMemorySize - 512000, -512000, 512000);
  usedDiskSize = randomValue(usedDiskSize, 102400, totalDiskSize - 512000, -512000, 512000);
  totalThread = randomValue(totalThread, 20, Infinity, -20, 20);
  return {
    // 检查时间
    checkTime: Date.now(),
    // 服务名称
    serverName,
    // CPU使用率
    cpuRatio,
    // jvm最大可用内存（kb）
    jvmMaxMemory,
    // jvm剩余可使用内存
    jvmFreeMemory: jvmMaxMemory - jvmUseingMemory,
    // jvm目前占用内存
    jvmUseingMemory,
    // 总物理内存
    totalPhysicalMemorySize,
    // 剩余物理内存
    freePhysicalMemorySize: totalPhysicalMemorySize - usedPhysicalMemorySize,
    // 已使用物理内存
    usedPhysicalMemorySize,
    // 总物理磁盘
    totalDiskSize,
    // 剩余物理磁盘
    freeDiskSize: totalDiskSize - usedDiskSize,
    // 已使用物理磁盘
    usedDiskSize,
    // 线程总数
    totalThread,
    // 是否需要告警
    hasWarning: false,
    // 告警等级
    level: 0,
  };
};

function randomValue (value, min = 10, max = 100, minRandom = -10, maxRandom = 10) {
  value = value + Math.random() * (maxRandom - minRandom) + minRandom;
  value = Math.max(value, min);
  value = Math.min(value, max);
  return Math.round(value);
}
