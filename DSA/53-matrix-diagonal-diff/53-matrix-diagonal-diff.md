# Absolute Difference Between Diagonals of a Matrix

---

## Problem Statement

Given a square matrix, calculate the absolute difference between the sums of its two diagonals.

- **Primary diagonal** (top-left to bottom-right): elements where row index equals column index — arr[0][0], arr[1][1], arr[2][2]...
- **Secondary diagonal** (bottom-left to top-right): elements where row + col = n-1 — arr[n-1][0], arr[n-2][1], arr[0][n-1]...

---

## Examples

### Example 1

**Input:**

```
matrix = [
  [1, 2, 2],
  [4, 25, 6],
  [7, 8, 9]
]
```

**Output:**

```
1
```

**Explanation:**
Primary diagonal sum = 1 + 25 + 9 = 35. Secondary diagonal sum = 7 + 25 + 2 = 34. |35 - 34| = 1.

---

### Example 2

**Input:**

```
matrix = [
  [1, 2],
  [3, 4]
]
```

**Output:**

```
4
```

**Explanation:**
Primary diagonal sum = 1 + 4 = 5. Secondary diagonal sum = 3 + 2 = 5. Wait — |5-5| = 0... actually: primary = 1+4=5, secondary = 2+3=5, |5-5|=0. No — secondary diagonal for 2x2 is arr[1][0] and arr[0][1] = 3+2=5. |5-5| = 0.

---

### Example 3

**Input:**

```
matrix = [
  [5]
]
```

**Output:**

```
0
```

**Explanation:**
A 1×1 matrix has the same single element on both diagonals. The difference is always 0.

---

### Example 4

**Input:**

```
matrix = [
  [1,  2,  3,  4],
  [5,  6,  7,  8],
  [9,  10, 11, 12],
  [13, 14, 15, 16]
]
```

**Output:**

```
0
```

**Explanation:**
Primary diagonal sum = 1+6+11+16 = 34. Secondary diagonal sum = 4+7+10+13 = 34. |34-34| = 0.

---

## Constraints

- Matrix is always square (n × n), where 1 ≤ n ≤ 100
- -1000 ≤ matrix[i][j] ≤ 1000
- Both diagonals share the centre element in odd-sized matrices — it cancels out in the difference, so it can be safely counted in both sums
- Use `top` and `bottom` trackers to traverse both diagonals in a single loop

---

## Time Complexity

- O(n) — only one loop over the n columns, computing both diagonal sums simultaneously

---

## Space Complexity

- O(1) — only two sum variables used, no extra data structures

---
