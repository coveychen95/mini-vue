'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ShapeFlags;
(function (ShapeFlags) {
    ShapeFlags[ShapeFlags["ELEMENT"] = 1] = "ELEMENT";
    ShapeFlags[ShapeFlags["STATEFUL_COMPONENT"] = 4] = "STATEFUL_COMPONENT";
    ShapeFlags[ShapeFlags["TEXT_CHILDREN"] = 8] = "TEXT_CHILDREN";
    ShapeFlags[ShapeFlags["ARRAY_CHILDREN"] = 16] = "ARRAY_CHILDREN";
})(ShapeFlags || (ShapeFlags = {}));

function createVNode(type, props, children) {
    var vnode = {
        el: null,
        component: null,
        type: type,
        props: props,
        children: children,
        shapeFlag: getShapeFlag(type)
    };
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === "string"
        ? ShapeFlags.ELEMENT
        : ShapeFlags.STATEFUL_COMPONENT;
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

function render(vnode, container) {
    console.log('调用 patch');
    patch(null, vnode);
}
function patch(n1, n2, container) {
    var type = n2.type, shapeFlag = n2.shapeFlag;
    switch (type) {
        case 'text':
            break;
        default:
            if (shapeFlag & ShapeFlags.ELEMENT) {
                console.log('处理 element');
            }
            else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) ;
    }
}

var createApp = function (rootComponent) {
    var app = {
        _component: rootComponent,
        _container: null,
        mount: function (rootContainer) {
            console.log('基于根组件创建 vnode');
            var vnode = createVNode(rootComponent);
            app._container = rootContainer;
            console.log('调用 render , 基于 vnode 进行开箱');
            render(vnode);
            return app;
        }
    };
    return app;
};

exports.createApp = createApp;
exports.h = h;
//# sourceMappingURL=mini-vue.cjs.js.map
