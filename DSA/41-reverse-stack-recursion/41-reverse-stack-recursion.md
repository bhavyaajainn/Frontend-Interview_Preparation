# Reverse a Stack Using Recursion

---

## Problem Statement

Given a stack, reverse the order of its elements using recursion only — no extra data structures like arrays or queues are allowed. Use two mutually recursive functions: one to remove elements one by one, and one to insert them at the bottom.

---

## Examples

### Example 1

**Input:**

```
stack = [1, 2, 3, 4, 5]  (5 is on top)
```

**Output:**

```
1, 2, 3, 4, 5  (1 is on top)
```

**Explanation:**
Each element is popped and re-inserted at the bottom via the helper function, effectively reversing the stack.

---

### Example 2

**Input:**

```
stack = [10, 20, 30]  (30 is on top)
```

**Output:**

```
10, 20, 30  (10 is on top)
```

**Explanation:**
30 is removed, then 20, then 10 — each is inserted at the bottom in order, reversing the original.

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
A single-element stack is already its own reverse.

---

### Example 4

**Input:**

```
stack = [1, 2]  (2 is on top)
```

**Output:**

```
1, 2  (1 is on top)
```

**Explanation:**
2 is popped and inserted at the bottom; 1 stays on top.

---

## Constraints

- 1 ≤ stack.length ≤ 10^3
- Stack elements can be any integers
- No additional data structures allowed — only the call stack via recursion
- Two functions must be used: `reverseStack` (removes elements) and `insertAtBottom` (places elements at bottom)

---

## Time Complexity

- O(n²) — `reverseStack` calls itself n times, and each call triggers `insertAtBottom` which also recurses up to n times

---

## Space Complexity

- O(n) — both functions share the call stack; maximum depth is proportional to n

---
