# Bubble Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using the Bubble Sort algorithm. Implement both the basic version and the optimised version with an early-exit flag.

Bubble sort repeatedly compares adjacent elements and swaps them if they are in the wrong order, causing larger elements to "bubble up" to the end of the array after each pass.

---

## Examples

### Example 1

**Input:**

```
arr = [-5, 2, 33, 10, -7]
```

**Output:**

```
[-7, -5, 2, 10, 33]
```

**Explanation:**
Pass 1 bubbles 33 to the last position. Pass 2 bubbles 10 to second-last. And so on until sorted.

---

### Example 2

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Already sorted. The basic version still runs O(n²) comparisons. The optimised version detects no swaps in the first pass and exits in O(n).

---

### Example 3

**Input:**

```
arr = [5, 4, 3, 2, 1]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Worst case — reverse sorted. Every adjacent pair is out of order on every pass. n-1 passes with n-1 comparisons each.

---

### Example 4

**Input:**

```
arr = [3]
```

**Output:**

```
[3]
```

**Explanation:**
Single element. Outer loop condition (i < n-1 = 0) is never true. Returns immediately.

---

## Constraints

- 1 ≤ arr.length ≤ 10^4
- Elements can be any integer (including negatives)
- The inner loop upper bound shrinks by 1 each outer pass: `j <= n - i - 1` — elements at the end are already sorted after each pass
- **Optimised version**: reset `swapped = false` before each outer pass and break early if no swap occurs

---

## Time Complexity

| Case | Time |
|---|---|
| Best (already sorted, optimised) | O(n) |
| Average | O(n²) |
| Worst (reverse sorted) | O(n²) |

---

## Space Complexity

- O(1) — in-place sort; only a swap temp or destructuring used

---

## Properties

- **Stable**: Yes — equal elements are never swapped, preserving their original relative order
- **In-place**: Yes — no extra array needed
- **Adaptive** (optimised): Yes — exits early when array is already sorted

---
