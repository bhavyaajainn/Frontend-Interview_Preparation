# Flatten an Array

## Problem Statement

Given an N-dimensional nested array, return a single flat array containing all elements in order.

---

## Examples

```js
[[[1, [1.1]], 2, 3], [4, 5]].flat(Infinity);
// [1, 1.1, 2, 3, 4, 5]

flatten([[[1, [1.1]], 2, 3], [4, 5]]);
// [1, 1.1, 2, 3, 4, 5]
```

```js
// flatMap — one-level flatten after mapping
['Prashant Yadav', 'Learners Bucket'].flatMap(e => e.split(' '));
// ['Prashant', 'Yadav', 'Learners', 'Bucket']
```

---

## Constraints

- Input can be nested to any depth.
- Output order must match the original traversal order.
- Both modern built-ins and a manual polyfill should be known.

---

## Approach

### Approach 1 — Built-in `flat(Infinity)` (ES2019+)
```js
arr.flat(Infinity)
```
Supported in Chrome 69+, Firefox 62+, Safari 12+, Edge 76+. Pass `Infinity` to flatten all levels.

### Approach 2 — `reduce` + recursion
```js
arr.reduce((flat, item) =>
  flat.concat(Array.isArray(item) ? flatten(item) : item), [])
```
Recursively concat nested arrays using `reduce`.

### Approach 3 — Iterative `for` loop + recursion
```js
for each item:
  if Array → recurse with same result[]
  else     → result.push(item)
```
More memory-efficient; avoids creating intermediate arrays on every concat.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n) — visits every element once |
| Space | O(n) — output array + O(d) call stack, d = nesting depth |
