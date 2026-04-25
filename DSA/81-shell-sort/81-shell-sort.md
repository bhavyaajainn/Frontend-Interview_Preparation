# Shell Sort

---

## Problem Statement

Given an array of integers, sort the array in ascending order using the **Shell Sort** algorithm. Shell Sort is an in-place comparison-based sorting algorithm that generalizes insertion sort by allowing the exchange of elements that are far apart. It reduces the interval between compared elements progressively (using a gap sequence) until the gap becomes 1, at which point it behaves like a standard insertion sort.

---

## Examples

### Example 1 — General Case

**Input:**

```
arr = [9, 8, 3, 7, 5, 6, 4, 1]
```

**Output:**

```
[1, 3, 4, 5, 6, 7, 8, 9]
```

**Explanation:**
N = 8. Gaps used: 4 → 2 → 1. At gap 4: compare `(9,5), (8,6), (3,4), (7,1)` and swap as needed. Repeat at gap 2, then gap 1. Final pass produces a fully sorted array.

---

### Example 2 — Already Sorted

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
N = 5. Gaps: 2 → 1. At each gap, elements are compared but no swaps are needed. This is the best case — O(n log n) comparisons with zero swaps.

---

### Example 3 — Reverse Sorted

**Input:**

```
arr = [5, 4, 3, 2, 1]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
N = 5. Gaps: 2 → 1. At gap 2: compare `(5,3), (4,2), (3,1)` — all out of order, swaps occur. Final gap 1 cleans up remaining misplacements. This is the worst case scenario.

---

### Example 4 — Array with Negatives

**Input:**

```
arr = [10, -1, 3, 0, -5]
```

**Output:**

```
[-5, -1, 0, 3, 10]
```

**Explanation:**
Shell sort compares values directly, so negative numbers are handled correctly. At each gap, elements are shifted using insertion logic until the correct position is found, regardless of sign.

---

## Constraints

- `1 <= arr.length <= 10^4`
- `-10^5 <= arr[i] <= 10^5`
- Array may contain duplicate elements
- Array may be already sorted (best case) or reverse sorted (worst case)
- Sorting must be done **in-place** — no auxiliary array is used
- Gap sequence used: Shell's original — `N/2, N/4, ..., 1`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(n log n) | Array is already sorted |
| Average | O(n log n) | With optimal gap sequence (e.g. Knuth's) |
| Worst | O(n²) | Shell's original gap sequence on skewed input |

- Shell sort is **unstable** — equal elements may not preserve their original relative order
- Worst case using Knuth's sequence is closer to O(n^(3/2))

---

## Space Complexity

- O(1) — Shell sort is an **in-place** algorithm
- Only a constant number of temporary variables are used during swapping
- No additional arrays or recursion stack required

---
