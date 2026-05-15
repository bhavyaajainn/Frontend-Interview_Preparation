# Implement Async Reject Function

## Problem Statement

Implement `reject(arr, iteratee)` — the **opposite** of async `filter`.

- Returns a Promise that resolves with items that **failed** the iteratee test, **in the original order**.
- All inputs run **in parallel**.
- The iteratee signature: `iteratee(item, callback)` where `callback(err, passed)`.
- If `passed` is falsy → keep the item. If `passed` is truthy → discard it.

---

## Examples

```js
reject([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(() => {
    num = num * 2;
    console.log(num);
    callback(null, num !== 4); // 2*2===4 → false → kept by reject
  }, 2000);
})
.then(result => console.log('success:' + result))
.catch(() => console.log('no success'));

// 2, 4, 6, 8, 10  (parallel)
// "success:2"
```

---

## Constraints

| Parameter | Description |
|---|---|
| `arr` | Input array |
| `iteratee(item, cb)` | Async function; calls `cb(err, boolean)` |
| Order | Output must match original input order |
| Parallelism | All items processed concurrently |

---

## Approach

Identical to async `filter` with **one change**: store the item at `output[i]` when `result` is **falsy** (instead of truthy).

1. Return a new Promise.
2. `arr.forEach` — kick off all iteratee calls in parallel.
3. In each callback: if `error` → `reject(error)`.
4. Increment `track`. If `!result` → `output[i] = e`.
5. When `track >= arr.length` → `resolve(output.filter(Boolean))`.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n) — all n items run in parallel |
| Space | O(n) — output sparse array of size n |
