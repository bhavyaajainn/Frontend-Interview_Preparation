# Implement mapLimit Async Function

## Problem Statement

Implement `mapLimit(arr, limit, iteratee)` — similar to `Array.map()` but for async operations with concurrency control.

- Returns a Promise that resolves with the mapped output array, preserving order.
- Rejects immediately if any iteratee calls back with an error.
- At most `limit` async operations run in parallel at any time.

The iteratee signature: `iteratee(item, callback)` where `callback(err, result)`.

---

## Examples

```js
mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(() => {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
})
.then(result => console.log('success:' + result))
.catch(() => console.log('no success'));

// first batch (parallel):  2, 4, 6
// second batch (parallel): 8, 10
// "success:2,4,6,8,10"
```

```js
// Error case — callback(true) when num === 6
// first batch: 2, 4, 6
// "no success"
```

---

## Constraints

| Parameter | Description |
|---|---|
| `arr` | Input array to map over |
| `limit` | Max number of concurrent async operations |
| `iteratee(item, cb)` | Async function; calls `cb(err, result)` when done |

- Results must be in the **same order** as the input array.
- If any callback receives a truthy error, reject immediately.

---

## Approach

1. **`Array.prototype.chop(size)`** — helper that slices the array into sub-arrays of length `size`. Returns `[[1,2,3],[4,5]]` for limit 3.
2. **`mapLimit`**:
   - Chop `arr` into batches of size `limit`.
   - Run batches **in series** (next batch starts only after current batch completes).
   - Within each batch, run all items **in parallel** using `Promise.all`.
   - Wrap each iteratee call in a Promise that resolves with its result or rejects on error.
   - Accumulate results across batches and resolve the outer Promise with the final array.
   - If any iteratee errors, reject immediately.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n) total work; wall-clock time = O(⌈n/limit⌉ × max iteratee time) |
| Space | O(n) — result array + at most `limit` in-flight Promises at once |
