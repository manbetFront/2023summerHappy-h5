import { EventEmitter } from 'emitter'
let emitter = new EventEmitter()
emitter.emit('username', '张三')

window.setUserName = (username) => {
  emitter.emit('username', username)
}
export default emitter