# Quick Sort — Iterative

---

## Problem Statement

Given an array of integers, sort it in ascending order using an iterative (non-recursive) implementation of Quick Sort. The recursion is replaced by an explicit stack that stores the start and end indices of sub-arrays that still need to be sorted.

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
Push {start:0, end:5}. Pop → partition around pivot → pivot lands at index 1 (value 5). Push {0,0} and {2,5}. Continue until stack is empty.

---

### Example 2

**Input:**

```
arr = [5, 4, 3, 2, 1]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Reverse sorted with last-element pivot is worst case — every partition puts all elements on one side. Stack reaches max depth n.

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
start === end (0 === 0) so nothing is pushed and the initial push-pop cycle does nothing meaningful. Array returned as-is.

---

### Example 4

**Input:**

```
arr = [3, 1, 2]
```

**Output:**

```
[1, 2, 3]
```

**Explanation:**
Initial partition (last pivot = 2) → pivot index 1. Push {0,0} (size 1, skip) and {2,2} (size 1, skip). Done in one partition step.

---

## Constraints

- 1 ≤ arr.length ≤ 10^5
- A sub-array with `start >= end` should not be pushed (or should be skipped when popped) — it is already sorted
- The stack stores `{x: start, y: end}` pairs for pending partitions
- Uses the same `partitionHigh` (last element as pivot) as the recursive version

---

## Time Complexity

| Case | Time |
|---|---|
| Average | O(n log n) |
| Worst (sorted + last pivot) | O(n²) |

---

## Space Complexity

- O(log n) — stack holds at most log n pending sub-arrays on average
- O(n) — worst case stack depth (already sorted with bad pivot)

---

## Key Difference from Recursive Quick Sort

The iterative version replaces the function call stack with an explicit stack of index pairs. This avoids potential stack overflow on very large arrays, and the stack depth can be bounded to O(log n) by always pushing the larger partition last (smaller partition first).

---
