# Heap Sort

---

## Problem Statement

Given an array of integers, sort the array in ascending or descending order using the **Heap Sort** algorithm. Heap Sort is a comparison-based, in-place sorting algorithm that uses a **binary heap** data structure. It first builds a Max-Heap (for ascending) or Min-Heap (for descending) from the input array, then repeatedly extracts the root element (largest or smallest) and places it at the end of the sorted region.

Array-to-tree index mapping:
- Left child of index `i` → `2i + 1`
- Right child of index `i` → `2i + 2`
- Parent of index `i` → `Math.floor((i - 1) / 2)`

---

## Examples

### Example 1 — Ascending Order (Max-Heap)

**Input:**

```
arr = [4, 6, 3, 2, 9]
```

**Output:**

```
[2, 3, 4, 6, 9]
```

**Explanation:**
Build a Max-Heap: `[9, 6, 3, 2, 4]`. Swap root (9) with last element, reduce heap size, re-heapify. Repeat until heap size is 1. Final array is sorted ascending.

---

### Example 2 — Descending Order (Min-Heap)

**Input:**

```
arr = [4, 6, 3, 2, 9]
```

**Output:**

```
[9, 6, 4, 3, 2]
```

**Explanation:**
Build a Min-Heap: `[2, 4, 3, 6, 9]`. Swap root (2) with last element, reduce heap size, re-heapify. Repeat until heap size is 1. Final array is sorted descending.

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
Max-Heap is built by heapifying from `n/2 - 1` down to 0. Even though input is sorted, heap construction rearranges it, then extraction phase restores sorted order. Time is still O(n log n).

---

### Example 4 — Duplicate Elements

**Input:**

```
arr = [3, 1, 3, 2, 3]
```

**Output:**

```
[1, 2, 3, 3, 3]
```

**Explanation:**
Heap sort handles duplicates correctly — heapify compares values and places them appropriately. However, heap sort is **not stable**, so relative order of equal elements is not guaranteed.

---

## Constraints

- `1 <= arr.length <= 10^4`
- `-10^5 <= arr[i] <= 10^5`
- Array may contain duplicate elements
- Sorting must be done **in-place** — no auxiliary array is used
- Max-Heap → ascending order; Min-Heap → descending order
- First non-leaf node index: `Math.floor(n / 2) - 1`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(n log n) | All cases — heap operations are always O(log n) |
| Average | O(n log n) | Standard random input |
| Worst | O(n log n) | Reverse sorted or all duplicates |

- `maxHeapify` / `minHeapify` → O(log n)
- Build heap → O(n)
- Extraction loop runs n times × O(log n) heapify = O(n log n)
- Total: O(n) + O(n log n) = **O(n log n)**
- Heap sort is **not stable**

---

## Space Complexity

- O(1) — Heap sort is an **in-place** algorithm
- No additional arrays or data structures are allocated
- Recursive `heapify` uses O(log n) call stack space implicitly

---
