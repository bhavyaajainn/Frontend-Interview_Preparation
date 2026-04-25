# Print the Chess Board Pattern

---

## Problem Statement

Given the number of rows and columns, print a chess board pattern where `#` represents a black box and ` ` (space) represents a white box. The top-left cell is always a space.

---

## Examples

### Example 1

**Input:**

```
rows = 3, columns = 5
```

**Output:**

```
" # # "
"# # #"
" # # "
```

**Explanation:**
Odd-indexed rows (0, 2) start with a space; even-indexed rows (1) start with `#`. In each row the character alternates with every column step.

---

### Example 2

**Input:**

```
rows = 8, columns = 8
```

**Output:**

```
" # # # #"
"# # # # "
" # # # #"
"# # # # "
" # # # #"
"# # # # "
" # # # #"
"# # # # "
```

**Explanation:**
Standard 8×8 chessboard. Each row starts with the opposite character of the previous row, and alternates across all 8 columns.

---

### Example 3

**Input:**

```
rows = 1, columns = 1
```

**Output:**

```
" "
```

**Explanation:**
A 1×1 board has only the top-left cell, which is always a space.

---

### Example 4

**Input:**

```
rows = 2, columns = 4
```

**Output:**

```
" # #"
"# # "
```

**Explanation:**
Row 0 starts with space and alternates: ` # #`. Row 1 starts with `#` and alternates: `# # `.

---

## Constraints

- 1 ≤ rows, columns ≤ 100
- The starting character of each row flips based on whether the row index is odd or even
- Within a row, the character swaps on every column step — so the swap must happen before appending, not after

---

## Time Complexity

- O(m × n) — every cell of the m×n grid is visited exactly once

---

## Space Complexity

- O(1) — only the current row string is held in memory at a time (not the full grid)

---
