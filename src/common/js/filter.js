import Vue from 'vue'
Vue.filter('state', function (value) {
  // 1进行中，2未开赛，3已结束
  switch (value) {
    case 1:
      return '进行中'
    case 2:
      return '未开始'
    case 3:
      return '已结束'
  }
})