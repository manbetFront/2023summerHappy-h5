import service from "./service";
// 领取记录
export const getReceiveList = (params) => {
  return service({
    method: "get",
    url: "/api/new_year/receive/list",
    params: {
      ...params,
    },
  });
};

// 领取彩金
export const getMoneyAdd = (data) => {
  return service({
    method: "post",
    url: "/api/new_year/receive/add",
    data,
  });
};

// 活动主题
export const cumulativeTheme = () => {
  return service({
    method: "get",
    url: "/api/index",
  });
};

// 解锁
export const getunlock = (data) => {
  return service({
    method: "post",
    url: "/api/new_year/receive/unlock",
    data,
  });
};
