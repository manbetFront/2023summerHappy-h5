import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "@/common/stylus/index.styl";
import vueLoginTool from "vue-login-tool";
import vConsole from "vconsole";
if (process.env.VUE_APP_TITLE !== "PROD") {
  new vConsole();
}

import { getUrlParams } from "@/common/js/utils";
// 导入 vue-i18n 插件
import i18n from "./i18n";
import { Message } from "element-ui";
if (process.env.VUE_APP_TITLE !== "PROD") {
  Vue.use(vueLoginTool);
}
Vue.config.productionTip = false;
// Vue.prototype.loginTip = '登录即可参与ManBetX万博“中秋礼遇”专题活动！'
Vue.prototype.bus = new Vue(); //定义中央事件总线，所有组件与之通讯
Vue.prototype.$message = Message;

new Vue({
  store,
  router,
  i18n,
  created() {
    const obj = getUrlParams(window.location.href);
    const username = obj.username;
    if (username) {
      sessionStorage.setItem("username", username);
      store.commit("SET_USERNAME", username);
    } else {
      sessionStorage.setItem("username", "");
    }
    Vue.prototype.$username = username;
    Vue.prototype.$setting = "";
  },
  render: (h) => h(App),
}).$mount("#app");
