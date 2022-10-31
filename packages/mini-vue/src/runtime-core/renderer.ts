import { ShapeFlags } from '../shared'

export function render(vnode, container) {
  console.log('调用 patch')
  patch(null, vnode, container)
}

function patch(n1, n2, container) {
  // 基于 n2 的类型判断
  // 因为 n2 是新的 vnode
  const { type, shapeFlag } = n2
  switch(type) {
    case 'text':
      // TODO:
      // ...
      break
    default:
      // 这里基于 shapeFlag 处理
      if (shapeFlag & ShapeFlags.ELEMENT) {
        console.log('处理 element')
        processElement(n1, n2, container);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(n1, n2, container);
      }
  }
}

function processElement(n1, n2, container) {
  if (!n1) {
    mountElement(n2, container)
  } else {
    // TODO:
    // updateElement()
  }
}

function processComponent(n1, n2, container) {}

function mountElement(vnode, container) {

}
