# Iterative Heap Sort

---

## Problem Statement

Given an array of integers, sort the array in ascending or descending order using an **Iterative Heap Sort** algorithm. Unlike the recursive approach, the heapify step is implemented iteratively — no call stack is used during heap construction or extraction.

The algorithm:
1. Iteratively build a Max-Heap (ascending) or Min-Heap (descending) by comparing each element with its parent using the index formula `Math.floor((i - 1) / 2)`
2. Repeatedly swap the root with the last unsorted element, reduce the heap size, and re-heapify iteratively

---

## Examples

### Example 1 — Descending Order (Min-Heap)

**Input:**

```
arr = [10, 20, 15, 17, 9, 21]
```

**Output:**

```
[21, 20, 17, 15, 10, 9]
```

**Explanation:**
Build Min-Heap iteratively: `[9, 10, 15, 17, 20, 21]`. Swap root (9) with last element, reduce heap size by 1, re-heapify. Repeat until sorted — largest elements accumulate at the front.

---

### Example 2 — Ascending Order (Max-Heap)

**Input:**

```
arr = [10, 20, 15, 17, 9, 21]
```

**Output:**

```
[9, 10, 15, 17, 20, 21]
```

**Explanation:**
Build Max-Heap iteratively: `[21, 20, 15, 17, 9, 10]`. Swap root (21) with last element, reduce heap size, re-heapify. Repeat — smallest elements accumulate at the front.

---

### Example 3 — Already Sorted

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Max-Heap is built iteratively by bubbling up each element. Even for a sorted array, the heap construction rearranges elements before the extraction phase restores sorted order.

---

### Example 4 — Single Element

**Input:**

```
arr = [42]
```

**Output:**

```
[42]
```

**Explanation:**
With only one element, the heapify loop never runs (i starts at 1, n = 1). The extraction loop also skips. Array is returned as-is.

---

## Constraints

- `1 <= arr.length <= 10^4`
- `-10^5 <= arr[i] <= 10^5`
- Array may contain duplicate elements
- Sorting must be done **in-place** — no auxiliary array is used
- Parent index formula: `Math.floor((i - 1) / 2)`
- Max-Heap → ascending order; Min-Heap → descending order
- No recursion used — all operations are iterative

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(n log n) | All cases — iterative heap operations are always O(log n) |
| Average | O(n log n) | Standard random input |
| Worst | O(n log n) | Reverse sorted or skewed input |

- Build heap (iterative): O(n log n)
- Extraction loop: O(n log n)
- Total: **O(n log n)**
- Iterative heap sort is **not stable**

---

## Space Complexity

- O(1) — fully **in-place**, no recursion stack used
- The iterative heapify avoids implicit call stack overhead present in recursive heap sort
- Only a constant number of index variables are used

---
