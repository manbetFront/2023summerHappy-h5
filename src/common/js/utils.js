import JSEncrypt from 'jsencrypt'
const __pubkey__ = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhSazxfY8JCDU4Ihza5VII7Ku4NpAbtYn8MMcHQCGdc8nauWKOeLqMO6+nrex+eirwo9Ac4v2FXli3nbj3BaCENHVOUBeVJQbbplUeUS8quei+ihgoQMLkc8pLDOdYt+XeH30XeRxHfQNx2fx4yUdWVLbpwzuQIP8ACh8Lx3rNteMTAosNVnkBUQAkJ3zmuY2N01IxlBRwZpdxmJPmWafKfoF535UVKT+bV9Ce7LRzWB1dF2X9b2/ektKgLifQd9o6laGX79f9CshZ9u0nT3XDvHnCF3rKfLYDgNfkwcCrMWeuJ7EVMW4Mx5VjY0pY0mxFi+t6NA5rk/IAPDstI3W0QIDAQAB`

// 全站加密
export const setEncrypt = (str = '', publicKey = __pubkey__) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(str);
}
// 判断是否为全站
export const isApp = () => {
  return !verifyUrlParams('username')
}
// 验证url传参
export const verifyUrlParams = (key, url = location.href) => {
  key = key.replace(/[\[\]]/g, "\\$&");
  const reg = new RegExp(`[\\?&]${key}(=([^&#]*)|&|#|$)`)
  return reg.exec(url)
}

export const getUsernameByPlatform = () => {
  // 初始化用户名
  let username = ''
  // 全站获取用户名
  if (isApp()) {
    if (window.ios) {
      username = window.ios.getUserName()
    }
    if (window.android) {
      username = window.android.getUserName()
    }
    // 加密
    if (username) {
      username = setEncrypt(username)
    }

  } else {// h5获取用户名
    let result = verifyUrlParams('username')
    console.log('result', result)
    // if (result && result[2]) {
    //   username = decodeURIComponent(result[2].replace(/\+/g, " "))
    // }
    if (result && result[2]) {
      username = result[2]
      if (username.indexOf('?noCache=') > -1) {
        username = username.split('?noCache=')[0]
      }
    }
    console.log(username)
  }
  return username
}

export const getUrlParams = (url = location.href) => {
  const Params = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    Params[key] = value
  })
  return Params
}

// 获取url中的传参
export const getQueryString = (name, url = location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}