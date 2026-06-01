# Implement Throttling

## Problem Statement

Implement `throttle(func, limit)` that returns a throttled version of `func`. The first call fires immediately. Additional calls within `limit` ms are queued; the last queued call fires once the remaining window expires. After that, the cycle resets.

```js
const throttled = throttle(fn, 1000);

throttled(); // fires immediately
throttled(); // queued — fires ~1000ms later
throttled(); // replaces previous queued call (last-call-wins)
```

**Common use cases:** button click API guards, scroll position tracking, resize handlers with immediate first response.

---

## Implementation

```js
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `lastRan` | Tracks timestamp of last execution; `undefined` on first call so the `!lastRan` branch fires immediately |
| `lastFunc` | Stores the pending `setTimeout` ID; cleared on each new call so only the **last** call in a burst is queued |
| Remaining window | `limit - (Date.now() - lastRan)` — ensures the queued call fires exactly when the window expires, not after a full `limit` delay |
| `clearTimeout` on each call | Makes rapid calls collapse: only the most recent one is kept as the pending queued call |
| `func.apply(this, args)` | Preserves `this` context and forwards all arguments |

---

## Debounce vs Throttle

| | Debounce | Throttle |
|---|---|---|
| First call | After delay | Immediately |
| Rapid calls | Only last fires (after quiet period) | First fires + last queued |
| Timer resets on new call? | Yes | No — uses remaining window |
| Use case | Search input, resize-end | API rate limiting, scroll tracking |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Per call | O(1) — `clearTimeout` + `setTimeout` |
| Space | O(1) — two variables (`lastFunc`, `lastRan`) per throttled instance |
