# Promise.any() Polyfill

## Problem Statement

Implement `any(promisesArray)` — a polyfill for `Promise.any()`.

- Returns a promise that **resolves** as soon as **any** input promise resolves (with that value).
- **Rejects** only if **all** input promises reject — with an array (or `AggregateError`) of all rejection reasons, in input order.
- Opposite of `Promise.all()`.

---

## Examples

```js
// test2 resolves at 600ms; test1 and test3 reject
any([rejectAt(500, 'one'), resolveAt(600, 'two'), rejectAt(200, 'three')])
  .then(v => console.log(v));  // "two"

// all three reject
any([rejectAt(500, 'one'), rejectAt(600, 'two'), rejectAt(200, 'three')])
  .catch(err => console.log(err));  // ["one", "two", "three"]
```

---

## Constraints

- Resolves with the **first** fulfillment — subsequent ones are ignored.
- Rejection array must preserve **input order** (not rejection order).
- Strictly: should use `AggregateError` for the rejection (spec-compliant), though interviews often accept a plain array.

---

## Approach

1. Return a `new Promise((resolve, reject) => { ... })`.
2. Keep a `promiseErrors[]` array (size = input length) and a `counter`.
3. `forEach` over the array, wrapping each with `Promise.resolve(promise)`:
   - `.then(resolve)` — first resolution wins; subsequent calls are silently ignored.
   - `.catch(error => { promiseErrors[index] = error; counter++; if (counter === promisesArray.length) reject(promiseErrors); })`.
4. Using `promiseErrors[index]` (not push) preserves input order.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(min(t)) resolve path — O(max(t)) reject path |
| Space | O(n) — errors array of size n |
