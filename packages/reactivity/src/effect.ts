
export function effect(fn, options?) {
  // 创建一个响应式effect数据变化后可以重新执行
  // 创建一个effect,只要依赖的属性变化了就要执行回调
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });

  _effect.run();

}

export let activeEffect;
class ReactiveEffect {
  _trackId = 0;
  deps = [];
  public active = true; // 创建的effect是响应式的
  // fn用户编写的函数
  // 如果fn中依赖的数据发生变化后,需要重新调用->run()
  constructor(public fn, public scheduler) {}

  run() {
    if (!this.active) {
      return this.fn() // 不是激活的,执行后,什么都不用做
    }

    let lastEffect = activeEffect
    try {
      activeEffect = this
      return this.fn(); // 依赖收集
    } finally {
      activeEffect = lastEffect
    }
  }

}



export function trackEffect(effect, dep) {
  dep.set(effect, effect._trackId)

  effect.deps[effect.depsLength++] = dep;
}
