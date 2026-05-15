# Promise.allSettled() Polyfill

## Problem Statement

Implement `allSettled(promises)` — a polyfill for `Promise.allSettled()`.

- Takes an array of promises (or plain values).
- Returns a **single promise** that resolves once **all** input promises have settled (resolved or rejected).
- The result is an array of outcome objects — one per input, in input order:
  - Resolved: `{ status: 'fulfilled', value: <val> }`
  - Rejected: `{ status: 'rejected', reason: <err> }`
- **Never rejects** — even if all inputs reject.

---

## Examples

```js
allSettled([
  Promise.resolve(3),
  Promise.reject(9),
  Promise.resolve(5),
]).then(console.log);

// [
//   { status: 'fulfilled', value: 3 },
//   { status: 'rejected',  reason: 9 },
//   { status: 'fulfilled', value: 5 },
// ]
```

---

## Difference from Other Promise Combinators

| Method | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | All resolve | Any rejects |
| `Promise.race` | First settles | First settles |
| `Promise.any` | Any resolves | All reject |
| `Promise.allSettled` | All settle | Never |

---

## Approach

```js
const allSettled = (promises) => {
  const mappedPromises = promises.map(p =>
    Promise.resolve(p).then(
      val => ({ status: 'fulfilled', value: val }),
      err => ({ status: 'rejected', reason: err })
    )
  );

  return Promise.all(mappedPromises);
};
```

Key insight: wrap each promise so it **always resolves** to an outcome object — fulfilled or rejected. Then `Promise.all` works normally since none of the mapped promises ever reject.

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — all promises run in parallel |
| Space | O(n) — one outcome object per input |
