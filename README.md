# micro-es7-shim

No-bullshit super-simple es7 collections shim for `Array#includes`, `Object.values`, `Object.entries`.

Includes [`Symbol.unscopables` fix](https://bugs.chromium.org/p/v8/issues/detail?id=5059) for `Array`.

## Usage

```javascript
require('micro-es7-shim');
// That's all folks.
```

## Compatibility

Node.js `4.x` or any other runtime that supports ES6 method declarations and arrow functions, symbols, `Array#findIndex`, and `Number.isNaN`.

## License

MIT

Copyright (c) 2016 Alexey Shvaika, Paul Miller (http://paulmillr.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

