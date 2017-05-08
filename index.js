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

const keys = (target, fn) => {
  const res = [];

  Object.getOwnPropertyNames(target).forEach(key => {
    const desc = Object.getOwnPropertyDescriptor(target, key);
    if (desc && desc.enumerable) res.push(fn(key));
  });

  return res;
};

install(Object, {
  entries(obj) {
    return keys(obj, key => [key, obj[key]]);
  },
  values(obj) {
    return keys(obj, key => obj[key]);
  },
});

install(Promise, {
  try(fn) {
    return new this(resolve => {
      resolve(fn());
    });
  },
});

install(Promise.prototype, {
  finally(fn) {
    if (typeof fn !== 'function') {
      return this.then(fn, fn);
    }

    return this.then(val => {
      return Promise.try(fn).then(() => val);
    }, err => {
      return Promise.try(fn).then(() => {
        throw err;
      });
    });
  },
});
