# Promise.all() Polyfill

## Problem Statement

Implement `myPromiseAll(taskList)` — a polyfill for `Promise.all()`.

- Accepts an array of promises (or non-thenable values).
- Returns a promise that **resolves** with an array of results (in the same order as input) when **all** promises resolve.
- **Rejects** immediately with the reason of the **first** rejected promise.

---

## Examples

```js
// All resolve
myPromiseAll([task(1000), task(5000), task(3000)])
  .then(results => console.log(results));
// [1000, 5000, 3000]  — order preserved

// One rejects
myPromiseAll([task(1000), taskThatRejects, task(3000)])
  .catch(err => console.error(err));
// "Rejected"
```

---

## Constraints

- Result order must match the **input** order, not completion order.
- Non-thenable values (numbers, strings) should be treated as already-resolved — wrap with `Promise.resolve()`.
- Once any promise rejects, ignore subsequent resolutions.

---

## Approach

1. Return a `new Promise((resolve, reject) => { ... })`.
2. Keep a `results[]` array and a `promisesCompleted` counter.
3. `forEach` over `taskList` with index `i`:
   - Wrap: `Promise.resolve(promise).then(val => { results[i] = val; promisesCompleted++; if (promisesCompleted === taskList.length) resolve(results); }).catch(reject)`.
4. Using `results[i] = val` (not `push`) preserves input order.
5. Edge case: empty array → resolve immediately with `[]`.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(max(t)) — wall-clock time = slowest promise |
| Space | O(n) — results array of size n |
