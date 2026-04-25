# Print the Floyd Triangle

---

## Problem Statement

Given the number of rows, print the Floyd Triangle — a right-angled triangle where consecutive natural numbers fill each row left to right, starting from 1.

Row 1 contains 1 number, row 2 contains 2 numbers, row 3 contains 3 numbers, and so on.

---

## Examples

### Example 1

**Input:**

```
rows = 5
```

**Output:**

```
"1"
"2 3"
"4 5 6"
"7 8 9 10"
"11 12 13 14 15"
```

**Explanation:**
Row 1 has 1 number starting at 1. Row 2 has 2 numbers starting at 2. Row i starts where the previous row left off. Total numbers printed = rows×(rows+1)/2 = 15.

---

### Example 2

**Input:**

```
rows = 3
```

**Output:**

```
"1"
"2 3"
"4 5 6"
```

**Explanation:**
Row 3 contains numbers 4, 5, 6. The running counter k tracks the next number to print across all rows.

---

### Example 3

**Input:**

```
rows = 1
```

**Output:**

```
"1"
```

**Explanation:**
A single-row triangle prints just the number 1.

---

### Example 4

**Input:**

```
rows = 4
```

**Output:**

```
"1"
"2 3"
"4 5 6"
"7 8 9 10"
```

**Explanation:**
Row 4 starts at 7 (1+2+3+1) and ends at 10. Numbers in row i start at (i×(i−1)/2)+1.

---

## Constraints

- 1 ≤ rows ≤ 100
- A global counter k (starting at 0) is incremented inside the inner loop to track the next number
- Numbers on each row are separated by a single space; no trailing space after the last number on each row
- Total numbers across all rows = rows×(rows+1)/2

---

## Time Complexity

- O(n²) — inner loop runs i times per row, summing to 1+2+...+n = n(n+1)/2

---

## Space Complexity

- O(1) — only the current row string and counter k are stored

---
