// TODO:
// 源码里面这些接口是由 runtime-dom 来实现
// 这里先简单实现
// 后面也修改成和源码一样的实现

export function hostCreateElement(type) {
  console.log("hostCreateElement: ", type);
  const element = document.createElement(type);
  return element;
}

export function hostSetElementText(el, text) {
  console.log('hostSetElementText: ', el, text)
  el.innerText = text
}

export function hostPatchProp(el, key, prevValue, nextValue) {
  // preValue 之前的值
  // 为了之后 update 做准备的值
  // nextValue 当前的值
  console.log(`hostPatchProp 设置属性:${key} 值:${nextValue}`);

  switch(key) {
    case 'tId':
      el.setAttribute(key, nextValue)
  }
}

export function hostInsert(el, container) {
  console.log('hostInsert: ');
  container.append(el)
}

