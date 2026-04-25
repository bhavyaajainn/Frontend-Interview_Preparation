# Bubble Sort Using Two Stacks

---

## Problem Statement

Given an array of integers, sort it in ascending order using two stacks and the bubble sort paradigm. The two stacks act as the two regions that bubble sort alternates between, comparing and swapping adjacent elements at the stack tops.

---

## Examples

### Example 1

**Input:**

```
arr = [10, 2, 45, 22, -1, 0]
```

**Output:**

```
[-1, 0, 2, 10, 22, 45]
```

**Explanation:**
All elements are pushed into stack1. Then in alternating passes (even: stack1→stack2, odd: stack2→stack1), elements are popped and compared with the stack top. If the popped element is smaller than the top, they swap — mimicking a bubble sort pass. After each pass, the largest unsorted element settles at the bottom of the destination stack. The sorted position is written back to the array.

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
Worst case — every pass performs maximum swaps between stack tops.

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
Single element — pushed into stack1, immediately popped back to array. No comparisons needed.

---

### Example 4

**Input:**

```
arr = [1, 2, 3]
```

**Output:**

```
[1, 2, 3]
```

**Explanation:**
Already sorted. Passes still occur (no early exit), but no swaps are made between stack tops.

---

## Constraints

- 1 ≤ arr.length ≤ 10^3
- Two Stack instances (`push`, `pop`, `peek`, `isEmpty`) are used as the core data structures
- Passes alternate between two directions: even passes transfer stack1 → stack2, odd passes transfer stack2 → stack1
- After each full pass, the largest remaining unsorted element is written back into the array at its final position
- The algorithm mutates the original array in-place (writing sorted positions at the end of each pass)

---

## Time Complexity

- O(n²) — n passes, each transferring O(n) elements between the two stacks

---

## Space Complexity

- O(n) — both stacks together hold all n elements at any given time

---
