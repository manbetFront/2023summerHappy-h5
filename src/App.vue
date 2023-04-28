<template>
  <div id="app">
    <transition name="fade">
      <div>
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  // watch: {
  //   "$i18n.locale"(newVal, oldVal) {
  //     console.log("app", newVal, oldVal);
  //     if (newVal !== oldVal) {
  //       location.reload();
  //     }
  //   },
  // },
};
</script>

<style lang="stylus" scoped>
#app {

}
</style>
