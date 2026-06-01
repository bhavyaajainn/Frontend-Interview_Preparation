# Polyfill for Array.map

## Problem Statement

Implement `Array.prototype.myMap(callback)` that behaves like the native `Array.map`. It returns a **new array** of the same length where each element is the value returned by `callback` for the corresponding element.

```js
[1, 2, 3].myMap(e => e * 2); // [2, 4, 6]
```

---

## Implementation

```js
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result[i] = callback(this[i], i, this);
  }
  return result;
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `this` | Inside the method, `this` is the array — use a regular `function`, not an arrow, so `this` is bound correctly |
| Callback signature | `callback(element, index, array)` — must pass all three arguments, matching the native API |
| Same-length output | `result[i] = ...` ensures the output index matches the input index (important when elements map to `undefined`) |
| New array | Build a fresh `result = []`; never modify `this` |
| `indexOf` guard (article code) | The article uses `indexOf` to check element presence — this is unnecessary and breaks sparse arrays; a simple `for` loop is cleaner and correct |

---

## map vs filter

| | `map` | `filter` |
|---|---|---|
| Output length | Always same as input | ≤ input (only passing elements) |
| Callback return | Transformed value | Truthy/falsy |
| Purpose | Transform each element | Select elements |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — visits every element once |
| Space | O(n) — output array is always the same size as the input |
