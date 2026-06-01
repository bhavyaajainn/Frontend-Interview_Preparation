# Polyfill for Array.filter

## Problem Statement

Implement `Array.prototype.myFilter(callback)` that behaves like the native `Array.filter`. It returns a **new array** containing every element for which `callback` returns truthy.

```js
[1, 2, 3, 4, 5, 6].myFilter(e => e % 2 === 0); // [2, 4, 6]
```

---

## Implementation

```js
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `this` | Inside the method, `this` refers to the array the method is called on — use a regular `function`, not an arrow function, so `this` binding works correctly |
| Callback signature | `callback(element, index, array)` — must pass all three arguments, matching the native API |
| New array | Push passing elements into a fresh `result = []`; never mutate `this` |
| Truthy check | `if (callback(...))` — any truthy return value (not just `true`) includes the element |
| Empty array | Loop runs 0 times; returns `[]` — no special case needed |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — visits every element once |
| Space | O(k) where k = number of elements that pass the test (output array) |
