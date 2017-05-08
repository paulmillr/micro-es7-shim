'use strict';
const assert = require('assert');
const someRejectionReason = { message: 'some rejection reason' };
const anotherReason = { message: 'another rejection reason' };

describe('onFinally', () => {
  describe('no callback', () => {
    specify('from resolved', () => {
      return Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally()
        .then(
          function onFulfilled(x) {
            assert.strictEqual(x, 3);
          },
          function onRejected() {
            throw new Error('should not be called');
          }
        );
    });

    specify('from rejected', () => {
      return Promise.reject(someRejectionReason)
        .catch(e => {
          assert.strictEqual(e, someRejectionReason);
          throw e;
        })
        .finally()
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(reason) {
            assert.strictEqual(reason, someRejectionReason);
          }
        );
    });
  });

  describe('throws an exception', () => {
    specify('from resolved', () => {
      return Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          throw someRejectionReason;
        })
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(reason) {
            assert.strictEqual(reason, someRejectionReason);
          }
        );
    });

    specify('from rejected', () => {
      return Promise.reject(anotherReason)
        .finally(function onFinally() {
          assert(arguments.length === 0);
          throw someRejectionReason;
        })
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(reason) {
            assert.strictEqual(reason, someRejectionReason);
          }
        );
    });
  });

  describe('returns a non-promise', () => {
    specify('from resolved', () => {
      return Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          return 4;
        })
        .then(
          function onFulfilled(x) {
            assert.strictEqual(x, 3);
          },
          function onRejected() {
            throw new Error('should not be called');
          }
        );
    });

    specify('from rejected', () => {
      return Promise.reject(anotherReason)
        .catch(e => {
          assert.strictEqual(e, anotherReason);
          throw e;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          throw someRejectionReason;
        })
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, someRejectionReason);
          }
        );
    });
  });

  describe('returns a pending-forever promise', () => {
    specify('from resolved', done => {
      Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          setTimeout(done, 0.1e3);
          return new Promise(() => {}); // forever pending
        })
        .then(
          function onFulfilled(x) {
            throw new Error('should not be called');
          },
          function onRejected() {
            throw new Error('should not be called');
          }
        );
    });

    specify('from rejected', done => {
      Promise.reject(someRejectionReason)
        .catch(e => {
          assert.strictEqual(e, someRejectionReason);
          throw e;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          setTimeout(done, 0.1e3);
          return new Promise(() => {}); // forever pending
        })
        .then(
          function onFulfilled(x) {
            throw new Error('should not be called');
          },
          function onRejected() {
            throw new Error('should not be called');
          }
        );
    });
  });

  describe('returns an immediately-fulfilled promise', () => {
    specify('from resolved', () => {
      return Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          return Promise.resolve(4);
        })
        .then(
          function onFulfilled(x) {
            assert.strictEqual(x, 3);
          },
          function onRejected() {
            throw new Error('should not be called');
          }
        );
    });

    specify('from rejected', () => {
      return Promise.reject(someRejectionReason)
        .catch(e => {
          assert.strictEqual(e, someRejectionReason);
          throw e;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          return Promise.resolve(4);
        })
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, someRejectionReason);
          }
        );
    });
  });

  describe('returns an immediately-rejected promise', () => {
    specify('from resolved ', () => {
      return Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          return Promise.reject(4);
        })
        .then(
          function onFulfilled(x) {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, 4);
          }
        );
    });

    specify('from rejected', () => {
      const newReason = {};
      return Promise.reject(someRejectionReason)
        .catch(e => {
          assert.strictEqual(e, someRejectionReason);
          throw e;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          return Promise.reject(newReason);
        })
        .then(
          function onFulfilled(x) {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, newReason);
          }
        );
    });
  });

  describe('returns a fulfilled-after-a-second promise', () => {
    specify('from resolved', done => {
      Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          setTimeout(done, 1.5e3);
          return new Promise(resolve => {
            setTimeout(() => resolve(4), 1e3);
          });
        })
        .then(
          function onFulfilled(x) {
            assert.strictEqual(x, 3);
          },
          function onRejected() {
            throw new Error('should not be called');
          }
        );
    });

    specify('from rejected', done => {
      Promise.reject(3)
        .catch(e => {
          assert.strictEqual(e, 3);
          throw e;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          setTimeout(done, 1.5e3);
          return new Promise(resolve => {
            setTimeout(() => resolve(4), 1e3);
          });
        })
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, 3);
          }
        );
    });
  });

  describe('returns a rejected-after-a-second promise', () => {
    specify('from resolved', done => {
      Promise.resolve(3)
        .then(x => {
          assert.strictEqual(x, 3);
          return x;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          setTimeout(done, 1.5e3);
          return new Promise((resolve, reject) => {
            setTimeout(() => reject(4), 1e3);
          });
        })
        .then(
          function onFulfilled(x) {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, 4);
          }
        );
    });

    specify('from rejected', done => {
      Promise.reject(someRejectionReason)
        .catch(e => {
          assert.strictEqual(e, someRejectionReason);
          throw e;
        })
        .finally(function onFinally() {
          assert(arguments.length === 0);
          setTimeout(done, 1.5e3);
          return new Promise((resolve, reject) => {
            setTimeout(() => reject(anotherReason), 1e3);
          });
        })
        .then(
          function onFulfilled() {
            throw new Error('should not be called');
          },
          function onRejected(e) {
            assert.strictEqual(e, anotherReason);
          }
        );
    });
  });

  specify('has the correct property descriptor', () => {
    var descriptor = Object.getOwnPropertyDescriptor(
      Promise.prototype,
      'finally'
    );

    assert.strictEqual(descriptor.writable, true);
    assert.strictEqual(descriptor.configurable, true);
    assert.strictEqual(descriptor.enumerable, false);
  });
});
