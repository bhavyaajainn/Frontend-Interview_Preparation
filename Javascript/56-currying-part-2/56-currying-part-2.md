# Currying – Part 2

## Problem Statement

Implement two variations of a curried `sum` function:

**Variation 1 — fixed arity (4 args):** return the sum once exactly 4 arguments have been collected across any call pattern.
```js
sum(1, 2, 3, 4)   // 10
sum(1)(2)(3)(4)   // 10
sum(1, 2)(3, 4)   // 10
sum(1)(2, 3, 4)   // 10
```

**Variation 2 — empty-call terminator:** accumulate args indefinitely; return the sum when called with no arguments `()`. `sum()` alone returns `0`.
```js
sum(1, 2, 3, 4)() // 10
sum(1)(2)(3)(4)() // 10
sum()             // 0
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Rest params + storage | `...args` collected into a `storage` array that persists via closure |
| Closure via inner `temp` | `temp` captures `storage`; returned repeatedly until the termination condition is met |
| Variation 1 termination | `storage.length === 4` — return `reduce` sum |
| Variation 2 termination | `args2.length === 0` — empty call returns accumulated sum; `sum()` alone returns `0` |
| Merge args | `storage.push(...args2)` appends new args each call |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) total across all calls (n = total arguments) |
| Space | O(n) for the storage array |
