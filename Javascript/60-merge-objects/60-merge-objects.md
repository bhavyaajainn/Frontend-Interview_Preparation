# Merge Two or More Objects

## Problem Statement

Implement `merge(...objects)` that supports both **shallow** and **deep** merging:

- `merge(obj1, obj2, ...)` — shallow merge (last writer wins for conflicting keys).
- `merge(true, obj1, obj2, ...)` — deep merge (nested objects are recursively merged, not overwritten).

```js
// Shallow
merge(obj1, obj2);
// → { ...obj1, ...obj2 }  (obj2.nature overwrites obj1.nature entirely)

// Deep
merge(true, obj1, obj2);
// → nested objects are merged together, not replaced
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| First-arg flag | If `typeof arguments[0] === 'boolean'`, treat it as the `deep` flag and start iterating from index 1 |
| `hasOwnProperty` | Only merge own properties — avoids pulling in prototype methods |
| Plain object check | `Object.prototype.toString.call(val) === '[object Object]'` — safer than `typeof val === 'object'` (handles `null`, arrays correctly) |
| Deep recursion fix | When recursing, pass the `deep` flag forward: `merge(true, target[prop], obj[prop])` — the article's version omits this and loses the flag |
| Last writer wins | For primitive conflicts, the later object's value overwrites earlier ones |
| Spread / `Object.assign` | Built-in shallow alternatives; `merge` is the custom implementation |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Shallow | O(n) where n = total keys across all objects |
| Deep | O(n × d) where d = max nesting depth |
| Space | O(n) for the new target object |
