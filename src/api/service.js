import axios from "axios";
import store from "@/store";
import { isApp } from 'dev-utils-pkg'

import { getUrlParams , getUsernameByPlatform} from "@/common/js/utils.js";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  async (config) => {
    try {
      config.headers["Authorization"] =  sessionStorage.username || getUrlParams().username || store.state.username || getUsernameByPlatform();
    } catch (e) {}
    
    config.headers["action"] = (isApp() || !!window.xcjsmanager) ? 'h5' : 'web'
    return config;
  },
  (error) => {
    // store.commit('setIsLoading', false)
    // do something with request error
    console.log(error); // for debug
    // Message({ type: "warning", message: error.message });
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    // store.commit('setIsLoading', false)
    const res = response.data;
    return res;
  },
  (error) => {
    // store.commit('setIsLoading', false)
    // Message({ type:'warning',message: error.message });
    return Promise.reject(error);
  }
);

export default service;
