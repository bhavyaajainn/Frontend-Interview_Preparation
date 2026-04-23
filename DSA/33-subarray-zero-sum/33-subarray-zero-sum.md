# Algorithm to Check if a Subarray with 0 Sum Exists

---

## Problem Statement

Given an array of integers, determine whether any contiguous subarray exists whose elements sum to zero. Return `true` if such a subarray exists, otherwise return `false`.

---

## Examples

### Example 1

**Input:**

```
[3, 4, -7, 3, 1, 3, 1, -4, -2, -2]
```

**Output:**

```
true
```

**Explanation:**
Multiple zero-sum subarrays exist: `[3, 4, -7]`, `[4, -7, 3]`, `[-7, 3, 1, 3]`, `[3, 1, -4]`, and more.

---

### Example 2

**Input:**

```
[3, 5]
```

**Output:**

```
false
```

**Explanation:**
Neither individual element nor their sum equals zero.

---

### Example 3

**Input:**

```
[0, 1, 2]
```

**Output:**

```
true
```

**Explanation:**
The first element itself is 0, which is a valid zero-sum subarray of length 1.

---

### Example 4

**Input:**

```
[1, -1, 3, 2]
```

**Output:**

```
true
```

**Explanation:**
The subarray `[1, -1]` sums to zero.

---

## Constraints

- 1 ≤ arr.length ≤ 10^5
- -10^9 ≤ arr[i] ≤ 10^9
- A single element equal to 0 is a valid zero-sum subarray
- The subarray must be contiguous

---

## Time Complexity

| Method | Complexity |
|---|---|
| Naive (nested loops) | O(n²) — checks every possible subarray |
| Using Set (prefix sum) | O(n) — single pass through the array |

---

## Space Complexity

| Method | Complexity |
|---|---|
| Naive (nested loops) | O(1) — no extra space |
| Using Set (prefix sum) | O(n) — stores prefix sums in a Set |

---
