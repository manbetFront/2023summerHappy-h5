export function _debounce(func, delay) {
  let delayTime = delay || 1000;
  let timer;
  return function() {
    let _ = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      timer = null;
      func.apply(_, args);
    }, delayTime);
  };
}

/**
 * 得到本周一、本周日、上周一、上周日的时间
 */
export function getMondayAndSunday() {
  var today = new Date();

  //构建当前日期,格式：2022-08-22 00:00:00
  var year = today.getFullYear(); //本年
  var month = today.getMonth() + 1; //本月
  var day = today.getDate(); //本日
  var newDate = new Date(year + "/" + month + "/" + day + " 00:00:00"); //年月日拼接

  var nowTime = newDate.getTime(); //当前的时间戳
  var weekDay = newDate.getDay(); //当前星期 0.1.2.3.4.5.6 【0 = 周日】

  var oneDayTime = 24 * 60 * 60 * 1000; //一天的总ms

  // 当前星期减去天数，如今天为周五，则本周一为周五的时间戳减去4天的时间戳。但周日特殊，周一至周六是周几的到的weekDay就是几，但是周日的到的为0，需特殊处理
  var thisWeekMondayTime = (1 - weekDay) * oneDayTime + nowTime; //本周一的时间戳
  if (weekDay == 0) {
    // weekDay = 0 为周日，此时本周一时间为周日减去6天的时间
    thisWeekMondayTime = nowTime - 6 * oneDayTime;
  }

  var thisWeekSundayTime = thisWeekMondayTime + 6 * 24 * 60 * 60 * 1000; // 本周日

  var lastWeekMondayTime = thisWeekMondayTime - 7 * oneDayTime; // 上周一
  var lastWeekSundayTime = thisWeekMondayTime - oneDayTime; // 上周日
  console.log(lastWeekSundayTime, dateToYYYYMMDD(lastWeekSundayTime));
  var res = {
    thisWeekMonday: dateToYYYYMMDD(thisWeekMondayTime),
    thisWeekSunday: dateToYYYYMMDD(thisWeekSundayTime),
    lastWeekMonday: dateToYYYYMMDD(lastWeekMondayTime),
    lastWeekSunday: dateToYYYYMMDD(lastWeekSundayTime),
  };
  return res;
}
// 返回 yyyy-MM-dd 格式字符串
function dateToYYYYMMDD(date) {
  var time = new Date(date);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  m = m > 9 ? m : "0" + m;
  var d = time.getDate();
  d = d > 9 ? d : "0" + d;

  return y + "/" + m + "/" + d;
}
export function judgeBrowser() {
  let isenv = "";
  // 先判断是不是微信端打开的
  if (/(micromessenger)/i.test(navigator.userAgent)) {
    // alert("微信");
    isenv = "wechat";
  } else {
    // alert("普通浏览器");
    // 判断h5还是pc true就是h5
    let client = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (client) {
      isenv = "h5";
    } else {
      isenv = "pc";
    }
  }
  return isenv;
}



export const toThousands = (number) => {
  // 数字转为字符串，并按照 .分割
  let arr = (number + "").split(".");
  let int = arr[0] + "";
  let fraction = arr[1] || "";
  // 多余的位数
  let f = int.length % 3;
  // 获取多余的位数，f可能是0， 即r可能是空字符串
  let r = int.substring(0, f);
  // 每三位添加','金额对应的字符
  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += "," + int.substring(f + i * 3, f + (i + 1) * 3);
  }
  // 多余的位数，上面
  if (f === 0) {
    r = r.substring(1);
  }
  // 调整部分和小数部分拼接
  return r + (!!fraction ? "." + fraction : "");
};


