# Count All Substrings Having Character K

---

## Problem Statement

Given a string and a character K, count all substrings of the string that contain the character K **at least once**.

---

## Examples

### Example 1

**Input:**

```
str = "abb"
char = "b"
```

**Output:**

```
5
```

**Explanation:**
All possible substrings: "a", "ab", "abb", "b", "bb", "b". Of these, 5 contain "b": "ab", "abb", "b", "bb", "b". Only "a" does not.

---

### Example 2

**Input:**

```
str = "abcabc"
char = "c"
```

**Output:**

```
15
```

**Explanation:**
Total substrings = 6×7/2 = 21. Substrings without "c": segments "ab" (3 substrings) and "ab" again (3 substrings) = 6 total excluded. 21 - 6 = 15.

---

### Example 3

**Input:**

```
str = "aaa"
char = "a"
```

**Output:**

```
6
```

**Explanation:**
Every possible substring contains "a". Total substrings = 3×4/2 = 6, so all 6 are counted.

---

### Example 4

**Input:**

```
str = "abc"
char = "z"
```

**Output:**

```
0
```

**Explanation:**
Character "z" is not present in the string, so no substring can contain it.

---

## Constraints

- 1 ≤ str.length ≤ 10^5
- char is a single character
- The total number of substrings of a string of length n is n×(n+1)/2
- Substrings without char K form contiguous segments between occurrences of K — their count can be subtracted from the total

---

## Time Complexity

| Approach | Time Complexity |
|---|---|
| Brute Force (nested loops + includes) | O(n³) |
| Optimised (total minus non-K segments) | O(n) |

---

## Space Complexity

- O(1) — only counters and a temporary segment string are used; no auxiliary data structures

---
