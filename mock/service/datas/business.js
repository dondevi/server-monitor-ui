/**
 * @author dondevi
 * @create 2018-02-06
 */

export const getBusinessList = (param, server) => {
  server.time = false;
  return {
    // 当天递交量
    submit: 100,
    // 当天合格量
    qualified: 30,
    // 正在处理量
    processing: 20,
    // 当天不合格量
    unqualified: 50,
    // 不合格总量
    totalUnqualified: 1500,
    // 合格总量
    totalQualified: 1000,
  };
};
