# Check if String Contains a Substring

---

## Problem Statement

Given a string and a substring, determine whether the substring exists within the string. Return `true` if found, otherwise return `false`. The check can be case-sensitive or case-insensitive depending on the method used.

---

## Examples

### Example 1

**Input:**

```
str = "I am Prashant Yadav"
sub = "Prashant"
```

**Output:**

```
true
```

**Explanation:**
"Prashant" exists exactly in the string at index 5.

---

### Example 2

**Input:**

```
str = "I am Prashant Yadav"
sub = "Search"
```

**Output:**

```
false
```

**Explanation:**
"Search" does not appear anywhere in the string.

---

### Example 3

**Input:**

```
str = "I am Prashant Yadav"
sub = "dav"
```

**Output:**

```
true
```

**Explanation:**
"dav" is a partial match found at the end of "Yadav".

---

### Example 4

**Input:**

```
str = "I am Prashant Yadav"
sub = "prashant"   (lowercase)
```

**Output (case-sensitive):**

```
false
```

**Output (case-insensitive using regex):**

```
true
```

**Explanation:**
`indexOf` and `includes` are case-sensitive; using a RegExp with the `i` flag allows case-insensitive matching.

---

## Constraints

- 1 ≤ str.length ≤ 10^5
- 1 ≤ sub.length ≤ str.length
- Strings contain printable ASCII characters
- `indexOf` and `includes` are case-sensitive by default
- Use RegExp with `gi` flags for global case-insensitive search

---

## Time Complexity

| Method | Complexity |
|---|---|
| `indexOf` / `includes` | O(n) — scans through the string |
| Regular Expression (`match`) | O(1) amortised (depends on regex engine implementation) |

---

## Space Complexity

- O(1) — no extra space used beyond the return value

---
