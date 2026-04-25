# Reverse a String Using Recursion

---

## Problem Statement

Given a string, reverse it using recursion. Do not use built-in reverse methods.

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
Each recursive call strips the last character and prepends it to the result of reversing the remaining string, until the string is empty.

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
"hello" → "o" + reverse("hell") → "ol" + reverse("hel") → ... → "olleh"

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
A single character is its own reverse. The base case returns it directly.

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
An empty string is the base case — the recursion returns immediately with an empty string.

---

## Constraints

- 0 ≤ str.length ≤ 10^4
- The base case must handle an empty string (length === 0) to stop recursion
- Each recursive call reduces the string by one character, guaranteeing termination

---

## Time Complexity

| Approach | Time Complexity |
|---|---|
| Index-based recursion (str[n-1] + recurse) | O(n) |
| substring()-based recursion | O(n) |

---

## Space Complexity

| Approach | Space Complexity |
|---|---|
| Index-based recursion | O(n) — call stack depth equals string length |
| substring()-based recursion | O(n²) — each call creates a new substring copy in addition to stack frames |

---
