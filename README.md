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


### 实现最简 vue3 模型

### tasking
- [ ] runtime-core 初始化逻辑
    - [ ] 基础类型的处理：static fragment comment
    - [ ] 触发各种 hook
    - [ ] 标准化 vnode 的实现
    - [ ] 初始化 props 逻辑
    - [ ] 初始化 slots 逻辑
    - [ ] proxy 暴露给用户的代理实现
    - [ ] 支持 template 
    - [ ] 给元素设置 props
        - [ ] 需要过滤掉vue自身用的key

