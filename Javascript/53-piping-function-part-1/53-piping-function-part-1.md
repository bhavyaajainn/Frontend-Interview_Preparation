# Piping Function – Part 1

## Problem Statement

Implement `pipe(obj)` that accepts an object (with functions at any nesting level) and returns a function. When the returned function is called with arguments, every function in the object is replaced with its computed result. Non-function, non-object values are left unchanged.

```js
const obj = {
  a: { b: (a,b,c) => a+b+c, c: (a,b,c) => a+b-c },
  d: (a,b,c) => a-b-c,
  e: 1,
  f: true,
};

pipe(obj)(1, 1, 1);
// { a: { b: 3, c: 1 }, d: -1, e: 1, f: true }
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure | `pipe(obj)` returns `(...args) => ...` — args are captured for use in every nested call |
| In-place mutation | `obj[key]` is overwritten with the function's return value |
| Recursive nesting | If a value is a plain object, recursively call `pipe(val)(...args)` |
| Null / array guard | `typeof null === 'object'` — always check `val && typeof val === 'object'` before recursing to avoid a stack overflow |
| Primitives pass through | Numbers, booleans, strings are left as-is |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) where n = total number of keys across all nesting levels |
| Space | O(d) recursion depth |
