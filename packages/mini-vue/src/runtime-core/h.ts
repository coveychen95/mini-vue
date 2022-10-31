import { createVNode } from './createVNode'

export function h(
  type: string,
  props: any,
  children: string | Array<any>
) {
  return createVNode(type, props, children)
}
