# Find the Maximum Sum of Products of Two Arrays

---

## Problem Statement

Given two arrays of the same length, find the maximum possible sum of the element-wise products of the two arrays. To maximise the sum, sort both arrays in the same order so that the largest elements are multiplied together.

---

## Examples

### Example 1

**Input:**

```
arr1 = [1, 2, 3]
arr2 = [5, 4, 3]
```

**Output:**

```
26
```

**Explanation:**
Sort both ascending: arr1 = [1, 2, 3], arr2 = [3, 4, 5]. Products: 1×3 + 2×4 + 3×5 = 3 + 8 + 15 = 26.

---

### Example 2

**Input:**

```
arr1 = [4, 7, 5, 2]
arr2 = [2, 3, 2, 1]
```

**Output:**

```
41
```

**Explanation:**
Sort both ascending: arr1 = [2, 4, 5, 7], arr2 = [1, 2, 2, 3]. Products: 2×1 + 4×2 + 5×2 + 7×3 = 2 + 8 + 10 + 21 = 41.

---

### Example 3

**Input:**

```
arr1 = [1, 1, 1]
arr2 = [1, 1, 1]
```

**Output:**

```
3
```

**Explanation:**
All products are 1×1 = 1, summed across 3 elements gives 3.

---

### Example 4

**Input:**

```
arr1 = [10, 2]
arr2 = [5, 1]
```

**Output:**

```
52
```

**Explanation:**
Sort both ascending: [2, 10] and [1, 5]. Products: 2×1 + 10×5 = 2 + 50 = 52.

---

## Constraints

- 1 ≤ arr1.length = arr2.length ≤ 10^5
- -10^4 ≤ arr1[i], arr2[i] ≤ 10^4
- Both arrays must be sorted in the same order (both ascending or both descending) before multiplying

---

## Time Complexity

- O(n log n) — sorting both arrays dominates; the product-sum loop is O(n)

---

## Space Complexity

- O(1) — sorting is done in place; only a running sum variable is used

---
