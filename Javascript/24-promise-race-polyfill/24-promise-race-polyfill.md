# Promise.race() Polyfill

## Problem Statement

Implement `race(promisesArray)` — a polyfill for `Promise.race()`.

- Returns a promise that **settles** (resolves or rejects) as soon as the **first** promise in the array settles.
- The returned promise takes the **value or reason** of that first-settled promise.

---

## Examples

```js
// promise2 resolves at 100ms — fastest
race([promise(500, 'one'), promise(100, 'two'), rejectAt(200, 'three')])
  .then(v => console.log(v));  // "two"

// promise3 rejects at 40ms — fastest
race([promise(500, 'one'), promise(100, 'two'), rejectAt(40, 'three')])
  .catch(e => console.log(e)); // "three"
```

---

## Constraints

- All promises run in parallel.
- Only the **first** settlement (resolve or reject) matters; subsequent ones are ignored.
- Non-thenable values should be treated as already-resolved — wrap with `Promise.resolve()`.

---

## Approach

1. Return a `new Promise((resolve, reject) => { ... })`.
2. `forEach` over the array, wrapping each item with `Promise.resolve(promise)`.
3. For each: `.then(resolve, reject)` — pass `resolve` and `reject` directly.
4. Because a Promise can only be settled once, subsequent calls to `resolve`/`reject` are silently ignored by the runtime.

```js
promisesArray.forEach(promise =>
  Promise.resolve(promise).then(resolve, reject)
);
```

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(min(t)) — wall-clock time = fastest promise |
| Space | O(n) — n promises running in parallel |
