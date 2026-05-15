# Implement Async Filter Function

## Problem Statement

Implement `filter(arr, iteratee)` — an async version of `Array.filter()`.

- All inputs run **in parallel**.
- Returns a Promise that resolves with items that **passed** the iteratee test, **in the original order**.
- The iteratee signature: `iteratee(item, callback)` where `callback(err, passed)`.

---

## Examples

```js
filter([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(() => {
    num = num * 2;
    console.log(num);
    callback(null, num !== 4); // filter out 2 (since 2*2 === 4)
  }, 2000);
})
.then(result => console.log('success:' + result))
.catch(() => console.log('no success'));

// 2, 4, 6, 8, 10  (all printed in parallel after 2s)
// "success:1,3,4,5"
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

1. Return a new Promise.
2. Use `arr.forEach` to kick off all iteratee calls in parallel.
3. Track a `track` counter — increment it every time a callback fires.
4. If `callback` result is truthy, store the **original item** at `output[i]` (preserves order via sparse array).
5. When `track >= arr.length` (all processed), resolve with `output.filter(Boolean)` to remove empty slots.

The sparse array trick maintains order without sorting: items that don't pass leave gaps, and the final `.filter(Boolean)` compacts them.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n) — all n items run in parallel |
| Space | O(n) — output array of size n |
