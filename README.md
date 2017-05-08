# micro-es7-shim

No-bullshit super-simple ESnext shim for Node.js LTS (currently `v6.10.3`).

Provides spec-perfect (tested with official TC39 test suite where available) polyfills for:

* `Object.entries`
* `Object.values`
* `Promise.try`
* `Promise#finally`

Also includes [`@@unscopables` fix](https://bugs.chromium.org/p/v8/issues/detail?id=5059) for `Array#includes`.

## Usage

```js
require('micro-es7-shim');
// That's all folks.
```

## Compatibility

Node.js `4.x` or any other runtime that supports basic ES6 syntax.

## License

[MIT](https://github.com/paulmillr/mit) (c) 2016 Paul Miller (http://paulmillr.com)
