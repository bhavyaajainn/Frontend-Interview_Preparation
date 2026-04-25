# Selection Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using the Selection Sort algorithm. Selection sort repeatedly finds the minimum element from the unsorted portion and places it at the beginning of the sorted portion.

---

## Examples

### Example 1

**Input:**

```
arr = [1, 8, 2, 4, 5]
```

**Output:**

```
[1, 2, 4, 5, 8]
```

**Explanation:**
Pass 1: min of [1,8,2,4,5] = 1 → already at index 0 → [1, 8, 2, 4, 5]
Pass 2: min of [8,2,4,5] = 2 → swap with 8 → [1, 2, 8, 4, 5]
Pass 3: min of [8,4,5] = 4 → swap with 8 → [1, 2, 4, 8, 5]
Pass 4: min of [8,5] = 5 → swap with 8 → [1, 2, 4, 5, 8]

---

### Example 2

**Input:**

```
arr = [64, 25, 12, 22, 11]
```

**Output:**

```
[11, 12, 22, 25, 64]
```

**Explanation:**
Each pass selects the minimum from the remaining unsorted subarray and swaps it into the correct sorted position.

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
A single-element array is already sorted. The outer loop condition (i < arr.length - 1 = 0) is never satisfied.

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
Worst case — the array is in reverse order. Every pass performs a swap. Total swaps = n-1.

---

## Constraints

- 1 ≤ arr.length ≤ 10^4
- The outer loop runs from index 0 to n−2; no need to process the last element since it will be the only remaining element
- The inner loop finds the minimum index in the unsorted portion — swapping only if `minIndex !== i` avoids unnecessary swaps
- In-place sort: no extra array is needed

---

## Time Complexity

- O(n²) — two nested loops, regardless of whether the input is sorted or not (no early exit)

---

## Space Complexity

- O(1) — in-place sorting; only a temp variable or destructured swap is used

---
