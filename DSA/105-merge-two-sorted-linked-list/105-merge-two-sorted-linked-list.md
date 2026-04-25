# Merge Two Sorted Linked Lists

---

## Problem Statement

Given two sorted singly linked lists, merge them into a single sorted linked list and return the head of the merged list. No extra list should be created — nodes are rewired in-place.

Two approaches:
1. **Iterative** — compare heads, start from the smaller, weave nodes together — O(m+n) time, O(1) space
2. **Recursive** — at each call pick the smaller head, recurse on remaining — O(m+n) time, O(m+n) call stack

---

## Examples

### Example 1 — General Case

**Input:**

```
list1 = 1 -> 3 -> 5
list2 = 0 -> 2 -> 4 -> 6
```

**Output:**

```
0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

**Explanation:**
Start from `0` (smaller head of list2). Compare and weave: `0 → 1 → 2 → 3 → 4 → 5 → 6`. Remaining `6` from list2 is appended at the end.

---

### Example 2 — One List Empty

**Input:**

```
list1 = 1 -> 2 -> 3
list2 = (empty)
```

**Output:**

```
1 -> 2 -> 3
```

**Explanation:**
Base case fires immediately — if either list is null, return the other list unchanged.

---

### Example 3 — Equal Elements

**Input:**

```
list1 = 1 -> 3 -> 5
list2 = 1 -> 3 -> 5
```

**Output:**

```
1 -> 1 -> 3 -> 3 -> 5 -> 5
```

**Explanation:**
When elements are equal, list1's node is placed first (since `node1.element < node2.element` is false when equal, list2's node is picked). Order of ties depends on which branch handles equality.

---

### Example 4 — Non-Overlapping Ranges

**Input:**

```
list1 = 1 -> 2 -> 3
list2 = 7 -> 8 -> 9
```

**Output:**

```
1 -> 2 -> 3 -> 7 -> 8 -> 9
```

**Explanation:**
All of list1 comes before any of list2. The iterative approach appends list2 at the tail of list1 when list1's next becomes null.

---

## Constraints

- `0 <= length of each list <= 10^4`
- `-10^5 <= Node.element <= 10^5`
- Both input lists are sorted in **ascending** order
- Merge must be done **in-place** — no new list should be created
- Return the head of the merged list

---

## Time Complexity

| Approach | Time | When |
|---|---|---|
| Iterative | O(m + n) | Each node visited at most once |
| Recursive | O(m + n) | One recursive call per node |

---

## Space Complexity

| Approach | Space | Reason |
|---|---|---|
| Iterative | O(1) | Only pointer variables used |
| Recursive | O(m + n) | Call stack depth equals total nodes |

---
