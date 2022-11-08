### 源码初探-设计思路与基本实现

#### v3的初始化流程

1. vue3 初步认知
2. 基本结构
3. setup
4. render 

#### 响应式变量的实现
1. reactive
2. effect 副作用
3. track-trigger 依赖收集

#### 虚拟 dom 更新
1. vdom 
2. 更新

------

### 实现最简 vue3 模型

### Tasking

#### runtime-core

- [x] 支持组件类型
- [x] 支持 element 类型
- [x] 初始化 props
- [x] setup 可获取 props 和 context
- [x] 支持 component emit
- [x] 支持 proxy
- [ ] 可以在 render 函数中获取 setup 返回的对象
- [ ] nextTick 的实现
- [ ] 支持 getCurrentInstance
- [ ] 支持 provide/inject
- [ ] 支持最基础的 slots
- [ ] 支持 Text 类型节点
- [ ] 支持 $el api
- [ ] 支持 watchEffect


#### reactivity

目标是用自己的 reactivity 支持现有的 demo 运行

- [ ] reactive 的实现
- [ ] ref 的实现
- [ ] readonly 的实现
- [ ] computed 的实现
- [ ] track 依赖收集
- [ ] trigger 触发依赖
- [ ] 支持 isReactive
- [ ] 支持嵌套 reactive
- [ ] 支持 toRaw
- [ ] 支持 effect.scheduler
- [ ] 支持 effect.stop
- [ ] 支持 isReadonly
- [ ] 支持 isProxy
- [ ] 支持 shallowReadonly
- [ ] 支持 proxyRefs

### compiler-core
- [ ] 解析插值
- [ ] 解析 element
- [ ] 解析 text

### runtime-dom
- [ ] 支持 custom renderer 

### runtime-test
- [ ] 支持测试 runtime-core 的逻辑

### infrastructure
- [ ] support monorepo with pnpm
### build

```shell
pnpm build
```

### example

通过 server 的方式打开 packages/vue/example/\* 下的 index.html 即可

>  推荐使用 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### 初始化

#### 流程图
![初始化流程图](https://user-images.githubusercontent.com/12064746/138114565-3e0eecbb-7fd0-4203-bf36-5e5fd8003ce0.png)

#### 关键函数调用图


![关键函数调用图2](https://images-1252602850.cos.ap-beijing.myqcloud.com/20220927170658.png)

> 可以基于函数名快速搜索到源码内容

### update

#### 流程图

![image](https://user-images.githubusercontent.com/12064746/138115157-1f4fb8a2-7e60-412d-96de-12e68eb0288c.png)

#### 关键函数调用图

![image](https://user-images.githubusercontent.com/12064746/138114969-9139e4af-b2df-41b2-a5d9-069d8b41903c.png)



来源：[b站羊村长]( https://www.bilibili.com/video/BV1tf4y1h76o/?share_source=copy_web&vd_source=8289a9d4412b981fc41f546cd5fec3b4) & https://github.com/cuixiaorui/mini-vue
