# Recursive Bubble Sort

---

## Problem Statement

Given an array of integers, sort it in ascending order using a recursive implementation of Bubble Sort. Each recursive call performs one pass (bubbling the largest element to its correct position), then recurses on the remaining n-1 elements.

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
Call 1 (n=5): one pass bubbles 33 to index 4.
Call 2 (n=4): one pass bubbles 10 to index 3.
...continues until n=1 (base case).

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
Worst case — every pass performs the maximum number of swaps.

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
Base case: n === 1, return the array immediately without any comparisons.

---

### Example 4

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Already sorted. No swaps occur in any pass, but unlike the optimised iterative version, the recursive version still makes n-1 recursive calls with no early exit.

---

## Constraints

- 1 ≤ arr.length ≤ 10^3 (recursion depth = n; deep arrays risk stack overflow)
- Base case: `n === 1` — return immediately
- Each recursive call reduces n by 1 — guarantees termination
- Unlike the iterative optimised version, there is no early-exit flag in the basic recursive form

---

## Time Complexity

- O(n²) — n recursive calls, each doing O(n) comparisons in the inner loop

---

## Space Complexity

- O(n) — call stack depth equals n (one frame per recursive call)

---
