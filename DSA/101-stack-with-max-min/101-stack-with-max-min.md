# Implement Stack with Max and Min Function

---

## Problem Statement

Design a stack data structure that supports standard `push`, `pop`, and `peek` operations, plus two additional O(1) operations:
- `max()` — returns the maximum value currently in the stack
- `min()` — returns the minimum value currently in the stack

**Key insight:** Instead of storing a single value per slot, store an object `{ value, max, min }` where `max` and `min` track the running maximum and minimum **up to that point in the stack**. This avoids any re-scanning on each call.

On `push(item)`:
- If stack is empty → `{ value: item, max: item, min: item }`
- Else → inherit prev `max`/`min`, update if `item` is greater/lesser, then push

On `max()` / `min()` → peek at the top element and return its `max` / `min` field.

---

## Examples

### Example 1 — General Case with Pop

**Input:**

```
push(4), push(7), push(11), push(23), push(77), push(3), push(1)
pop()
max(), min()
```

**Output:**

```
max: 77
min: 3
```

**Explanation:**
After popping `1`, the top is `{ value: 3, max: 77, min: 3 }`. `max()` returns `77`, `min()` returns `3`.

---

### Example 2 — Ascending Pushes

**Input:**

```
push(2), push(5), push(17), push(23), push(88), push(54)
max(), min()
```

**Output:**

```
max: 88
min: 2
```

**Explanation:**
Each push updates max only when new value exceeds previous max. Min remains `2` (the first pushed). Top stores `{ value: 54, max: 88, min: 2 }`.

---

### Example 3 — Single Element

**Input:**

```
push(42)
max(), min()
```

**Output:**

```
max: 42
min: 42
```

**Explanation:**
Stack is empty on push — `{ value: 42, max: 42, min: 42 }`. Max and min are the same.

---

### Example 4 — After Popping the Max

**Input:**

```
push(5), push(10), push(3)
pop()   // removes 3 (not the max)
max()
```

**Output:**

```
max: 10
```

**Explanation:**
After popping `3`, top is `{ value: 10, max: 10, min: 5 }`. Max is correctly `10` — no scanning needed.

---

## Constraints

- Stack elements can be any comparable numbers
- `max()` and `min()` must run in **O(1)** time — no iteration allowed
- `pop()` on empty stack should handle gracefully (return `undefined`)
- `max()` / `min()` on empty stack should return `undefined`

---

## Time Complexity

| Operation | Average | Worst |
|---|---|---|
| Access | Θ(N) | O(N) |
| Search | Θ(N) | O(N) |
| Push | Θ(1) | O(1) |
| Pop | Θ(1) | O(1) |
| Max | Θ(1) | O(1) |
| Min | Θ(1) | O(1) |

---

## Space Complexity

- O(N) — each element stored as an object `{ value, max, min }` — constant factor overhead per element but scales linearly with N

---
