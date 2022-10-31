import { h } from '../../lib/mini-vue.esm.js'

export default {
  name: 'HelloWorld',
  setup() {},
  render() {
    return h(
      'div',
      {
        tId: 'HelloWorld'
      },
      'hello world by mini-v3'
    )
  }
}