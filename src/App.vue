<template>
  <div id="app">
    <!-- <vue-login-tool :env-type-num="2" v-if="isShowComponents" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowComponents: true,
    };
  },
  created() {
    if (process.env.VUE_APP_TITLE === "PROD") {
      this.isShowComponents = false;
    }
    sessionStorage.setItem("isfirst", 1);
  },
};
</script>

<style lang="stylus" scoped>
#app {

}
</style>
