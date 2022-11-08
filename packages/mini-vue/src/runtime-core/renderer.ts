import { h } from '.'
import { ShapeFlags } from '../shared'
import { createComponentInstance } from './component'
import {
  hostCreateElement,
  hostSetElementText,
  hostPatchProp,
  hostInsert,
} from './render-api'
import { effect } from "@vue/reactivity"

export function render(vnode, container) {
  console.log('调用 patch')
  patch(null, vnode, container)
}

function patch(n1, n2, container = null) {
  // 基于 n2 的类型判断
  // 因为 n2 是新的 vnode
  const { type, shapeFlag } = n2
  switch(type) {
    case 'text':
      // TODO:
      // ...
      break
    // 其中还有几个类型比如： static fragment comment
    default:
      // 这里基于 shapeFlag 处理
      if (shapeFlag & ShapeFlags.ELEMENT) {
        console.log('处理 element')
        processElement(n1, n2, container);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        console.log('处理 component');
        processComponent(n1, n2, container);
      }
  }
}

function processElement(n1, n2, container) {
  if (!n1) {
    mountElement(n2, container)
  } else {
    // TODO:
    updateElement(n1, n2, container)
  }
}

function updateElement(n1, n2, container) {
  const oldProps = (n1 && n1.props) || {}
  const newProps = n2.props || {}
  console.log('应该更新 element')
  console.log('旧的 node', n1)
  console.log('新的 node', n2)
  const el = (n2.el = n1.el)

  // 对比 props
  patchProps(el, oldProps, newProps)
  
  // 对比 children
  patchChildren(n1, n2, el)
}

function patchProps(el, oldProps, newProps) {
  // 对比 props 有以下几种情况
  // 1. oldProps 有，newProps 也有但是 value 值变更了
  for (const key in newProps) {
    const prevProp = oldProps[key]
    const nextProp = newProps[key]
    if (prevProp !== nextProp) {
      // 对比属性
      // 需要交给 host 来更新 key
      hostPatchProp(el, key, prevProp, nextProp)
    }
  }
  // 2. oldProps 有，而 newProps 没有了
  // 如果这个 key 在 newProps 里也存在，说明已经处理过了
  for (const key in oldProps) {
    const prevProp = oldProps[key]
    const nextProp = null
    if (!(key in newProps)) {
      hostPatchProp(el, key, prevProp, nextProp)
    }
  }
}

function patchChildren(n1, n2, container) {
  const { children: c1 } = n1
  const { shapeFlag, children: c2 } = n2
  // 如果 n2 的 children 是 text 类型的话
  // 就看看和之前的 n1 的 children 是不是一样的
  // 如果不一样的话直接重新设置一下 text 即可
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    if (c2 !== c1) {
      console.log('类型为 text_children ,当前需要更新')
      hostSetElementText(container, c2 as string)
    }
  } 
}

function mountElement(vnode, container) {
  const { shapeFlag, props } = vnode
  // 1.先创建 element
  // 基于可拓展的渲染 api
  const el = (vnode.el = hostCreateElement(vnode.type))
  // 支持单子组件和多子组件的创建
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 举个例子
    // render() {
    //   return h('div', {}, 'text')
    // }
    // 这里的 children 就是 text ，直接渲染即可
    console.log(`处理文本:${vnode.children}`)
    hostSetElementText(el, vnode.children)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 举个例子
    // render() {
    //   return h('div', {}, [h("p"),h(Hello)])
    // }
    // 这里 children 就是个数组了，就需要依次调用 patch 递归来处理
    mountChildren(vnode.children, el);
  }

  // 处理 props
  if (props) {
    for (const key in props) {
      // TODO:
      // 需要过滤掉 vue 自身使用的 key
      // 比如生命周期的 key：beforeMount mounted
      const nextVal = props[key]
      hostPatchProp(el, key, null, nextVal);
    }
  }

  // todo
  // 触发 beforeMount() 钩子
  console.log("vnodeHook  -> onVnodeBeforeMount");
  console.log("DirectiveHook  -> beforeMount");
  console.log("transition  -> beforeEnter");

  // 插入
  hostInsert(el, container);

  // todo
  // 触发 mounted() 钩子
  console.log("vnodeHook  -> onVnodeMounted");
  console.log("DirectiveHook  -> mounted");
  console.log("transition  -> enter");
}

function mountChildren (children, container) {
  children.forEach(VNodeChild => {
    // TODO:
    // 这里应该处理一下 vnodeChild
    // 因为有可能不是 vnode 类型
    console.log('mountChildren: ', VNodeChild)
    patch(null, VNodeChild, container)
  });
}



function processComponent(n1, n2, container) {
  // 如果 n1 没有值，那就是 mount 
  if (!n1) {
    // 初始化 component
    mountComponent(n2, container)
  } else {
    // TODO:
    // updateComponent
  }
}

function mountComponent(initialVNode, container) {
  // 1. 先创建一个 component instance
  const instance = (initialVNode.component = createComponentInstance(initialVNode))
  console.log(`创建组件实例：${instance.type.name}`)
  // 2. 给 instance 加工加工
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupComponent(instance) {
  // 1. 处理 props
  initProps()
  // 2. 处理 slots
  initSlots()

  // 源码里面有两种类型的 component
  // 一种是基于 options 创建的
  // 还有一种是 function 的
  // 这里处理的是 options 创建的
  // 叫做 stateful 类型
  setupStatefulComponent(instance);
}
function initProps() {
  // TODO:
  console.log('initProps')
}

function initSlots() {
  // TODO:
  console.log('initSlots')
}

function setupStatefulComponent(instance) {
  // TODO:
  // 1. 先创建代理 proxy
  console.log('创建 proxy')
  // 2. 调用 setup
  // TODO:
  // 应传入 props 和 setupContext
  const setupResult = instance.setup && instance.setup(instance.props)

  // 3. 处理 setupResults
  handleSetupResult(instance, setupResult)
}

function handleSetupResult(instance, setupResult){
  // setup 返回的值不一样会有不同的处理
  // 1. 看看 setupResult 是个什么
  if (typeof setupResult === 'function') {
    // 如果返回的是 function 的话，那么绑定到 render 上
    // 认为是 render 逻辑
    // setup () {return h('div', {}, 'text')}
    instance.render = setupResult
  } else if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  // 给 instance 设置 render
  // 先取到用户设置的 component options
  const Component = instance.type

  if (!instance.render) {
    // TODO:
    // 调用 compile 模块来编译 template
  }
  instance.render = Component.render

  // applyOptions
}

function applyOptions() {
  // 兼容 vue2.x
  // TODO:
}

function setupRenderEffect(instance, container) {
  // 调用 render
  // 应该传入 ctx 也就是 proxy
  // ctx 可以选择暴露给用户的 api
  // 源代码里面是调用的 renderComponentRoot 函数
  // 这里为了简化直接调用 render
  
  instance.update = effect(function componentEffect() {
    if (!instance.isMounted) {
      // 组件初始化的时候会执行这里
      // 为什么要在这里调用 render 函数呢
      // 因为在 effect 内调用才能触发依赖收集
      // 等到后面响应式的时值变更后会再次触发这个函数
      console.log('调用 render ,获取 subTree')
      const subTree = (instance.subTree = instance.render(instance.proxy))
      console.log('subTree', subTree)
    

      // TODO:
      console.log(`${instance.type.name}:触发 beforeMount hook`);
      console.log(`${instance.type.name}:触发 onVnodeBeforeMount hook`);

      // 这里基于 subTree 再次调用 patch
      // 基于 render 返回的 vnode ，再次进行渲染
      // 这里我把这个行为隐喻成开箱
      // 一个组件就是一个箱子
      // 里面有可能是 element （也就是可以直接渲染的）
      // 也有可能还是 component
      // 这里就是递归的开箱
      // 而 subTree 就是当前的这个箱子（组件）装的东西
      // 箱子（组件）只是个概念，它实际是不需要渲染的
      // 要渲染的是箱子里面的 subTree
      patch(null, subTree, container);

      console.log(`${instance.type.name}:触发 mounted hook`);
      instance.isMounted = true;
    } else {
      // 响应式的值变更后会从这里执行逻辑
      // 主要就是拿到新的 vnode ，然后和之前的 vnode 进行对比
      console.log('调用更新逻辑')
      // 拿到新的 subTree 
      const nextTree = instance.render(instance.proxy)
      // 替换之前的 subTree
      const prevTree = instance.subTree
      instance.subTree = nextTree

      // 触发 beforeUpdated hook
      console.log('beforeUpdated hook')
      console.log('onVNodeBeforeUpdate hook')

      // 用旧的 vnode 和新的 vnode 交给 patch 来处理
      patch(prevTree, nextTree, prevTree.el)

      // 触发 updated hook
      console.log('updated hook')
      console.log('onVNodeUpdated hook')
    }
  })

}
