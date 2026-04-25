# Quick Sort Using Linked List

---

## Problem Statement

Given the head of a singly linked list, sort it in ascending order using Quick Sort. The last node is used as the pivot. Partition is done by swapping node values (not relinking nodes). After partitioning, the pivot is in its correct position and the algorithm recurses on the left and right sublists.

---

## Examples

### Example 1

**Input:**

```
30 -> 3 -> 4 -> 20 -> 5 -> null
```

**Output:**

```
3 -> 4 -> 5 -> 20 -> 30 -> null
```

**Explanation:**
Pivot = 5 (last node). Traversing from start, nodes with value < 5 are swapped to the front portion. After partition, 5 is placed at its correct position. Recurse left and right sublists.

---

### Example 2

**Input:**

```
10 -> 1 -> 8 -> null
```

**Output:**

```
1 -> 8 -> 10 -> null
```

**Explanation:**
Pivot = 8. 1 < 8 swaps to front. 10 > 8 stays. 8 swaps to correct position. Recurse [1] and [10].

---

### Example 3

**Input:**

```
5 -> null
```

**Output:**

```
5 -> null
```

**Explanation:**
Base case: `start === end` — return immediately. Single node is trivially sorted.

---

### Example 4

**Input:**

```
4 -> 3 -> 2 -> 1 -> null
```

**Output:**

```
1 -> 2 -> 3 -> 4 -> null
```

**Explanation:**
Reverse sorted list. Pivot = 1 (last). All nodes > 1 stay. 1 swaps to front. Worst case recursion depth.

---

## Constraints

- 1 ≤ list length ≤ 10³
- The last node is always used as the pivot
- **Values are swapped**, not nodes — pointer structure is unchanged
- `pivot_prev` tracks the last node placed in the "less than pivot" region
- Edge case in `sort`: if `pivot_prev === start`, the pivot moved to the front — recurse from `pivot_prev.next`, not `pivot_prev.next.next`

---

## Time Complexity

- O(n log n) — average case with random-ish data
- O(n²) — worst case with already sorted or reverse sorted input (last pivot)

---

## Space Complexity

- O(log n) — recursive call stack depth (average)

---
