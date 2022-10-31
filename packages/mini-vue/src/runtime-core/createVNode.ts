import { ShapeFlags } from "../shared";

export function createVNode(
  type: any,
  props?: any,
  children?: string | Array<any>
) {
  const vnode = {
    el: null,
    component: null,
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type)
  }
  return vnode
}

function getShapeFlag(type: any) {
  return  typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}