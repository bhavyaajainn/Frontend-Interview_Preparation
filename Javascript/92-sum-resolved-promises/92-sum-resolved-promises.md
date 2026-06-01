# Sum of All the Resolved Promises

## Problem Statement

Given an array of promises that each either resolve with a number or reject, return a promise that:
- Resolves with the **sum of all resolved values** (ignoring rejections), or
- Rejects with `"All promises rejected"` if every promise in the array rejects.

```js
sumResolvedPromises([resolve(10), reject(), resolve(20), reject(), resolve(5)]);
// → 35

sumResolvedPromises([reject("a"), reject("b"), reject("c")]);
// → rejects: "All promises rejected"
```

---

## Two Approaches

### Approach 1 — Manual forEach with counters

```js
function sumResolvedPromises(promises) {
  return new Promise((resolve, reject) => {
    let resolvedSum = 0, resolvedCount = 0, settledCount = 0;
    promises.forEach(p => Promise.resolve(p)
      .then(val => { resolvedSum += val; resolvedCount++; })
      .catch(() => {})
      .finally(() => {
        if (++settledCount === promises.length) {
          resolvedCount === 0
            ? reject("All promises rejected")
            : resolve(resolvedSum);
        }
      }));
  });
}
```

### Approach 2 — `Promise.allSettled` (recommended)

```js
function sumResolvedPromises(promises) {
  return Promise.allSettled(promises).then(results => {
    const resolved = results
      .filter(r => r.status === "fulfilled")
      .map(r => r.value);
    if (resolved.length === 0) throw new Error("All promises rejected");
    return resolved.reduce((sum, val) => sum + val, 0);
  });
}
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `settledCount` (Approach 1) | Promises are async — `forEach` exits before any settle. The `finally` block is the only reliable way to know when all are done |
| `Promise.resolve(p)` wrapper | Safely handles non-Promise values in the array |
| `resolvedCount === 0` | The rejection condition — do NOT check `settledCount === promises.length && resolvedSum === 0` (resolved value of `0` would incorrectly trigger rejection) |
| `Promise.allSettled` | Never rejects — returns `{ status, value/reason }` for every promise regardless of outcome; avoids manual counters |
| Rejection value | Article uses a plain string `"All promises rejected"` (Approach 1) and `new Error(...)` (Approach 2) — verify expected format in the interview |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — all promises run concurrently; total = slowest promise |
| Space | O(n) — `allSettled` results array |
