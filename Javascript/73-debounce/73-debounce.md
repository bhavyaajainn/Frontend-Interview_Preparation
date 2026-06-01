# Implement Debouncing

## Problem Statement

Implement `debounce(func, delay)` that returns a debounced version of `func`. The debounced function delays invoking `func` until `delay` milliseconds have elapsed since the **last** call. If the debounced function is called again before the delay expires, the timer resets.

```js
const debounced = debounce(fn, 300);

debounced(); // timer starts
debounced(); // timer resets
debounced(); // timer resets
// ... 300ms later → fn() fires exactly once
```

**Common use cases:** search-box input, window resize, scroll handlers.

---

## Implementation

```js
const debounce = (func, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure | `timerId` lives in the outer scope and is shared across all calls to the returned function |
| `clearTimeout` first | Always clear before setting a new timer — this is what makes rapid calls collapse into one |
| `func.apply(this, args)` | Preserves the `this` context and forwards all arguments; needed when the debounced function is used as a method |
| New timer on each call | `setTimeout` returns a new ID each time; storing it in `timerId` allows the next `clearTimeout` to cancel it |
| Independent instances | Each call to `debounce()` creates its own `timerId` closure — two debounced instances never share state |

---

## Debounce vs Throttle

| | Debounce | Throttle |
|---|---|---|
| Fires | After the last call + delay | At most once per interval |
| Good for | Search input, resize end | Scroll handlers, rate-limiting API calls |
| Resets timer on new call? | Yes | No |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Per call | O(1) — just `clearTimeout` + `setTimeout` |
| Space | O(1) — one timer ID per debounced instance |
