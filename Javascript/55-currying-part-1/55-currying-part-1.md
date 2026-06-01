# Currying – Part 1

## Problem Statement

Implement `curry()` that returns a function which **accumulates** all previously passed values and returns their running sum. Calling with no argument (or `0`) returns the current total without resetting it.

```js
const sum = curry();

sum(5);  // 5
sum(3);  // 8
sum(4);  // 12
sum(0);  // 12
sum();   // 12
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure | `sum` variable in the outer function persists across calls via the inner function's closure |
| Default param | `function(num = 0)` — calling with no argument adds 0, returning the current total |
| State isolation | Each `curry()` call creates an independent accumulator; multiple instances don't share state |
| Not a reset | Passing `0` or calling with no args does **not** reset the sum — it stays accumulated |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) per call |
| Space | O(1) — single accumulated value |
