import { mapGetters, mapMutations } from 'vuex'
export const goToTopModule = {
  methods: {
    goUp() {
      let nowTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop // 获取当前滚动条位置
      if (nowTop > 0) {
        window.requestAnimationFrame(this.goUp)
        window.scrollTo(0, nowTop - nowTop / 5)
      }
    }
  }
}

export const getUserNameModule = {
  data() {
    return {
      username: ''
    }
  },
  created() {
    // 监听customGetUserNameEventName事件获取用户名
    this.bus.$on(this.customGetUserNameEventName, username => {
      console.log('username',username)
      this.username = username
    })
  },
  methods: {
    goToLogin() {
      window.open('https://m.mxweiersi.com/account/login')
    }
  }
}
