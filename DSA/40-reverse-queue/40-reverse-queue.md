# Program to Reverse a Queue

---

## Problem Statement

Given a queue, reverse the order of its elements using a stack as an auxiliary data structure. The front of the queue should become the rear and vice versa.

---

## Examples

### Example 1

**Input:**

```
queue = [1, 2, 3, 4, 5]  (1 is at front)
```

**Output:**

```
5, 4, 3, 2, 1  (5 is at front)
```

**Explanation:**
All elements are dequeued into a stack (LIFO), then popped back into the queue in reversed order.

---

### Example 2

**Input:**

```
queue = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

**Output:**

```
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

**Explanation:**
The stack reverses the order by flipping FIFO into LIFO, then back to FIFO.

---

### Example 3

**Input:**

```
queue = [42]
```

**Output:**

```
42
```

**Explanation:**
A single-element queue is its own reverse.

---

### Example 4

**Input:**

```
queue = [1, 2]
```

**Output:**

```
2, 1
```

**Explanation:**
1 is dequeued to the stack, then 2 — popping gives 2 first, then 1.

---

## Constraints

- 1 ≤ queue.length ≤ 10^5
- Queue elements can be any integers
- Only a Stack may be used as auxiliary storage — no arrays or extra queues

---

## Time Complexity

- O(n) — all elements are moved to the stack once, then moved back once

---

## Space Complexity

- O(n) — the stack holds all n elements at peak usage

---
