import { isObject } from '@vue/shared';
import { ReactiveFlags } from './constants';
import { mutableHandlers } from './baseHandlers';

// proxyMap
const reactiveMap = new WeakMap();

// 让数据变成响应式的
// effect 副作用 数据变化后可以让effect重新执行
// 组件、watch、computed基于effect实现
export function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  if (!isObject(target)) {
    return target;
  }

  // 不重复代理
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }

  // 缓存
  const existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy;
  }

  let proxy = new Proxy(target, mutableHandlers);

  reactiveMap.set(target, proxy);

  return proxy;
}
