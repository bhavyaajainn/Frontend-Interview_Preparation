# Promise.finally() Polyfill

## Problem Statement

Implement `Promise.prototype.myFinally(callback)` — a polyfill for `Promise.finally()`.

- Runs `callback` after the promise settles — whether it resolves or rejects.
- **Propagates** the original resolved value or rejection reason through (unlike `.then`).
- `callback` receives **no arguments** (can't tell if resolved or rejected).
- If `callback` itself throws or returns a rejected promise, that error replaces the original.

---

## Examples

```js
Promise.resolve(2).myFinally(() => {}).then(v => console.log(v));
// 2  — original value passed through

Promise.reject(3).myFinally(() => {}).catch(v => console.log(v));
// 3  — original rejection passed through

Promise.reject(2).myFinally(() => { throw 'oops'; }).catch(v => console.log(v));
// 'oops'  — finally's throw overrides original rejection
```

---

## Constraints

- Must be added to `Promise.prototype`.
- `callback` receives no arguments.
- Original resolved value must be preserved (unlike `.then(() => {})` which resolves to `undefined`).
- If `callback` is not a function, pass it directly to `.then()` as both handlers.

---

## Approach

```js
Promise.prototype.myFinally = function(callback) {
  if (typeof callback !== 'function') return this.then(callback, callback);

  const P = this.constructor || Promise;

  return this.then(
    value => P.resolve(callback()).then(() => value),       // preserve resolved value
    err   => P.resolve(callback()).then(() => { throw err }) // preserve rejection
  );
};
```

Key insight: wrapping `callback()` in `P.resolve(...).then(...)` ensures:
1. The callback's return value (even a promise) is awaited before continuing.
2. The original `value` / `err` is re-emitted after the callback completes.
3. If `callback()` throws, that error propagates instead.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(1) — single `.then` chaining |
| Space | O(1) — no additional data structures |
