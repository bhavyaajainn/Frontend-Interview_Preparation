# Retry Promises N Number of Times

## Problem Statement

Implement `retryWithDelay(operation, retries, delay, finalErr)` — a function that retries a promise-returning function up to `retries` times, waiting `delay` ms between each attempt. If all attempts fail, reject with `finalErr`.

---

## Examples

```js
retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed');

// attempt 1 -> failed
// attempt 2 -> retry after 50ms -> failed
// attempt 3 -> retry after 50ms -> failed
// Failed.
```

```js
// Succeeds on the 5th call — passes with retries = 10
await retryWithDelay(getTestFunc(), 10);
console.log('success'); // "success"

// Fails before 5th call — only 3 retries allowed
await retryWithDelay(getTestFunc(), 3);
// rejects with "Retry failed"
```

---

## Constraints

| Parameter | Default | Description |
|---|---|---|
| `operation` | — | Function that returns a Promise |
| `retries` | `3` | Max number of retry attempts |
| `delay` | `50` | Milliseconds to wait between retries |
| `finalErr` | `'Retry failed'` | Rejection value when all retries exhausted |

---

## Approach

### Helper — `wait(ms)`
Return a Promise that resolves after `ms` milliseconds using `setTimeout`.

### Approach 1 — `then...catch`
1. Call `operation()`.
2. `.then(resolve)` — if it resolves, we're done.
3. `.catch` — if it rejects and `retries > 0`: call `wait(delay)`, then recursively call `retryWithDelay` with `retries - 1`, chain `.then(resolve).catch(reject)`.
4. If `retries === 0`, call `reject(finalErr)`.

### Approach 2 — `async...await`
1. `try { await fn() }` — success, return.
2. `catch` — if `retries <= 0` return `Promise.reject(finalErr)`.
3. Otherwise `await wait(interval)` then recursively call `retryWithDelayAsync(fn, retries - 1, ...)`.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n) — n retry attempts, each with O(1) work |
| Space | O(n) — recursive call stack depth equals number of retries |
