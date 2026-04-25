# Find the Maximum Depth of Nested Parentheses in a String

---

## Problem Statement

Given a string containing alphabetic characters and parentheses, find the **maximum depth of nested balanced parentheses**. If the parentheses are **not balanced**, return `-1`.

Two approaches:
1. **Brute Force** — track current depth with a counter, O(1) space
2. **Stack** — use a stack to validate balance, O(n) space

Rules:
- Every `(` increments current depth
- Every `)` decrements current depth — if depth is already 0, parentheses are unbalanced → return `-1`
- After full traversal, if depth is not back to 0 → unbalanced → return `-1`

---

## Examples

### Example 1 — Nested Parentheses

**Input:**

```
str = '( p((q)) ((s)t) )'
```

**Output:**

```
3
```

**Explanation:**
`q` is wrapped inside 3 levels of balanced parentheses: `( ( ( q ) ) )`. That is the deepest nesting, so the answer is 3.

---

### Example 2 — Unbalanced Parentheses

**Input:**

```
str = 'b) (c) ()'
```

**Output:**

```
-1
```

**Explanation:**
The first `)` appears before any `(`, making current depth go below 0 — parentheses are unbalanced. Return -1.

---

### Example 3 — Deeper Nesting

**Input:**

```
str = '( a(b) (c) (d(e(f)g)h) I (j(k)l)m)'
```

**Output:**

```
4
```

**Explanation:**
`f` is nested inside `(d(e(f)g)h)` which itself is inside the outermost `()` — 4 levels deep. That is the maximum depth.

---

### Example 4 — Empty / No Parentheses

**Input:**

```
str = ' '
```

**Output:**

```
0
```

**Explanation:**
No parentheses found. Current depth never changes, total max stays 0. Parentheses are trivially balanced.

---

## Constraints

- `0 <= str.length <= 10^5`
- String may contain alphabetic characters, spaces, and parentheses `(` `)`
- Return `-1` if parentheses are unbalanced (extra `)` before a matching `(`, or unclosed `(` at end)
- Return `0` if no parentheses are present
- Brute force uses O(1) space; stack approach uses O(n) space

---

## Time Complexity

| Approach | Time | Space |
|---|---|---|
| Brute Force (counter) | O(n) | O(1) |
| Stack | O(n) | O(n) |

- Both approaches iterate the string once — O(n)
- Brute force is preferred as it uses constant space
- Stack approach is useful when you also need to validate which brackets match

---

## Space Complexity

| Approach | Space | Reason |
|---|---|---|
| Brute Force | O(1) | Only two integer counters used |
| Stack | O(n) | Stack can hold up to n/2 open brackets in worst case |

---
