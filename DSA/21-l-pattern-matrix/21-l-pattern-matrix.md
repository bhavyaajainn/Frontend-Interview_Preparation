# Print Matrix in L Pattern

---

## Problem Statement

Given a 2D matrix, print its elements in an L pattern: print the first column top to bottom, then the last row left to right, then the next column top to bottom, and so on, until all elements are printed.

---

## Examples

### Example 1

**Input:**

```
1 2 3 4
5 6 7 8
9 10 11 12
13 14 15 16
17 18 19 20
```

**Output:**

```
1
5
9
13
17
18
19
20
2
6
10
14
15
16
3
7
11
12
4
8
```

**Explanation:**
Print first column down, then last row right, then next column down, then next row right, etc.

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
3
4
2
```

**Explanation:**
First column down, then last row right, then next column down.

---

### Example 3

**Input:**

```
1
2
3
```

**Output:**

```
1
2
3
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

- O(m _ (m + n)) or O(n _ (m + n)), where m is the number of rows and n is the number of columns.

---

## Space Complexity

- O(1)

---
