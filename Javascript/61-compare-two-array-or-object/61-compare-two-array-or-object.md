# Compare Two Arrays or Objects

## Problem Statement

Implement `compare(current, other)` that deeply compares two arrays or objects and returns `true` if they are structurally equal, `false` otherwise.

```js
compare([1, 2, 3], [1, 2, 3]);           // true
compare([1, 2, 3], [1, 3, 2]);           // false  (order-sensitive)
compare({ a: 1, b: 2 }, { b: 2, a: 1 }); // true  (order-insensitive for keys)
compare([1, [2, 3]], [1, [2, 3]]);        // true  (nested arrays)
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Type detection | Use `Object.prototype.toString.call(val)` — returns `'[object Array]'` or `'[object Object]'`; safer than `typeof` (handles `null`, avoids conflating arrays and objects) |
| Input guard | Return `false` immediately if either input is not an array or object |
| Type mismatch | Return `false` if one is an array and the other is an object |
| Length check | `array.length` for arrays; `Object.keys(obj).length` for objects — short-circuit before iterating |
| Recursive equal helper | For each element, check if it is itself an array/object and recurse; otherwise do a strict `===` comparison |
| Function comparison | Convert functions to string with `.toString()` before comparing — note whitespace/formatting differences will cause inequality |
| Array order | Arrays are order-sensitive; `[1, 2, 3]` ≠ `[3, 2, 1]` |
| Object order | Objects are order-insensitive; keys are looked up by name, not position |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n × d) where n = total elements/keys and d = max nesting depth |
| Space | O(d) call-stack depth during recursion |
