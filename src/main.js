import Vue from "vue";
import router from "./router";
// import store from './store'
import App from "./App.vue";
import "@/common/stylus/index.styl";

// import vConsole from 'vconsole'
// new vConsole()

// 导入 vue-i18n 插件
import i18n from "./i18n";
import { Message } from "element-ui";

Vue.config.productionTip = false;
// Vue.prototype.loginTip = '登录即可参与ManBetX万博“中秋礼遇”专题活动！'
Vue.prototype.bus = new Vue(); //定义中央事件总线，所有组件与之通讯
Vue.prototype.$message = Message;

new Vue({
  // store,
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
