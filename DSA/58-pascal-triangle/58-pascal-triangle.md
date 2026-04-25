# Print the Pascal Triangle Pattern

---

## Problem Statement

Given the number of rows, print Pascal's Triangle in a centred pyramid shape. Each number in the triangle is the sum of the two numbers directly above it. The outermost values are always 1.

---

## Examples

### Example 1

**Input:**

```
rows = 5
```

**Output:**

```
"     1      "
"    1 1     "
"   1 2 1    "
"  1 3 3 1   "
" 1 4 6 4 1  "
```

**Explanation:**
Row 0: [1]. Row 1: [1, 1]. Row 2: [1, 2, 1]. Row 3: [1, 3, 3, 1]. Row 4: [1, 4, 6, 4, 1].
Each number is generated using: `number = number * (i - j) / (j + 1)` where i is the row and j is the column index.

---

### Example 2

**Input:**

```
rows = 3
```

**Output:**

```
"   1    "
"  1 1   "
" 1 2 1  "
```

**Explanation:**
Row 2 contains [1, 2, 1] — the middle value 2 is the sum of the two 1s above it.

---

### Example 3

**Input:**

```
rows = 1
```

**Output:**

```
"  1   "
```

**Explanation:**
A single-row Pascal triangle contains only the number 1.

---

### Example 4

**Input:**

```
rows = 4
```

**Output:**

```
"    1     "
"   1 1    "
"  1 2 1   "
" 1 3 3 1  "
```

**Explanation:**
Row 3 contains [1, 3, 3, 1]. The values 3 are each the sum of 1+2 and 2+1 from row 2.

---

## Constraints

- 1 ≤ rows ≤ 20 (numbers grow quickly due to combinatorics)
- Each row i has i+1 numbers (0-indexed)
- Numbers are generated iteratively using the formula: `number = number * (i - j) / (j + 1)` — equivalent to computing binomial coefficients C(i, j)
- Left padding = (rows - i) spaces, right padding mirrors the left

---

## Time Complexity

- O(n²) — inner loops together run O(n) per row, across n rows

---

## Space Complexity

- O(1) — only the current row string and the running number variable are stored

---
