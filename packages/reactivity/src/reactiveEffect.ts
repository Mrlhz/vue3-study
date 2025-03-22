import { activeEffect, effect, trackEffect } from './effect';

const targetMap = new WeakMap();

function createDep(cleanup, key) {
  const dep = new Map() as any;
  dep.cleanup = cleanup;
  dep.name = key

  return dep
}

export function track(target, key) {
  if (activeEffect) {
    console.log({ target, key })

    let depsMap = targetMap.get(target);

    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(
        key,
        (dep = createDep(() => depsMap.delete(key), key))
      );
    }

    trackEffect(activeEffect, dep)
    console.log(targetMap)
  }
}

// VUE-响应式实现原理 -派发通知(trigger)
export function trigger(target, key, value, oldValue) {

  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return
  }

  const dep = depsMap.get(key);

  for (const effect of dep.keys()) {
    if (effect.scheduler) {
      effect.scheduler()
    }
  }
}
