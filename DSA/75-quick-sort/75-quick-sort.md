# Quick Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using the Quick Sort algorithm. Implement at least one partition strategy (first element, last element, middle element, or random pivot). Quick sort uses the divide-and-conquer paradigm: pick a pivot, partition elements around it, then recursively sort each side.

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
Using last element (5) as pivot: after partition, [1, 5, 7, 8, 9, 10] — pivot 5 lands at index 1. Recursively sort [1] and [7, 8, 9, 10].

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
Already sorted. With last-element pivot, worst case O(n²) occurs — each partition puts 0 elements on the left and n-1 on the right.

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
Reverse sorted. Same worst case as above with last-element pivot. Using random or middle pivot avoids this.

---

### Example 4

**Input:**

```
arr = [1]
```

**Output:**

```
[1]
```

**Explanation:**
Base case: `low >= high` — return immediately. Single element is already sorted.

---

## Constraints

- 1 ≤ arr.length ≤ 10^5
- Base case: `low >= high` — stop recursion
- Quick sort sorts **in-place** — no extra array needed
- Pivot strategies: first element (Lomuto), last element (Lomuto), middle (Hoare), random

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(n log n) | Pivot always splits evenly |
| Average | O(n log n) | Random/middle pivot |
| Worst | O(n²) | Already sorted + first/last pivot |

---

## Space Complexity

- O(log n) — recursive call stack depth (average)
- O(n) — worst case call stack (already sorted array with bad pivot)
- **Tail-recursive optimisation** reduces stack to O(log n) guaranteed

---

## Properties

- **Not stable**: equal elements may be reordered relative to each other
- **In-place**: sorts without extra array (unlike merge sort)
- Faster in practice than merge sort due to cache-friendly memory access patterns

---
