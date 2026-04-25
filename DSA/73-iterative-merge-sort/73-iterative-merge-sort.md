# Iterative Merge Sort (Bottom-Up)

---

## Problem Statement

Given an array of integers, sort it in ascending order using the iterative (bottom-up) merge sort algorithm. Unlike the recursive top-down approach, the iterative version starts by treating each element as a sorted sub-array of size 1, then repeatedly merges adjacent sub-arrays of increasing size.

---

## Examples

### Example 1

**Input:**

```
arr = [30, 20, 10, 50, 22, 33, 55]
```

**Output:**

```
[10, 20, 22, 30, 33, 50, 55]
```

**Explanation:**
Pass 1 (size=1): merge pairs → [20,30], [10,50], [22,33], [55]
Pass 2 (size=2): merge groups of 4 → [10,20,30,50], [22,33,55]
Pass 3 (size=4): merge → [10,20,22,30,33,50,55]

---

### Example 2

**Input:**

```
arr = [10, 7, 8, 9, 1, 5]
```

**Output:**

```
[1, 5, 7, 8, 9, 10]
```

**Explanation:**
Even-length array. All passes pair up cleanly with no remainder sub-array.

---

### Example 3

**Input:**

```
arr = [1]
```

**Output:**

```
[1]
```

**Explanation:**
The outer loop `size = 1; size < n = 1` is false from the start. The original copy is returned unchanged.

---

### Example 4

**Input:**

```
arr = [5, 4, 3, 2, 1]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Worst case for naive sorts. Merge sort handles it in O(n log n) regardless of input order.

---

## Constraints

- 1 ≤ arr.length ≤ 10^5
- Outer loop doubles `size` each pass: 1 → 2 → 4 → 8 ... → n
- `right` and `rightLimit` are clamped to `Math.min(..., n)` to handle arrays whose length is not a power of 2
- Two buffers (`sorted` and `buffer`) are swapped after each full pass — no extra allocation per merge call
- No recursion — stack overflow is not a concern

---

## Time Complexity

- O(n log n) — log n passes, each doing O(n) merge work

---

## Space Complexity

- O(n) — one extra buffer array of the same length as the input

---

## Key Difference from Recursive Merge Sort

| | Recursive (Top-Down) | Iterative (Bottom-Up) |
|---|---|---|
| Call stack | O(log n) frames | O(1) — no recursion |
| Space | O(n) aux + O(log n) stack | O(n) aux only |
| Approach | Divide first, merge on unwind | Merge from size=1 upward |

---
