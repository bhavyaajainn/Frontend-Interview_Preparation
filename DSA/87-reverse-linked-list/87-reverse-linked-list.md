# Reverse a Linked List

---

## Problem Statement

Given the head of a singly linked list, reverse the list **in-place** and return the new head. The reversal must be done iteratively using three pointer variables: `prev`, `current`, and `next`.

Steps:
1. Initialize `prev = null`, `current = head`, `next = null`
2. For each node: save `next`, point `current.next` to `prev`, advance `prev` and `current`
3. After the loop, `prev` is the new head — return it

---

## Examples

### Example 1 — General Case

**Input:**

```
20 -> 5 -> 30 -> 7 -> 3
```

**Output:**

```
3 -> 7 -> 30 -> 5 -> 20
```

**Explanation:**
Three pointers walk through the list. At each step, `current.next` is redirected to `prev`, reversing the link direction. After the full traversal, `prev` points to the old tail (3), which becomes the new head.

---

### Example 2 — Two Nodes

**Input:**

```
1 -> 2
```

**Output:**

```
2 -> 1
```

**Explanation:**
First iteration: `next = 2`, `1.next = null`, `prev = 1`, `current = 2`. Second iteration: `next = null`, `2.next = 1`, `prev = 2`, `current = null`. Loop ends — return `prev` (2).

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
`current = 42`, `next = null`, `42.next = null (prev)`, `prev = 42`, `current = null`. Loop ends immediately — single node list is its own reverse.

---

### Example 4 — Already Reversed (Descending)

**Input:**

```
5 -> 4 -> 3 -> 2 -> 1
```

**Output:**

```
1 -> 2 -> 3 -> 4 -> 5
```

**Explanation:**
Algorithm does not check order — it simply reverses all next pointers regardless of values. A descending list becomes ascending after reversal.

---

## Constraints

- `0 <= number of nodes <= 10^4`
- `-10^5 <= Node.val <= 10^5`
- Reversal must be done **in-place** — no new linked list or array created
- Return the new head (previously the tail node)
- If the list is empty (`head === null`), return `null`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Every node is visited exactly once |

- Single pass through the list — O(n)
- No nested loops or recursive calls

---

## Space Complexity

- O(1) — only three pointer variables (`prev`, `current`, `next`) are used
- No auxiliary data structure or recursion stack required

---
