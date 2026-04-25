# Reverse a Linked List Recursively

---

## Problem Statement

Given the head of a singly linked list, reverse it **recursively** and return the new head. The algorithm recurses to the tail of the list, then rewires the `next` pointers on the way back up the call stack.

Steps:
1. Base case: if `head === null` or `head.next === null`, return `head`
2. Recurse on `head.next` and capture the returned new head
3. On the way back: set `head.next.next = head` (reverse the link), then `head.next = null` (break old link)
4. Return the new head all the way up

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
Recursion reaches node `3` (tail) — base case returns it as new head. Unwinding: `7.next.next = 7` (so `3.next = 7`), `7.next = null`. Continue until `20.next = null`. New head `3` is returned all the way up.

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
Recurse to `2` (tail) — return `2`. Back at `1`: `1.next.next = 1` (so `2.next = 1`), `1.next = null`. New head is `2`.

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
`head.next === null` — base case fires immediately, returns `42` unchanged.

---

### Example 4 — All Same Values

**Input:**

```
5 -> 5 -> 5
```

**Output:**

```
5 -> 5 -> 5
```

**Explanation:**
Structure is reversed (pointer directions flip) but values are identical so the output looks the same. The recursion still correctly rewires all three nodes.

---

## Constraints

- `0 <= number of nodes <= 10^4`
- `-10^5 <= Node.val <= 10^5`
- Must use **recursion** — no loops or extra data structures
- Return the new head (previously the tail)
- If `head === null`, return `null`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Every node is visited once through recursive calls |

---

## Space Complexity

- O(n) — each recursive call adds a frame to the call stack
- For a list of `n` nodes, there are `n` stack frames at peak recursion depth
- This is the key difference from the iterative approach which uses O(1) space

---
