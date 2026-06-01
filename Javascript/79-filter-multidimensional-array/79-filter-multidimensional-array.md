# Filter Multidimensional Array

## Problem Statement

Implement `Array.prototype.multiFilter(callback)` that recursively filters a nested array. Sub-arrays are always kept in the output (preserving structure); non-array (leaf) elements are included only if `callback` returns truthy.

```js
const arr = [[1, [2, [3, "foo", { a: 1 }]], "bar"]];

arr.multiFilter(e => typeof e === "number"); // [[1,[2,[3]]]]
arr.multiFilter(e => typeof e === "string"); // [[[["foo"]],"bar"]]
```

---

## Implementation

```js
Array.prototype.multiFilter = function (callback) {
  const filter = (arr, test) => {
    const result = [];
    for (const a of arr) {
      if (Array.isArray(a)) {
        result.push(filter(a, test));  // always recurse, always keep sub-array
      } else if (test(a)) {
        result.push(a);               // leaf passes test → include
      }
    }
    return result;
  };
  return filter(this, callback);
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Always recurse sub-arrays | Even if a sub-array ends up empty, it is pushed into the result — this preserves the nesting structure of the original |
| Leaf test only | `callback` is only called on non-array elements; the sub-array itself is never tested |
| Recursive termination | Base case: no nested arrays → loop iterates scalars only and returns a flat result |
| Non-mutation | A new `result = []` is created at each recursion level; `this` / original array untouched |
| Flat array equivalence | On a 1-D array with no sub-arrays, `multiFilter` behaves identically to `Array.filter` |

---

## Difference from `Array.filter`

| | `Array.filter` | `Array.multiFilter` |
|---|---|---|
| Handles nesting | No — treats sub-arrays as opaque values | Yes — recurses into sub-arrays |
| Sub-array in result | Only if callback returns truthy for the array | Always (structure preserved) |
| Leaf test | Runs on all elements | Runs only on non-array elements |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) where n = total number of leaf elements across all nesting levels |
| Space | O(d) recursion depth + O(k) for the output arrays |
