# Reverse a Linked List Using a Stack

---

## Problem Statement

Given a singly linked list, reverse it using a **stack** and return the new reversed linked list. This is not an in-place reversal — a new linked list is constructed from the stack.

Steps:
1. Traverse the original list and **push** each node's value onto a stack
2. Create a new empty linked list
3. **Pop** from the stack one by one and append each value to the new list
4. Because the stack follows LIFO, the new list is built in reverse order

---

## Examples

### Example 1 — General Case

**Input:**

```
20 -> 5 -> 30 -> 7 -> 3
```

**Output:**

```
[3, 7, 30, 5, 20]
```

**Explanation:**
Stack after push phase: `[20, 5, 30, 7, 3]` (3 on top). Popping gives `3, 7, 30, 5, 20` — appended to new list in that order.

---

### Example 2 — Two Nodes

**Input:**

```
1 -> 2
```

**Output:**

```
[2, 1]
```

**Explanation:**
Stack: `[1, 2]`. Pop gives `2` then `1`. New list: `2 -> 1`.

---

### Example 3 — Single Node

**Input:**

```
42
```

**Output:**

```
[42]
```

**Explanation:**
Stack: `[42]`. Pop gives `42`. New list has one node — same as input.

---

### Example 4 — Already Reversed Order

**Input:**

```
5 -> 4 -> 3 -> 2 -> 1
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
Stack: `[5, 4, 3, 2, 1]` (1 on top). Popping produces ascending order. New list: `1 -> 2 -> 3 -> 4 -> 5`.

---

## Constraints

- `0 <= number of nodes <= 10^4`
- `-10^5 <= Node.val <= 10^5`
- A **new linked list** is returned — original list is not mutated
- Stack follows LIFO — last pushed element is the first to be popped
- This approach uses more space than iterative/recursive reversal (O(n) vs O(1))

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Push all n elements + pop all n elements = O(n + n) = O(n) |

---

## Space Complexity

- O(n) — stack stores all `n` node values
- O(n) — new linked list also stores all `n` values
- Total auxiliary space: O(n), compared to O(1) for in-place iterative reversal

---
