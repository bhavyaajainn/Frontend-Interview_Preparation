# Currying – Part 3

## Problem Statement

Implement `add(...args)` that supports **infinite currying** — each call returns a new function that accumulates arguments. The accumulated sum is returned either via `.value()` or automatically when the function is used in a **primitive context** (e.g. `+ 3`).

```js
add(1)(2).value()     // 3
add(1, 2)(3).value()  // 6
add(1)(2)(3).value()  // 6
add(1)(2) + 3         // 6  ← primitive coercion via valueOf
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure with accumulator | `sum` array persists across calls; each invocation merges new args via spread |
| Returns self | `resultFn` returns itself so the chain is infinite: `add(1)(2)(3)(4)...` |
| `valueOf` override | JavaScript calls `valueOf()` automatically during type coercion (`+`, `==`, template literals) — override it to return the reduced sum |
| `value()` alias | `resultFn.value = resultFn.valueOf` — calling `.value()` explicitly triggers the same logic |
| `==` vs `===` | `.value() == 3` works because `==` triggers `valueOf`; `.value() === 3` needs `.value()` to return a primitive number |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) for `valueOf` (reduce over n accumulated args) |
| Space | O(n) for the sum array |
