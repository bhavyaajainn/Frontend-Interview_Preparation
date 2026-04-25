# Program to Check Palindrome Linked List

---

## Problem Statement

Given the head of a singly linked list, determine whether the list is a **palindrome** — it reads the same forwards and backwards. Return `true` if palindrome, `false` otherwise.

Four approaches:
1. **Stack** — copy all elements to a stack, compare with original traversal — O(n) time, O(n) space
2. **Reverse full list** — deep copy + reverse + compare element by element — O(n) time, O(n) space
3. **Reverse half** — find middle using slow/fast pointers, reverse second half, compare — O(n) time, O(1) space *(best)*
4. **Two pointers recursive** — recurse to end, compare with left pointer on unwind — O(n) time, O(n) stack space

---

## Examples

### Example 1 — Palindrome (Even Length)

**Input:**

```
D -> E -> N -> N -> E -> D
```

**Output:**

```
true
```

**Explanation:**
Reading forwards: `D E N N E D`. Reading backwards: `D E N N E D`. Both are identical — it's a palindrome.

---

### Example 2 — Not a Palindrome

**Input:**

```
P -> R -> A -> S -> H -> A -> N -> T
```

**Output:**

```
false
```

**Explanation:**
Reading forwards: `PRASHANT`. Reading backwards: `TNAHSARP`. They differ — not a palindrome.

---

### Example 3 — Palindrome (Odd Length)

**Input:**

```
1 -> 2 -> 3 -> 2 -> 1
```

**Output:**

```
true
```

**Explanation:**
Middle element `3` is the pivot. Left half `[1, 2]` mirrors right half `[2, 1]` when reversed. For method 3 (reverse half), the middle node is skipped during comparison.

---

### Example 4 — Single Node

**Input:**

```
A
```

**Output:**

```
true
```

**Explanation:**
A single node trivially reads the same in both directions.

---

## Constraints

- `1 <= number of nodes <= 10^4`
- Node values can be characters or integers
- Method 3 (reverse half) is the optimal approach — O(n) time, O(1) space
- For method 2, deep copy the list before reversing since objects are passed by reference in JavaScript
- Slow/fast pointer technique: slow moves 1 step, fast moves 2 steps — when fast reaches end, slow is at the midpoint

---

## Time Complexity

| Method | Time | Space | Notes |
|---|---|---|---|
| Stack | O(n) | O(n) | Simple but uses extra space |
| Reverse full | O(n) | O(n) | Needs deep copy |
| Reverse half | O(n) | O(1) | Best approach |
| Recursive | O(n) | O(n) | Call stack space |

---

## Space Complexity

- **Best:** O(1) — Method 3 (reverse half), modifies the list in-place
- **Others:** O(n) — stack, deep copy, or call stack proportional to list length

---
