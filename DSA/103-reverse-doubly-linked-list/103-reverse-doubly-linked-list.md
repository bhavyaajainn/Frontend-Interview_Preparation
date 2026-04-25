# Reverse a Doubly Linked List

---

## Problem Statement

Given the head of a doubly linked list (each node has `next` and `prev` pointers), reverse the list so that the tail becomes the new head. Three approaches are covered:

1. **Swap Pointers** — exchange `next` and `prev` for each node — O(n) time, O(1) space *(best)*
2. **Swap Nodes** — prepend each node from original list into a new list — O(n) time, O(n) space
3. **Swap Data** — use two pointers from both ends and swap node values — O(n) time, O(1) space

---

## Examples

### Example 1 — General Case

**Input:**

```
10 <-> 20 <-> 30 <-> 40 <-> 50
```

**Output:**

```
50 <-> 40 <-> 30 <-> 20 <-> 10
```

**Explanation:**
Method 1 (swap pointers): for each node, `next` becomes `prev` and `prev` becomes `next`. After the loop, the new head is `temp.prev` (last node visited). All `next` and `prev` links are correctly rewired.

---

### Example 2 — Two Nodes

**Input:**

```
1 <-> 2
```

**Output:**

```
2 <-> 1
```

**Explanation:**
For node `1`: swap → `prev = 2`, `next = null`. For node `2`: swap → `prev = null`, `next = 1`. New head is `2`.

---

### Example 3 — Single Node

**Input:**

```
42
```

**Output:**

```
42
```

**Explanation:**
Loop runs once — swap `prev (null)` and `next (null)`, both stay null. `temp` is null at end. Head stays unchanged.

---

### Example 4 — Odd Length

**Input:**

```
1 <-> 2 <-> 3 <-> 4 <-> 5
```

**Output:**

```
5 <-> 4 <-> 3 <-> 2 <-> 1
```

**Explanation:**
Method 3 (swap data): `left = 1, right = 5` → swap → `5 <-> 4 <-> 3 <-> 2 <-> 1`. Middle node `3` is left in place — `left === right` terminates the loop.

---

## Constraints

- `1 <= number of nodes <= 10^4`
- `-10^5 <= Node.element <= 10^5`
- Each node has `element`, `next`, and `prev` fields
- Method 1 and 3 are in-place O(1) space — preferred for large lists
- Method 2 builds a new list — returns the new head

---

## Time Complexity

| Method | Time | Space |
|---|---|---|
| Swap Pointers | O(n) | O(1) |
| Swap Nodes | O(n) | O(n) |
| Swap Data | O(n) | O(1) |

---

## Space Complexity

- **O(1):** Methods 1 and 3 — only pointer variables, no extra data structures
- **O(n):** Method 2 — a new list head reference is built as each node is prepended

---
