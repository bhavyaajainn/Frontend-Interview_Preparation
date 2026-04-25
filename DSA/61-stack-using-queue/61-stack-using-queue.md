# Implement a Stack Using a Queue

---

## Problem Statement

Implement a Stack data structure using only a single Queue. The Stack must support the following operations: `push`, `pop`, `peek`, `size`, `isEmpty`, `clear`, and `toArray`.

---

## Examples

### Example 1

**Input:**

```
push(1), push(2), push(3)
peek()
isEmpty()
size()
pop()
toArray()
size()
clear()
isEmpty()
```

**Output:**

```
3
false
3
3
[2, 1]
2
true
```

**Explanation:**
After pushing 1, 2, 3 — the stack top is 3. `pop()` removes 3. The remaining stack has [2, 1] with size 2. After `clear()`, the stack is empty.

---

### Example 2 — Push mechanism

**Input:**

```
push(10), push(20)
peek()
pop()
peek()
```

**Output:**

```
20
20
10
```

**Explanation:**
Each `push` enqueues the new element and then rotates all previously enqueued elements to the back. This ensures the most recently pushed element is always at the front of the queue (LIFO order).

---

### Example 3 — Empty stack behaviour

**Input:**

```
pop()
peek()
```

**Output:**

```
null
null
```

**Explanation:**
Calling `pop` or `peek` on an empty stack returns `null` instead of throwing an error.

---

### Example 4 — Push rotation trace

**Input:**

```
push(1) → queue: [1]
push(2) → enqueue 2 → [1, 2], rotate 1 → queue: [2, 1]
push(3) → enqueue 3 → [2, 1, 3], rotate 2,1 → queue: [3, 2, 1]
pop()   → dequeue front → 3
```

**Output:**

```
3
```

**Explanation:**
The trick is to rotate all existing elements after each new enqueue so the newest element stays at the front — mimicking LIFO with a FIFO structure.

---

## Constraints

- Only Queue operations (`enqueue`, `dequeue`, `front`, `size`, `isEmpty`, `clear`, `toArray`) may be used internally
- `push` is O(n) — each push rotates all existing elements
- `pop` and `peek` are O(1) — they simply dequeue/peek the front of the queue
- One Queue is sufficient; two queues are not needed

---

## Time Complexity

| Operation | Average | Worst |
|---|---|---|
| push | Θ(n) | O(n) |
| pop | Θ(1) | O(1) |
| peek | Θ(1) | O(1) |
| access/search | Θ(n) | O(n) |

---

## Space Complexity

- O(n) — all n pushed elements are stored in the internal queue

---
