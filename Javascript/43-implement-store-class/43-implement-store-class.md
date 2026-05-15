# Implement Store Class (HashMap)

## Problem Statement

Implement a `Store` class with three methods:

- `set(key, value)` — stores a key-value pair (overwrites if key exists).
- `get(key)` — returns the value, or `undefined` if the key doesn't exist.
- `has(key)` — returns `true` if the key exists, `false` otherwise.

---

## Approach

```js
class Store {
  constructor() {
    this.list = {};
  }

  set(key, value) {
    this.list[key] = value;
  }

  get(key) {
    return this.list[key];
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.list, key);
  }
}
```

---

## Critical Bug in the Course Solution

The course uses `!!this.list[key]` for `has`:

```js
// BUGGY
this.has = function(key) { return !!this.list[key]; }
```

This coerces the value to boolean, so **any falsy value is treated as "key not found"**:

| Key value | `!!value` | Correct `has` |
|---|---|---|
| `0` | `false` ← wrong | `true` |
| `false` | `false` ← wrong | `true` |
| `""` | `false` ← wrong | `true` |
| `null` | `false` ← wrong | `true` |

**Fix:** use `hasOwnProperty` or the `in` operator — both check key existence, not value truthiness.

```js
// Option 1 — safest (guards against prototype pollution)
Object.prototype.hasOwnProperty.call(this.list, key)

// Option 2 — concise
key in this.list
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Plain object `{}` as store | O(1) average set/get/has via property lookup |
| `hasOwnProperty` vs `in` | `in` also finds inherited keys (e.g., `toString`); `hasOwnProperty` is safer for a hash map |
| `Object.prototype.hasOwnProperty.call(...)` | Defends against edge case where a key named `"hasOwnProperty"` overwrites the method |
| Independent instances | Each instance gets its own `this.list = {}` in the constructor |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `set` | O(1) average |
| `get` | O(1) average |
| `has` | O(1) average |
| Space | O(n) — n = number of stored entries |
