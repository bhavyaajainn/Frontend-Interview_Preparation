# Currying – Part 5

## Problem Statement

Implement `generateSum(limit)` that returns a curried function. The function collects arguments across successive calls until at least `limit` arguments have been received, then returns the sum of the **first `limit` arguments** (extras ignored).

```js
generateSum(4)(1)(2)(3)(4);    // 10
generateSum(2)(5)(2);          // 7
generateSum(2)(5)(2, 3, 4);    // 7  — only first 2 args counted
generateSum(3)(1, 2)(3);       // 6  — multiple args per call
```

---

## Implementation

```js
const generateSum = (limit) => {
  const helper = (...args) => {
    if (args.length >= limit) {
      return args.slice(0, limit).reduce((a, b) => a + b, 0);
    }
    return (...args2) => helper(...args, ...args2);
  };
  return helper;
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure over `limit` | `helper` closes over `limit` from the outer `generateSum` scope |
| Rest operator `...args` | Collects all arguments in each call into a single array — supports multiple args per call |
| Accumulation via recursion | Each intermediate call returns a new function that spreads previously collected args + new args into the next `helper` call |
| `slice(0, limit)` | Caps the argument count at `limit` — any excess arguments passed in the final call are discarded |
| Base case | `args.length >= limit` — returns the final numeric sum |
| Independent instances | Each `generateSum(n)` call returns a fresh `helper` with its own argument accumulation |

---

## Comparison with Previous Currying Parts

| Part | Accepts | Returns |
|---|---|---|
| Parts 1–3 | Fixed single arg per call | Curried function until all args received |
| Part 4 | Callback + args | Sum via callback |
| **Part 5** | `limit` N + N individual calls (any args per call) | Sum of first N args |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Per call | O(k) where k = current accumulated arg count (spread cost) |
| Total | O(limit) — limit recursive calls max |
| Space | O(limit) — args array grows to at most limit elements |
