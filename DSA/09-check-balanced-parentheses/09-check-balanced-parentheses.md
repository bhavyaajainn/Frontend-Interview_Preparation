# Check Balanced Parentheses

---

## Problem Statement

Given a string containing only parentheses characters '(', ')', '{', '}', '[' and ']', determine if the input string has balanced parentheses. A string is considered balanced if every opening bracket has a corresponding closing bracket of the same type and the pairs are properly nested.

---

## Examples

### Example 1

**Input:**

```
[{}]
```

**Output:**

```
true
```

**Explanation:**
All brackets are properly opened and closed in the correct order.

---

### Example 2

**Input:**

```
[{}{}{}}]
```

**Output:**

```
false
```

**Explanation:**
There is an extra closing bracket without a matching opening bracket.

---

### Example 3

**Input:**

```
({[]}){}[][({})]
```

**Output:**

```
true
```

**Explanation:**
All types of brackets are properly nested and closed.

---

### Example 4

**Input:**

```
([)]
```

**Output:**

```
false
```

**Explanation:**
Brackets are not properly nested.

---

## Constraints

- 1 ≤ length of string ≤ 10⁴
- String contains only '(', ')', '{', '}', '[' and ']'

---

## Time Complexity

- O(n), where n is the number of characters in the string. Each character is processed once.

---

## Space Complexity

- O(n), where n is the number of characters in the string. In the worst case, all characters could be opening brackets and stored in the stack.

---
