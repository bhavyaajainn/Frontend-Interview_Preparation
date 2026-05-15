# Fetch with Timeout

## Problem Statement

Implement `fetchWithTimeout(url, duration)` that wraps `fetch` and aborts the request if it hasn't resolved within `duration` milliseconds.

```js
fetchWithTimeout('https://api.example.com/data', 100)
  .then(data => console.log(data))
  .catch(err => console.error(err)); // AbortError if > 100ms
```

---

## Approach — `AbortController` + `Promise` race via side effect

```js
const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    let timerId;

    fetch(url, { signal: controller.signal })
      .then(resp => resp.json())
      .then(data => {
        clearTimeout(timerId);  // cancel abort timer on success
        resolve(data);
      })
      .catch(reject);           // passes AbortError through on abort

    timerId = setTimeout(() => {
      controller.abort();       // signals fetch to stop
    }, duration);
  });
};
```

---

## Why not `Promise.race`?

`Promise.race([fetch(...), timeout])` is a common pattern but has a resource leak: the fetch continues in the background even after the timeout wins. The `AbortController` approach actually **cancels the in-flight request**, freeing network resources.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `AbortController` | Creates a `signal` passed to `fetch`; calling `abort()` rejects the fetch with `AbortError` |
| `clearTimeout` on success | Without this, the timer fires after a successful response and calls `abort()` on a completed request (harmless but noisy) |
| Error propagation | `.catch(reject)` forwards both `AbortError` (timeout) and real network errors to the caller |
| `duration = 0` | `setTimeout` with 0 fires in the next tick — fetch almost always loses, which is correct behaviour |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) setup; outcome determined by network vs. timer |
| Space | O(1) |
