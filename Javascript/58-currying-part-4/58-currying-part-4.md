# Currying – Part 4

## Problem Statement

Implement `curry(fn)` that takes any function and returns a curried version of it. The curried function keeps collecting arguments until it has received **at least `fn.length` args**, then calls `fn` with them.

```js
function sum(a, b, c, d) { return a + b + c + d; }

const curriedSum = curry(sum);

curriedSum(1, 2, 3, 4)   // 10
curriedSum(1)(2, 3)(4)   // 10
curriedSum(1)(2)(3)(4)   // 10
curriedSum(1, 2, 3, 4, 5) // 10  (extra args ignored by sum)
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `fn.length` | Built-in property — number of formal parameters a function declares; used as the arity target |
| Recursive helper | `helper(...args)` — if `args.length >= fn.length` call `fn`; else return a new function that merges args and calls `helper` again |
| Spread merge | `helper(...args, ...args2)` forwards all accumulated args on the next recursive call |
| Extra args | If more args than `fn.length` are passed at once, they're forwarded to `fn` which ignores them (normal JS behaviour) |
| Works with any fn | `curry` is generic — the arity is inferred from `fn.length` at call time |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) total across all calls (n = total arguments collected) |
| Space | O(n) call stack depth in the worst case (one arg per call) |
