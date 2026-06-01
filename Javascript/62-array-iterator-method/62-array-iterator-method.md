# Array Iterator Method

## Problem Statement

Implement `helper(array)` that accepts an array and returns an iterator object with two methods:

- `next()` — returns the next element in the array on each call; returns `null` once all elements are exhausted.
- `done()` — returns `true` if all elements have been consumed, `false` otherwise.

```js
let iterator = helper([1, 2, "hello"]);
iterator.next();  // 1
iterator.next();  // 2
iterator.done();  // false
iterator.next();  // "hello"
iterator.done();  // true
iterator.next();  // null
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure | The index variable lives in `helper`'s scope and is shared by both returned methods — each iterator instance gets its own private index |
| `next()` boundary | Check `index < array.length` before accessing; return `null` (not `undefined`) when exhausted |
| `done()` check | `index >= array.length` — becomes `true` as soon as the last element has been consumed |
| Independent iterators | Each call to `helper()` creates a new closure with its own index; two iterators on the same array advance independently |
| Falsy values | `null`, `false`, `0`, `""` are valid array elements — `next()` must return them as-is, not treat them as "no value" |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `helper()` setup | O(1) — just captures a reference and initialises the index |
| `next()` / `done()` | O(1) per call |
| Space | O(1) extra (index variable only; no copy of the array is made) |
