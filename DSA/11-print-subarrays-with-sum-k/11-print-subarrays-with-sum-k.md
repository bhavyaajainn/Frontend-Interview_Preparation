# Print All Subarrays with a Given Sum k in an Array

---

## Problem Statement

Given an array of integers and a target sum k, print all consecutive subarrays whose elements sum up to k.

---

## Examples

### Example 1

**Input:**

```
[3, 4, -7, 1, 3, 3, 1, -4], k = 7
```

**Output:**

```
[3, 4]
[3, 4, -7, 1, 3, 3]
[1, 3, 3]
[3, 3, 1]
```

**Explanation:**
All subarrays above sum to 7.

---

### Example 2

**Input:**

```
[1, 2, 3, 4, 5], k = 5
```

**Output:**

```
[2, 3]
[5]
```

**Explanation:**
Both [2, 3] and [5] sum to 5.

---

### Example 3

**Input:**

```
[1, 1, 1, 1], k = 2
```

**Output:**

```
[1, 1]
[1, 1]
[1, 1]
```

**Explanation:**
There are three subarrays that sum to 2.

---

### Example 4

**Input:**

```
[5, -1, 2, 3], k = 4
```

**Output:**

```
[5, -1]
[2, 3]
```

**Explanation:**
Both [5, -1] and [2, 3] sum to 4.

---

## Constraints

- 1 ≤ length of array ≤ 10⁴
- -10⁹ ≤ array[i] ≤ 10⁹
- -10⁹ ≤ k ≤ 10⁹

---

## Time Complexity

- O(n²), where n is the number of elements in the array. Each subarray is checked.

---

## Space Complexity

- O(n), for storing subarrays in the worst case.

---
