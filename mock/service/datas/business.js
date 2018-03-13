/**
 * @author dondevi
 * @create 2018-02-06
 */

export const getStatistics = (param, socket) => {
  socket._delay = false;
  return {
    // 检查时间
    "checkTime": Date.now(),
    // 当前递交量
    "currentSubmit": 10,
    // 当前合格量
    "currentQualified": 5,
    // 当前不合格量
    "currentUnqualified": 2,
    // 总递交量
    "totalSubmit": 100,
    // 总合格量
    "totalQualified": 50,
    // 总不合格量
    "totalUnqualified": 20,
    // 机审平均操作耗时
    "machinePerSeconds": 100,
    // 机审操作最长耗时
    "machineMaxConsume": 300,
    // 机审操作最短耗时
    "machineMinConsume": 10,
    // 人审平均操作耗时
    "humenPerSeconds": 700,
    // 人审操作最长耗时
    "humenMaxConsume": 2000,
    // 人审操作最短耗时
    "humenMinConsume": 100,
    // 终审平均操作耗时
    "finalPerSeconds": 300,
    // 终审操作最长耗时
    "finalMaxConsume": 1000,
    // 终审操作最短耗时
    "finalMinConsume": 100,
  };
};
