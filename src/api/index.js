import service from "./service";

// 活动主题
export const cumulativeTheme = () => {
  return service({
    method: "get",
    url: "/api/index",
  });
};
// 主题一派发记录
export const getReceiveList = (params) => {
  return service({
    method: "get",
    url: "/api/list",
    params: { ...params },
  });
};
// 主题二派发记录
export const getThemeList = (params) => {
  return service({
    method: "get",
    url: "/api/activity_list",
    params: { ...params },
  });
};

// 领取本周
export const getNowWeekMoney = () => {
  return service({
    method: "post",
    url: "/api/draw",
  });
};

// 领取上周
export const getSubWeekMoney = () => {
  return service({
    method: "post",
    url: "/api/draw_sub_week",
  });
};
// 领取活动嘉奖
export const getAwardCommen = () => {
  return service({
    method: "post",
    url: "/api/draw_activity",
  });
};
