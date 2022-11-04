import { h, ref } from '../../lib/mini-vue.esm.js'

const count = ref(1)
export default {
  name: 'HelloWorld',
  setup() {},
  render() {
    return h(
      'div',
      {
        tId: 'HelloWorld'
      },
      `hello world : ${count.value}`
    )
  }
}