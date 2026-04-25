# Merge Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using the Merge Sort algorithm. Merge sort uses the divide-and-conquer paradigm: recursively split the array in half, sort each half, then merge the two sorted halves back together.

---

## Examples

### Example 1

**Input:**

```
arr = [10, 7, 8, 9, 1, 5]
```

**Output:**

```
[1, 5, 7, 8, 9, 10]
```

**Explanation:**
Split → [10,7,8] and [9,1,5]. Each half is recursively split and sorted. Merge step compares front elements of each sorted half and picks the smaller one each time.

---

### Example 2

**Input:**

```
arr = [30, 20, 10, 50, 22, 33, 55]
```

**Output:**

```
[10, 20, 22, 30, 33, 50, 55]
```

**Explanation:**
Odd-length array — left half gets the extra element after `Math.floor(n/2)` split.

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
Base case: array of length 1 is already sorted. Return immediately.

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
Worst case input for naive sorts, but merge sort still runs in O(n log n) — it is not affected by input order.

---

## Constraints

- 1 ≤ arr.length ≤ 10^5
- Base case: `arr.length === 1` — return the array as-is
- Mid point: `Math.floor(arr.length / 2)`
- After one array is exhausted in the merge step, append remaining elements of the other directly (no more comparisons needed)
- Recurrence relation: T(n) = 2T(n/2) + n → solves to O(n log n)

---

## Time Complexity

| Case | Time |
|---|---|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n log n) |

Unlike quicksort, merge sort is O(n log n) in all cases.

---

## Space Complexity

- O(n) — temporary arrays are created during each merge step; total auxiliary space across all levels is O(n)

---

## Properties

- **Stable**: Yes — equal elements from the left subarray are always placed before those from the right
- **Not in-place**: A temporary result array is used in each merge
- **Divide and conquer**: Invented in 1945; still widely used (e.g. TimSort in Python and Java)

---
