# Insertion Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using the Insertion Sort algorithm. Insertion sort builds the sorted array one element at a time by picking each element and inserting it into its correct position among the already-sorted elements to its left.

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
- i=1: key=8. arr[0]=1 ≤ 8 → no shift. Array: [1, 8, 2, 4, 5]
- i=2: key=2. arr[1]=8 > 2 → shift right. arr[0]=1 ≤ 2 → insert. Array: [1, 2, 8, 4, 5]
- i=3: key=4. Shift 8, no shift for 2, insert. Array: [1, 2, 4, 8, 5]
- i=4: key=5. Shift 8, insert. Array: [1, 2, 4, 5, 8]

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
Worst case — every element must be shifted all the way to index 0. Maximum inner loop iterations.

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
Best case — already sorted. The inner while loop never executes. Only n-1 comparisons are made.

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
Outer loop starts at i=1 which exceeds arr.length-1=0. Returns immediately.

---

## Constraints

- 1 ≤ arr.length ≤ 10^4
- The outer loop starts at index 1 (the first element is trivially sorted)
- The key (`arr[i]`) is stored before shifting — elements are shifted right (not swapped) to make room
- Shifting is more efficient than swapping — only one write per shift instead of three

---

## Time Complexity

| Case | Time |
|---|---|
| Best (already sorted) | O(n) |
| Average | O(n²) |
| Worst (reverse sorted) | O(n²) |

---

## Space Complexity

- O(1) — in-place; only the `key` variable and index `j` are used

---

## Properties

- **Stable**: Yes — equal elements are never moved past each other
- **In-place**: Yes — no extra array needed
- **Adaptive**: Yes — performs O(n) on nearly sorted input
- **Practical use**: V8 engine uses insertion sort for arrays with fewer than ~20 elements inside `Array.prototype.sort()`

---
