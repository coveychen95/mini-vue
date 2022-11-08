import { ShapeFlags } from "../shared";

export function createVNode(
  type: any,
  props: any = {},
  children?: string | Array<any>
) {
  const vnode = {
    el: null,
    component: null,
    key: props.key || null,
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type)
  }

  // 基于 children 再次设置 shapeFlag
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'string'){
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }
  
  return vnode
}

function getShapeFlag(type: any) {
  return  typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}