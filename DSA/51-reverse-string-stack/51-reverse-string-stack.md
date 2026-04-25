# Reverse a String Using Stack

---

## Problem Statement

Given a string, reverse it using a stack data structure. Do not use built-in reverse methods.

---

## Examples

### Example 1

**Input:**

```
str = "prashant"
```

**Output:**

```
"tnahsarp"
```

**Explanation:**
Each character is pushed onto the stack. When popped in LIFO order, "t" comes out first, then "n", "a", "h", etc., forming the reversed string.

---

### Example 2

**Input:**

```
str = "hello"
```

**Output:**

```
"olleh"
```

**Explanation:**
Stack state after all pushes: bottom → [h, e, l, l, o] ← top. Popping gives: o, l, l, e, h → "olleh".

---

### Example 3

**Input:**

```
str = "a"
```

**Output:**

```
"a"
```

**Explanation:**
A single character is pushed and immediately popped, returning the same character.

---

### Example 4

**Input:**

```
str = ""
```

**Output:**

```
""
```

**Explanation:**
Nothing is pushed to the stack. The while loop never executes, and an empty string is returned.

---

## Constraints

- 0 ≤ str.length ≤ 10^4
- A Stack class with push, pop, and isEmpty methods is needed
- The LIFO property of a stack naturally reverses the insertion order of characters

---

## Time Complexity

- O(n) — each character is pushed once and popped once

---

## Space Complexity

- O(n) — all n characters are stored in the stack simultaneously

---
