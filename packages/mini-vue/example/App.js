import { h, ref } from '../lib/mini-vue.esm.js'
import PatchChildren from './components/PatchChildren.js'
// import HelloWorld from './components/HelloWorld.js'

// const count = ref(1)
// const HelloWorld = {
//   name: "HelloWorld",
//   setup() {},
//   render() {
//     return h(
//       "div",
//       { tId: "helloWorld" },
//       `hello world: count: ${count.value}`
//     );
//   },
// };

export default {
  name: "App",
  setup() {},
  render() {
    return h(
      'div', 
      {
        tId: 1,
      },
      [
        h('p', {}, '主页'),
        h(PatchChildren)
      ]
    )
  }
}