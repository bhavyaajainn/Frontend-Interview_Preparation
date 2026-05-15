# Filter Nested Object

## Problem Statement

Implement `deepFilter(obj, filterFn)` that **mutates `obj` in-place**:

- Remove any leaf (non-object) value for which `filterFn(value)` returns `false`.
- After removing a leaf, if its parent object is now empty, delete the parent too (and propagate upward).

```js
deepFilter({ a: 1, b: { c: 'hi', d: 2 } }, v => typeof v === 'string');
// → { b: { c: 'hi' } }
```

---

## Approach — Recursive DFS with post-order prune

```js
const deepFilter = (obj, filter) => {
  for (const key in obj) {
    const val = obj[key];

    if (typeof val === 'object' && val !== null) {
      deepFilter(val, filter);          // recurse first (post-order)
    } else {
      if (!filter(val)) delete obj[key]; // prune failing leaf
    }

    // prune empty object left after recursion
    if (JSON.stringify(obj[key]) === '{}') delete obj[key];
  }
};
```

---

## Why post-order (recurse before prune)?

We must process children **before** checking if the parent is empty.  
If we delete children first, the parent check `=== '{}'` is accurate.  
Pre-order deletion would check the parent before children are removed → misses empty intermediates.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `for...in` | Enumerates own + inherited keys; fine for plain objects. Use `hasOwnProperty` guard if inheritance matters. |
| Leaf detection | `typeof val !== 'object'` — primitives are leaves; nested objects recurse |
| Empty object check | `JSON.stringify(val) === '{}'` — simple and reliable for plain objects |
| In-place mutation | `delete obj[key]` removes the property from the **same** reference; no copy created |
| `null` guard | `typeof null === 'object'` in JS — add `&& val !== null` if nulls are possible leaves |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — n = total number of keys across all levels |
| Space | O(d) — d = max nesting depth (call stack) |
