# Find the Biggest Perfect Square in an Array

---

## Problem Statement

Given an array of integers, find the largest perfect square number in the array. If no perfect square exists, return -1.

---

## Examples

### Example 1

**Input:**

```
[1, 10, 19, 27, 25, 23]
```

**Output:**

```
25
```

**Explanation:**
25 is the largest perfect square in the array.

---

### Example 2

**Input:**

```
[7, 33, 55, 26, 18]
```

**Output:**

```
-1
```

**Explanation:**
There is no perfect square in the array.

---

### Example 3

**Input:**

```
[16, 20, 25, 2, 3, 10]
```

**Output:**

```
25
```

**Explanation:**
Both 16 and 25 are perfect squares, but 25 is the largest.

---

### Example 4

**Input:**

```
[17, 20, 27, 2, 3, 10]
```

**Output:**

```
-1
```

**Explanation:**
No perfect square exists in the array.

---

## Constraints

- 1 ≤ length of array ≤ 10⁴
- -10⁹ ≤ array[i] ≤ 10⁹

---

## Time Complexity

- O(n log x), where n is the number of elements in the array and x is the value of the largest element. Each element is checked for being a perfect square.

---

## Space Complexity

- O(1), as only a constant amount of extra space is used.

---
