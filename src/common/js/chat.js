// import md5 from 'js-md5'
// // import { getUserInfo } from '@/api'
// import { getQueryString } from '@/common/js/utils'
// export const chatRoom = {
//   mounted() {
//     if (process.env.VUE_APP_TITLE === 'PROD') { //正式环境
//       this.getUserInfoApi = `https://ws.fblivec.com/api/userImg`

//     } else {// 测试环境
//       this.getUserInfoApi = `https://ws.blivec.com/api/userImg`
//     }
//     this.app_key = 'cSb3ys6027sSUKW1F7M4aaBSKL8Lxw8p'
//   },
//   methods: {
//     // 初始化聊天室
//     async initChatSDK() {
//       // 清空聊天室
//       document.querySelector('#chat-room').innerHTML = ''
//       // 获取用户名与头像
//       let userInfo = {
//         username: 'test',
//         profileimg: '',
//       }
//       try {
//         userInfo = await this.getUserInfo()
//       } catch (err) {
//         console.log(err)
//       }

//       console.log(userInfo)
//       // 处理初始化数据
//       let test_Data = {
//         app_id: '1',
//         timestamp: Date.now(),
//         merchant_chat_id: this.currentVideoItem.content.matchId.toString(),
//         name: this.processStr(this.currentVideoItem.content.lfullname || this.currentVideoItem.content.lname),
//         start_at: ``,
//         end_at: '',
//         out_user_account: userInfo.username,
//         avatar_url: userInfo.profileimg || (window.location.origin + '/' + require('@/common/image/icon.png')),
//         merchant_key: this.app_key
//       }
//       // console.log(test_Data)
//       let parts = []
//       Object.keys(test_Data).forEach(key => {
//         let val = test_Data[key]
//         parts.push(`${key}=${val || ''}`)
//       })
//       parts = parts.sort()
//       let serializedParams = parts.join('&')
//       // console.log(`serializedParams:${serializedParams}`)
//       let sign = md5(serializedParams + this.app_key)
//       // console.log(`sign:${sign}`)
//       test_Data.sign = sign
//       new chat_sdk({
//         el: '#chat-room', //需要挂载元素#ID,.类名，或者元素对象,
//         config: test_Data,
//         //校验成功后返回
//         onSuccess: function () {
//           // console.log('onSuccess:.......')
//         },
//         //校验失败后返回
//         onFail: function (res) {
//           // console.log('onError:' + JSON.stringify(res))
//         },
//         //接收传入的消息
//         onMessage: function (res) {
//           // console.log('onMessage:' + JSON.stringify(res))
//         }
//       })
//     },
//     processStr(str) {
//       if (str.length > 20) {
//         str = str.slice(0, 17) + '...'
//       }
//       return str
//     },
//     getUserInfo() {
//       return new Promise(async (res, rej) => {
//         let username = getQueryString('username')
//         let { data } = await getUserInfo(this.getUserInfoApi, { username, type: this.isApp ? 1 : 0 })
//         if (data) {
//           let d = data.response.d
//           res({ username: d.username, profileimg: d.profileimg })
//         } else {
//           rej('用户信息错误')
//         }
//       })
//     },
//   },
//   watch: {
//     currentVideoItem(newObj, oldObj) {
//       console.log('newObj', newObj)
//       console.log('oldObj', oldObj)
//       if (newObj.id && (newObj.id !== oldObj.id)) {
//         // 初始化
//         this.initChatSDK()
//       }

//     }
//   }

// }
