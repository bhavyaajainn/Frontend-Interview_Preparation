# Print Matrix in Zigzag Format

---

## Problem Statement

Given a 2D matrix, print its elements in zigzag format: print the first row left to right, the second row right to left, the third row left to right, and so on.

---

## Examples

### Example 1

**Input:**

```
1 2 3 4
5 6 7 8
9 0 1 2
```

**Output:**

```
1
2
3
4
8
7
6
5
9
0
1
2
```

**Explanation:**
Rows are printed alternately left-to-right and right-to-left.

---

### Example 2

**Input:**

```
1 2
3 4
```

**Output:**

```
1
2
4
3
```

**Explanation:**
First row left-to-right, second row right-to-left.

---

### Example 3

**Input:**

```
5
6
```

**Output:**

```
5
6
```

**Explanation:**
Single column matrix.

---

### Example 4

**Input:**

```

```

**Output:**

```

```

**Explanation:**
Empty matrix.

---

## Constraints

- 0 ≤ number of rows, columns ≤ 10³

---

## Time Complexity

- O(m \* n), where m is the number of rows and n is the number of columns.

---

## Space Complexity

- O(1)

---
