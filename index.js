'use strict';

// https://bugs.chromium.org/p/v8/issues/detail?id=5059
Array.prototype[Symbol.unscopables].includes = true;

const install = (target, methods) => {
  Object.keys(methods).forEach(key => {
    if (target.hasOwnProperty(key)) return;
    Object.defineProperty(target, key, {
      value: methods[key],
      writable: true,
      configurable: true,
    });
  });
};



install(Object, {
  values(object) {
    return Object.keys(object).map(key => object[key]);
  },
  entries(object) {
    return Object.keys(object).map(key => [key, object[key]]);
  },
});
