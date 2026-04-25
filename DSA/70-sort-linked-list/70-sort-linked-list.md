# Sorting a Linked List

---

## Problem Statement

Given the head of a singly linked list, sort it in ascending order using the Insertion Sort algorithm and return the new head. The sorted list is built by extracting each node from the original list and inserting it into the correct position in a new sorted list.

---

## Examples

### Example 1

**Input:**

```
10 -> 5 -> 22 -> 3 -> 17 -> 10
```

**Output:**

```
3 -> 5 -> 10 -> 10 -> 17 -> 22
```

**Explanation:**
Each node is extracted from the original list in order. A `sortedInsert` helper places it into the correct position in the growing sorted list using a dummy head node to simplify edge cases.

---

### Example 2

**Input:**

```
5 -> 3 -> 1
```

**Output:**

```
1 -> 3 -> 5
```

**Explanation:**
Reverse-sorted input. Every node must be inserted at the front of the sorted result, making this the worst case.

---

### Example 3

**Input:**

```
1 -> 2 -> 3
```

**Output:**

```
1 -> 2 -> 3
```

**Explanation:**
Already sorted. Each node is appended to the end of the sorted list — the while loop in `sortedInsert` runs to the end each time.

---

### Example 4

**Input:**

```
7
```

**Output:**

```
7
```

**Explanation:**
Single node — `result` is null, `sortedInsert` places it immediately as the head. The outer loop's `current.next` is null so it exits after one iteration.

---

## Constraints

- 1 ≤ list length ≤ 10³
- Node values can be any integer (including duplicates and negatives)
- A dummy/temporary node at the head of the sorted list simplifies boundary conditions (no special case for inserting at head)
- Original list nodes are reused — no new nodes created for values; only one extra dummy node per `sortedInsert` call

---

## Time Complexity

- O(n²) — for each of n nodes, `sortedInsert` traverses up to O(n) nodes in the sorted portion

---

## Space Complexity

- O(1) — nodes from the original list are reused; only one temporary dummy node is used per `sortedInsert` call

---
