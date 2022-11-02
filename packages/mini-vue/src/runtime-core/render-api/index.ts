// TODO:
// 源码里面这些接口是由 runtime-dom 来实现
// 这里先简单实现
// 后面也修改成和源码一样的实现

export function hostCreateElement(type) {
  console.log("hostCreateElement -> type: ", type);
  const element = document.createElement(type);
  return element;
}

export function hostSetElementText(el, text) {
  console.log('hostSetElementText -> el, text: ', el, text)
  el.innerText = text
}

export function hostPatchProp() {}

export function hostInsert() {}

