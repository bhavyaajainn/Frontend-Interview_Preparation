# Memoize a Function

## Problem Statement

Implement `memoize(fn)` that returns a memoized version of `fn`. The first call with a given set of arguments executes `fn` and caches the result. All subsequent calls with the same arguments return the cached result instantly.

```js
const memoized = memoize(slowFn);
memoized(params); // slow — computes and caches
memoized(params); // instant — returns from cache
memoized(otherParams); // slow — new args, computes and caches
```

---

## Implementation

```js
const memoize = function (fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Cache key | `JSON.stringify(args)` — converts the argument list to a deterministic string; works for primitives, arrays, plain objects |
| `key in cache` vs `cache[key]` | Use `in` operator to check existence — `cache[key]` would fail to detect cached falsy values (`0`, `false`, `""`, `null`) |
| `fn.apply(this, args)` | Preserves `this` context for method-style usage |
| Independent caches | Each call to `memoize()` creates a new closure with its own `cache` — two memoized wrappers never share state |
| Limitation | `JSON.stringify` doesn't handle functions, `undefined`, circular refs, or `Symbol` keys — for those, use a `Map` with a custom key strategy |
| `Map` alternative | `Map` preserves reference equality for object keys; use when args are objects and identity matters more than structural equality |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| First call (cache miss) | O(k) for key serialisation + O(fn) for computation |
| Subsequent calls (cache hit) | O(k) for key serialisation + O(1) lookup |
| Space | O(n × k) where n = unique call signatures, k = avg key length |
