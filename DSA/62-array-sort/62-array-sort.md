# How to Use Array Sort in JavaScript

---

## Problem Statement

Implement sorting for: numbers (ascending/descending), strings (ascending/descending), non-ASCII strings, and arrays of objects (including multi-key / nested sorts) using JavaScript's built-in `Array.prototype.sort()` with a custom `compareFunction`.

---

## Examples

### Example 1 — Numbers Ascending

**Input:**

```
arr = [1, 3, 5, 2, 9, 11, 8, 4]
```

**Output:**

```
[1, 2, 3, 4, 5, 8, 9, 11]
```

**Explanation:**
`arr.sort((a, b) => a - b)` — returns negative when a < b (a comes first), positive when a > b (b comes first).

---

### Example 2 — Numbers Descending

**Input:**

```
arr = [1, 3, 5, 2, 9, 11, 8, 4]
```

**Output:**

```
[11, 9, 8, 5, 4, 3, 2, 1]
```

**Explanation:**
`arr.sort((a, b) => b - a)` — reverses the comparison direction.

---

### Example 3 — Strings Ascending

**Input:**

```
arr = ["prashant", "aman", "yogesh", "sachin", "pranav"]
```

**Output:**

```
["aman", "pranav", "prashant", "sachin", "yogesh"]
```

**Explanation:**
String comparison uses `<` and `>` operators which compare lexicographically by Unicode value.

---

### Example 4 — Objects with Multi-Key Sort

**Input:**

```
arr = [
  { name: "prashant", age: 23 },
  { name: "aman",     age: 24 },
  { name: "yogesh",   age: 24 },
  { name: "sachin",   age: 25 },
  { name: "pranav",   age: 22 }
]
Sort: age ascending, then name descending on tie
```

**Output:**

```
[
  { name: "pranav",   age: 22 },
  { name: "prashant", age: 23 },
  { name: "yogesh",   age: 24 },
  { name: "aman",     age: 24 },
  { name: "sachin",   age: 25 }
]
```

**Explanation:**
When ages are equal (24), names are sorted in descending order — "yogesh" comes before "aman".

---

## Constraints

- `sort()` mutates the original array — no copy is made
- Without a `compareFunction`, elements are sorted as strings by Unicode code point (e.g. `[10, 9, 2]` sorts to `[10, 2, 9]` — a common bug)
- `compareFunction(a, b)` rules: return < 0 → a first, return > 0 → b first, return 0 → order unchanged relative to each other
- For non-ASCII / accented strings, use `a.localeCompare(b)` instead of `<`/`>`
- V8 (Chrome/Node): uses TimSort (stable, O(n log n))

---

## Time Complexity

- O(n log n) — JavaScript engines implement TimSort or IntroSort

---

## Space Complexity

- O(log n) — stack space for recursive sort partitions (in-place sort)

---
