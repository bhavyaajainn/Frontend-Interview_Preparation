# Counting Sort

---

## Problem Statement

Implement Counting Sort for three variants:
1. **Positive integers** — use element value directly as count array index
2. **Negative integers** — shift indices by subtracting the minimum element
3. **Characters (strings)** — use ASCII values (0–255) as count array indices

---

## Examples

### Example 1 — Positive Integers

**Input:**

```
arr = [1, 3, 2, 8, 5, 1, 5, 1, 2, 7]
```

**Output:**

```
[1, 1, 1, 2, 2, 3, 5, 5, 7, 8]
```

**Explanation:**
max = 8. Count array of size 9. Count frequencies → accumulate → place elements into output from right to left for stability.

---

### Example 2 — Negative Integers

**Input:**

```
arr = [-5, -10, 0, -3, 8, 5, -1, 10]
```

**Output:**

```
[-10, -5, -3, -1, 0, 5, 8, 10]
```

**Explanation:**
min = -10. range = max - min + 1 = 21. Index into count array using `arr[i] - min` to avoid negative indices.

---

### Example 3 — String Characters

**Input:**

```
str = "learnersbucket"
```

**Output:**

```
["a","b","c","e","e","e","k","l","n","r","r","s","t","u"]
```

**Explanation:**
Count array of size 256 (full ASCII). Use `charCodeAt()` as index. Build output, then convert ASCII codes back to characters.

---

### Example 4 — Single Element

**Input:**

```
arr = [5]
```

**Output:**

```
[5]
```

**Explanation:**
max = min = 5. Frequency count is 1 at index 5. Output array places 5 at index 0.

---

## Constraints

- Positive variant: all elements ≥ 0
- Negative variant: elements can be any integer; count array size = max - min + 1
- String variant: ASCII characters only (count array size = 256)
- Not suitable when max is very large (O(max) space makes it impractical)
- Output array built **right to left** (iterate from n-1 to 0) to preserve stability

---

## Time Complexity

- O(n + k) — where n = number of elements, k = range of values (max - min + 1)
- Same for best, average, and worst cases — no comparisons are made

---

## Space Complexity

- O(n + k) — output array (n) + count array (k)

---

## When to Use

- When the range of values k is not significantly larger than the number of elements n
- Fast for sorting small integers or characters
- Not suitable for floating point numbers or very large integer ranges

---
