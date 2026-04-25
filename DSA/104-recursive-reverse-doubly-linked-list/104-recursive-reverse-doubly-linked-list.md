# Recursively Reverse a Doubly Linked List

---

## Problem Statement

Given the head of a doubly linked list, reverse it **recursively** by swapping the `next` and `prev` pointers of each node on the way forward through the list, then returning the last node reached as the new head.

Recursive logic:
1. **Base case:** if `node === null` → return `null`
2. Swap `node.next` and `node.prev`
3. If `node.prev === null` (i.e., we've just swapped and what was `next` is now `null`) → this is the new head, return `node`
4. Else recurse into `node.prev` (which was originally `node.next`)

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
Start at `10`. Swap: `10.next = null`, `10.prev = 20`. Recurse on `20` (now accessed via `node.prev`). Continue until `50` — at `50`, after swap, `prev = null` → return `50` as new head.

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
At node `1`: swap → `1.next = null`, `1.prev = 2`. Recurse on `2`. At node `2`: swap → `2.next = 1`, `2.prev = null` → base case, return `2` as new head.

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
At node `42`: swap `next (null)` and `prev (null)` — both remain null. `node.prev === null` → return `42`. Single node is its own reverse.

---

### Example 4 — Odd Length

**Input:**

```
5 <-> 4 <-> 3 <-> 2 <-> 1
```

**Output:**

```
1 <-> 2 <-> 3 <-> 4 <-> 5
```

**Explanation:**
Recursion reaches node `1` (tail). After swap, `1.prev = null` → return `1`. Unwinding rewires all pointers from `1` back to `5` in reverse order.

---

## Constraints

- `1 <= number of nodes <= 10^4`
- `-10^5 <= Node.element <= 10^5`
- Must use **recursion** — no loops
- The function receives the current head; the new head (old tail) is returned
- Each node has `element`, `next`, and `prev` pointers

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Every node is visited once via recursive calls |

---

## Space Complexity

- O(n) — call stack grows one frame per node (up to `n` frames at peak depth)
- This is the key difference from the iterative swap-pointers approach which uses O(1) space

---
