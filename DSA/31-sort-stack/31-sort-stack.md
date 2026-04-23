# Sort a Stack Using Another Stack

---

## Problem Statement

Given a stack of integers, sort it in descending order (largest on top) using only one additional temporary stack. No other data structure should be used. Return the sorted stack.

---

## Examples

### Example 1

**Input:**

```
stack = [5, 10, 17, 11, 2, 23]  (23 is on top)
```

**Output:**

```
23, 17, 11, 10, 5, 2  (23 is on top)
```

**Explanation:**
Elements are rearranged so the largest element sits at the top of the temporary stack and smallest at the bottom.

---

### Example 2

**Input:**

```
stack = [3, 1, 4, 1, 5]  (5 is on top)
```

**Output:**

```
5, 4, 3, 1, 1
```

**Explanation:**
Duplicate values are handled correctly; both 1s remain in sorted order.

---

### Example 3

**Input:**

```
stack = [7]
```

**Output:**

```
7
```

**Explanation:**
A single-element stack is already sorted.

---

### Example 4

**Input:**

```
stack = [1, 2, 3, 4, 5]  (5 is on top)
```

**Output:**

```
5, 4, 3, 2, 1
```

**Explanation:**
An already-descending stack requires no swaps; elements are moved to the temp stack directly in order.

---

## Constraints

- 1 ≤ stack.length ≤ 10^4
- Stack elements can be any integers (positive or negative)
- Only one additional stack is allowed — no arrays, queues, or other structures
- Change the comparison operator from `>` to `<` to sort in ascending order instead

---

## Time Complexity

- O(n²) — for each of the n elements popped, up to n elements may be pushed back from the temp stack to the input stack

---

## Space Complexity

- O(n) — the temporary stack holds at most n elements at any point

---
