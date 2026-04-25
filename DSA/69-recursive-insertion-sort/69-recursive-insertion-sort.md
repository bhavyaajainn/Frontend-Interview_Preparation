# Recursive Insertion Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using a recursive implementation of Insertion Sort. The recursive approach first sorts the first n-1 elements (via recursion), then inserts the nth element into its correct position within the already-sorted prefix.

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
Call stack unwinds from i=1 up to i=5. At each level, the element at index i-1 is inserted into the sorted subarray arr[0..i-2].

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
Worst case — every element must shift all the way to index 0 when inserted. Maximum inner loop iterations at every recursive level.

---

### Example 3

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Best case — already sorted. The inner while loop never executes at any recursive level.

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
Base case: i ≤ 1 — the function returns immediately without any work. Single element is trivially sorted.

---

## Constraints

- 1 ≤ arr.length ≤ 10³ (recursion depth = n; large arrays risk stack overflow)
- Base case: `i <= 1` — return immediately
- The recursive call `recursiveInsertionSort(arr, i-1)` runs **before** the insertion step — the prefix is sorted first, then the new element is inserted
- The function mutates the array in-place; the return value is not used

---

## Time Complexity

| Case | Time |
|---|---|
| Best (already sorted) | O(n) |
| Average | O(n²) |
| Worst (reverse sorted) | O(n²) |

---

## Space Complexity

- O(n) — call stack holds n frames (one per recursive call), unlike O(1) for the iterative version

---
