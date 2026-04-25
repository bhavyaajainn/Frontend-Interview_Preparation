# Print the Pyramid Pattern

---

## Problem Statement

Given the number of rows, print three variants of a pyramid pattern using `*`:

1. **Left pyramid** — stars aligned to the left, growing downward
2. **Right pyramid** — stars aligned to the right (left-padded with spaces)
3. **Complete pyramid** — centred, with spaces on both sides, stars increasing by 2 each row (odd numbers: 1, 3, 5, ...)

---

## Examples

### Example 1 — Left Pyramid

**Input:**

```
rows = 5
```

**Output:**

```
"*"
"**"
"***"
"****"
"*****"
```

**Explanation:**
Row i prints exactly i stars. No padding needed.

---

### Example 2 — Right Pyramid

**Input:**

```
rows = 5
```

**Output:**

```
"    *"
"   **"
"  ***"
" ****"
"*****"
```

**Explanation:**
Row i has (rows - i) leading spaces followed by i stars, so the column of stars aligns to the right edge.

---

### Example 3 — Complete Pyramid

**Input:**

```
rows = 5
```

**Output:**

```
"    *    "
"   ***   "
"  *****  "
" ******* "
"*********"
```

**Explanation:**
Row i has (rows - i) spaces on the left, (2×i - 1) stars in the middle, and (rows - i) spaces on the right. Stars per row follow the odd number sequence: 1, 3, 5, 7, 9.

---

### Example 4 — Edge Case

**Input:**

```
rows = 1
```

**Output (all three variants):**

```
"*"         ← left
"*"         ← right
"*"         ← complete
```

**Explanation:**
A single-row pyramid is just one star with no padding in all three variants.

---

## Constraints

- 1 ≤ rows ≤ 50
- Left pyramid: row i → i stars
- Right pyramid: row i → (rows - i) spaces + i stars
- Complete pyramid: row i → (rows - i) spaces + (2i - 1) stars + (rows - i) spaces

---

## Time Complexity

- O(n²) for all three variants — inner loops together iterate O(n) times per row, across n rows

---

## Space Complexity

- O(1) — only the current row string is held in memory; the full grid is never stored

---
