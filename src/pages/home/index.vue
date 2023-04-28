<template>
  <div id="app">
    <h3 @click="isShow = true">点击</h3>

    <iframe v-if="isShow" id="myFrame" :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isShow: false,
      // url:
      //   "https://christmas-draw-h5.kgtindok.com/christmas-draw?uid=67&platform=ph&lang=en",
      // url:"http://10.99.200.168:8000/christmas-draw?uid=67&platform=vn&lang=EN",
    };
  },
  created() {},
  mounted() {
    //   获取并监听iframe传递来的数据
    window.addEventListener("message", (e) => {
      // console.log("ee", e);
      const data = e.data;
      if (data.show) {
        this.isShow = false;
      }
      if (data.goDetail) {
        this.$router.push("/christmas-draw");
      }
    });
  },

  methods: {},
};
</script>

<style lang="stylus" scoped>
#app {
  // color rgb(248, 248, 248)
  #myFrame{
    background-color:transparent;
    z-index:1;
    width:100vw;
    height:100vh;
    position:absolute;
    top:0;
    left:0;
  }
 .dialog-cover {
  background #000
  opacity 0.7
  position fixed
  z-index 999
  top 0
  left 0
  bottom 0
  right 0
}
.dialog-content {
  position fixed
  z-index 9999
  // background url('./img/msg-dialog-bg.png')
  background-size cover
  line-height 1.6
  left 50%
  top 50%
  transform translate3d(-50%, -50%, 0)
  min-height 200px
  // width 800px
  // height 632px
  width 80%
  height 60%
  color #6D220A
  .dialog-msg-wrapper {
    width 390px
    height 100%
    margin-left 290px
    padding-top 140px
  }
  h2 {
    text-align center
    font-size 36px
    margin-bottom 20px
  }
  .text {
    display flex
    justify-content center
    p {
      text-align left
      font-size 24px
      line-height 1.6
    }
  }
  .btn {
    position absolute
    bottom 68px
    left 39%
    transform scale(0.85)
  }
}


}
</style>
