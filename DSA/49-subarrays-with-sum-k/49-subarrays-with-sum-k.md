# Number of Subarrays with Given Sum K

---

## Problem Statement

Given an integer array and a target sum K, return the count of all subarrays whose elements sum to exactly K. The array may contain negative numbers.

---

## Examples

### Example 1

**Input:**

```
arr = [3, 4, -7, 1, 3, 3, 1, -4]
k = 7
```

**Output:**

```
4
```

**Explanation:**
The 4 subarrays that sum to 7 are: [3,4], [3,4,-7,1,3,3], [1,3,3], [3,3,1,-4,... wait — [3,4], [1,3,3], [3,4,-7,1,3,3], and [3,3,1]. Each sums to 7.

---

### Example 2

**Input:**

```
arr = [1, 1, 1]
k = 2
```

**Output:**

```
2
```

**Explanation:**
The subarrays [1,1] (indices 0–1) and [1,1] (indices 1–2) both sum to 2.

---

### Example 3

**Input:**

```
arr = [1, 2, 3]
k = 3
```

**Output:**

```
2
```

**Explanation:**
[3] (index 2) and [1,2] (indices 0–1) both sum to 3.

---

### Example 4

**Input:**

```
arr = [1, -1, 1]
k = 0
```

**Output:**

```
2
```

**Explanation:**
[1,-1] (indices 0–1) and [-1,1] (indices 1–2) both sum to 0. Negative numbers allow subarrays to cancel out.

---

## Constraints

- 1 ≤ arr.length ≤ 2×10^4
- -1000 ≤ arr[i] ≤ 1000
- -10^7 ≤ k ≤ 10^7
- Array may contain negative numbers — a sliding window approach will not work; prefix sum with hashmap is required
- Key insight: if `prefixSum[j] - prefixSum[i] === k`, then subarray from i+1 to j sums to k

---

## Time Complexity

| Approach | Time Complexity |
|---|---|
| Brute Force (nested loops) | O(n²) |
| Optimised (prefix sum + hashmap) | O(n) |

---

## Space Complexity

| Approach | Space Complexity |
|---|---|
| Brute Force | O(1) |
| Optimised (hashmap stores prefix sums) | O(n) |

---
