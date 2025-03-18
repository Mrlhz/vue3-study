import { ReactiveFlags } from './constants';
import { track } from './reactiveEffect';

export const mutableHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    // 代理过
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }

    track(target, key);

    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {

    Reflect.set(target, key, value, receiver);
    return true
  }
}
