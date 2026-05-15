# Create Custom Promise

## Problem Statement

Implement a `MyPromise` class that mirrors the native `Promise` API:

- Constructor takes an executor `(resolve, reject) => {}`.
- Supports `.then(onSuccess, onFail)`, `.catch(onFail)`, `.finally(onFinally)`.
- Supports **chaining** — each method returns a new `MyPromise`.
- State transitions: `PENDING → FULFILLED` or `PENDING → REJECTED`. Once settled, state never changes.
- Handlers registered after settlement run immediately (async via microtask/setTimeout).
- Throws inside the executor automatically reject the promise.

---

## Approach — Observer Pattern

```js
const states = { PENDING: 0, FULFILLED: 1, REJECTED: 2 };

class MyPromise {
  constructor(callback) {
    this.state = states.PENDING;
    this.value = undefined;
    this.handlers = [];

    try {
      callback(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve = (value) => this._handleUpdate(states.FULFILLED, value);
  _reject  = (value) => this._handleUpdate(states.REJECTED,  value);

  _handleUpdate = (state, value) => {
    if (this.state !== states.PENDING) return;
    this.state = state;
    this.value = value;
    this._runHandlers();
  };

  _runHandlers = () => {
    if (this.state === states.PENDING) return;

    this.handlers.forEach(({ onSuccess, onFail, resolve, reject }) => {
      if (this.state === states.FULFILLED) {
        if (!onSuccess) return resolve(this.value);
        try { resolve(onSuccess(this.value)); } catch (e) { reject(e); }
      } else {
        if (!onFail) return reject(this.value);
        try { resolve(onFail(this.value)); } catch (e) { reject(e); }
      }
    });

    this.handlers = [];
  };

  then(onSuccess, onFail) {
    return new MyPromise((resolve, reject) => {
      this.handlers.push({ onSuccess, onFail, resolve, reject });
      this._runHandlers();
    });
  }

  catch(onFail) {
    return this.then(undefined, onFail);
  }

  finally(onFinally) {
    return this.then(
      val  => { onFinally(); return val; },
      err  => { onFinally(); throw err; }
    );
  }
}
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| State guard | `_handleUpdate` exits early if not PENDING — ensures immutability |
| Handler queue | Handlers stored when PENDING, flushed on settle or immediately if already settled |
| Chaining | Each `.then` returns a new `MyPromise` whose resolve/reject are in the handler queue |
| Error propagation | If no `onFail` provided, `reject` is forwarded down the chain |
| `.catch(fn)` | Sugar for `.then(undefined, fn)` |
| `.finally(fn)` | Runs `fn`, then re-emits original value/error |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — n = number of chained handlers |
| Space | O(n) — handler queue |
