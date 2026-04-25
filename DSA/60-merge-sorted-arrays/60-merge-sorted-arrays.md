# Merge Two Sorted Arrays

---

## Problem Statement

Given two arrays sorted in the same order (both ascending or both descending), merge them into a single sorted array maintaining the same order. A boolean flag determines the sort direction.

---

## Examples

### Example 1 — Descending

**Input:**

```
arr1 = [11, 9, 7, 6, 5]
arr2 = [15, 12, 10, 8, 6]
desc = true
```

**Output:**

```
[15, 12, 11, 10, 9, 8, 7, 6, 6, 5]
```

**Explanation:**
Both arrays are sorted in descending order. The larger of the two front elements is picked each iteration. After one array is exhausted, the remaining elements of the other are appended directly.

---

### Example 2 — Ascending

**Input:**

```
arr1 = [5, 6, 7, 9, 11]
arr2 = [6, 8, 10, 12, 15]
desc = false
```

**Output:**

```
[5, 6, 6, 7, 8, 9, 10, 11, 12, 15]
```

**Explanation:**
Both arrays are sorted in ascending order. The smaller of the two front elements is picked each iteration. Duplicate values (6) are preserved in the result.

---

### Example 3 — One empty array

**Input:**

```
arr1 = []
arr2 = [1, 2, 3]
desc = false
```

**Output:**

```
[1, 2, 3]
```

**Explanation:**
The main while loop never executes. The remaining-elements loop for arr2 appends all elements directly.

---

### Example 4 — Arrays of different lengths

**Input:**

```
arr1 = [1, 5]
arr2 = [2, 3, 4, 6]
desc = false
```

**Output:**

```
[1, 2, 3, 4, 5, 6]
```

**Explanation:**
After arr1 is exhausted at index 2, the remaining [4, 6] from arr2 are appended directly.

---

## Constraints

- Both arrays must be sorted in the same direction before merging
- 0 ≤ arr1.length, arr2.length ≤ 10^5
- Duplicate values across arrays are preserved in the output
- The main loop runs until one array is fully consumed — then the remaining elements of the other are appended without further comparisons

---

## Time Complexity

- O(n1 + n2) — each element from both arrays is visited exactly once

---

## Space Complexity

- O(n1 + n2) — a new merged array of combined length is created

---
