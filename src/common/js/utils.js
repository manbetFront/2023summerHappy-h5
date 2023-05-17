import JSEncrypt from "jsencrypt";
const __pubkey__ = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhSazxfY8JCDU4Ihza5VII7Ku4NpAbtYn8MMcHQCGdc8nauWKOeLqMO6+nrex+eirwo9Ac4v2FXli3nbj3BaCENHVOUBeVJQbbplUeUS8quei+ihgoQMLkc8pLDOdYt+XeH30XeRxHfQNx2fx4yUdWVLbpwzuQIP8ACh8Lx3rNteMTAosNVnkBUQAkJ3zmuY2N01IxlBRwZpdxmJPmWafKfoF535UVKT+bV9Ce7LRzWB1dF2X9b2/ektKgLifQd9o6laGX79f9CshZ9u0nT3XDvHnCF3rKfLYDgNfkwcCrMWeuJ7EVMW4Mx5VjY0pY0mxFi+t6NA5rk/IAPDstI3W0QIDAQAB`;

// 全站加密
export const setEncrypt = (str = "", publicKey = __pubkey__) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(str);
};
// 判断是否为全站
export const isApp = () => {
  return !verifyUrlParams("username");
};
// 验证url传参
export const verifyUrlParams = (key, url = location.href) => {
  key = key.replace(/[\[\]]/g, "\\$&");
  const reg = new RegExp(`[\\?&]${key}(=([^&#]*)|&|#|$)`);
  return reg.exec(url);
};

export const getUsernameByPlatform = () => {
  // 初始化用户名
  let username = "";
  // 全站获取用户名
  if (isApp()) {
    if (window.ios) {
      username = window.ios.getUserName();
    }
    if (window.android) {
      username = window.android.getUserName();
    }
    // 加密
    if (username) {
      username = setEncrypt(username);
    }
  } else {
    // h5获取用户名
    let result = verifyUrlParams("username");
    console.log("result", result);
    // if (result && result[2]) {
    //   username = decodeURIComponent(result[2].replace(/\+/g, " "))
    // }
    if (result && result[2]) {
      username = result[2];
      if (username.indexOf("?noCache=") > -1) {
        username = username.split("?noCache=")[0];
      }
    }
    console.log(username);
  }
  return username;
};

export const getUrlParams = (url = location.href) => {
  const Params = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    Params[key] = value;
  });
  return Params;
};

// 获取url中的传参
export const getQueryString = (name, url = location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const format_with_substring = (number) => {
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
