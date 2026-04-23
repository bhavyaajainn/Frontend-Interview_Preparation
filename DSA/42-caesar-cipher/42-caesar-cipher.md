# Caesar Cipher

---

## Problem Statement

Given a string and a shift key, encrypt the string using the Caesar Cipher — substitute each alphabet character with the character that appears `key` positions later in the alphabet, wrapping around from Z back to A. Preserve the case of each character.

---

## Examples

### Example 1

**Input:**

```
str = "ABCD"
key = 13
```

**Output:**

```
NOPQ
```

**Explanation:**
A→N, B→O, C→P, D→Q. Each letter is shifted 13 positions forward (ROT13).

---

### Example 2

**Input:**

```
str = "ATTACKATONCE"
key = 13
```

**Output:**

```
NGGNPXNGBAPR
```

**Explanation:**
Each uppercase letter is shifted by 13, wrapping around when it goes past Z.

---

### Example 3

**Input:**

```
str = "prashantyadav"
key = 13
```

**Output:**

```
cenfunaglnqni
```

**Explanation:**
Lowercase letters are shifted by 13, wrapping around from z back to a, preserving lowercase.

---

### Example 4

**Input:**

```
str = "Hello"
key = 3
```

**Output:**

```
Khoor
```

**Explanation:**
H→K, e→h, l→o, l→o, o→r. Case is preserved for each character.

---

## Constraints

- 1 ≤ str.length ≤ 10^5
- 1 ≤ key ≤ 25
- Input may contain both uppercase and lowercase letters
- Non-alphabetic characters (spaces, punctuation) are preserved as-is (if applicable)
- Use `charCodeAt()` and `String.fromCharCode()` with modulo 26 for the mathematical approach

---

## Time Complexity

- O(n) — each character in the string is processed once

---

## Space Complexity

- O(1) — fixed lookup map or constant arithmetic; output string is not counted as extra space

---
