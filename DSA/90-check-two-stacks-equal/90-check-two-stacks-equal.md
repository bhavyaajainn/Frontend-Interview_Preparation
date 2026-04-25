# Program to Check if Two Stacks are Equal

---

## Problem Statement

Given two stacks, determine whether they are **equal** — same size and same elements in the same order. The comparison is done by peeking and popping from both stacks simultaneously without using any extra data structure.

Steps:
1. If the sizes differ → return `false`
2. While stack1 is not empty: peek both stacks
   - If `peek` values are equal → pop from both
   - If not equal → return `false`
3. If all elements matched → return `true`

---

## Examples

### Example 1 — Equal Stacks

**Input:**

```
stack1 = [2, 9, 3, 7, 5]  (5 on top)
stack2 = [2, 9, 3, 7, 5]  (5 on top)
```

**Output:**

```
true
```

**Explanation:**
Both stacks have size 5. Peeking gives `5 === 5`, pop both. Then `7 === 7`, `3 === 3`, `9 === 9`, `2 === 2`. All elements matched — return `true`.

---

### Example 2 — Different Values

**Input:**

```
stack1 = [1, 2, 3]
stack2 = [1, 2, 4]
```

**Output:**

```
false
```

**Explanation:**
Sizes are equal (3). First peek: `3 === 4` → false. Return `false` immediately without checking remaining elements.

---

### Example 3 — Different Sizes

**Input:**

```
stack1 = [1, 2, 3]
stack2 = [1, 2]
```

**Output:**

```
false
```

**Explanation:**
`stack1.size() (3) !== stack2.size() (2)` — size check fails immediately. Return `false` without any element comparison.

---

### Example 4 — Both Empty

**Input:**

```
stack1 = []
stack2 = []
```

**Output:**

```
true
```

**Explanation:**
Both sizes are 0 — size check passes. While loop never executes (stack1 is already empty). Return `true`.

---

## Constraints

- `0 <= stack size <= 10^4`
- Stack elements can be any comparable value (numbers, strings)
- Both stacks are consumed (popped) during the comparison — make copies if original stacks need to be preserved
- Comparison is order-sensitive: `[1, 2]` and `[2, 1]` are not equal
- Stack must support: `push`, `pop`, `peek`, `isEmpty`, `size`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(1) | Sizes differ — early exit |
| Average | O(n) | Mismatch found midway |
| Worst | O(n) | All elements match or last element differs |

---

## Space Complexity

- O(1) — no extra data structures used
- Elements are compared directly via `peek` and `pop` — constant auxiliary space

---
