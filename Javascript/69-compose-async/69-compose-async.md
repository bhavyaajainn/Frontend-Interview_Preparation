# Create composeAsync Function with Chaining Support

## Problem Statement

Implement `composeAsync` in two variations:

**Variation 1 — Promise-based** (handles async + sync functions)
```js
composeAsync(c, b, a)(5, 3).then(result => console.log(result)); // 2
// a(5,3) → 15 → b(15) → 20 → c(20) → 2  (right-to-left)
```

**Variation 2 — Callback-based** (Node-style error-first)
```js
composeAsync(c, b, a)(5, 3, done);
// a(5,3,next) → b(15,next) → c(20,next) → done(null, 2)
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Right-to-left | `compose(c, b, a)` runs `a` first, then `b`, then `c` — opposite of pipe |
| Multi-arg first call | The rightmost fn can receive multiple args; all subsequent fns receive a single value — spread only the first call |
| Array spread guard | `Array.isArray(result) ? func(...result) : func(result)` — safely handles the first multi-arg call |
| `await` on sync fns | `await syncFn()` works fine — sync return values are auto-wrapped in a resolved Promise |
| `reduceRight` alternative | `functions.reduceRight((chain, fn) => chain.then(args => fn(...args)), Promise.resolve(input))` — more functional style |
| Variation 2 — `next` callback | Each fn calls `next(null, value)` to advance or `next(error)` to abort; the pipeline index walks right-to-left |
| Variation 2 — error short-circuit | On `next(error)`, immediately call the final `done(error)` and stop — don't call any more fns |

---

## Compose vs Pipe

| | Order | First fn called |
|---|---|---|
| `pipe(a, b, c)` | left-to-right | `a` |
| `compose(c, b, a)` | right-to-left | `a` |

Both produce the same result for the same input; only the argument order differs.

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) where n = number of composed functions (each awaited in series) |
| Space | O(n) call stack depth during execution |
