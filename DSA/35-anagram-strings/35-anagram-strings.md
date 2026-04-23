# Check if Two Strings are Anagram of Each Other

---

## Problem Statement

Given two strings, determine whether they are anagrams of each other. Two strings are anagrams if they contain the same characters with the same frequencies, regardless of order. Return `true` if they are anagrams, otherwise return `false`.

---

## Examples

### Example 1

**Input:**

```
str1 = "prashant"
str2 = "tnahsarp"
```

**Output:**

```
true
```

**Explanation:**
Both strings contain the same 8 characters with the same counts — just in a different order.

---

### Example 2

**Input:**

```
str1 = "learnersbucket"
str2 = "tekcubsrenraes"
```

**Output:**

```
false
```

**Explanation:**
The character frequencies do not match between the two strings.

---

### Example 3

**Input:**

```
str1 = "listen"
str2 = "silent"
```

**Output:**

```
true
```

**Explanation:**
Both strings contain l, i, s, t, e, n exactly once — a classic anagram pair.

---

### Example 4

**Input:**

```
str1 = "hello"
str2 = "world"
```

**Output:**

```
false
```

**Explanation:**
The strings have different lengths and different characters; not anagrams.

---

## Constraints

- 1 ≤ str1.length, str2.length ≤ 10^5
- Strings contain only lowercase English letters
- If lengths differ, the strings cannot be anagrams
- Character comparison is case-sensitive

---

## Time Complexity

| Method | Complexity |
|---|---|
| Sorting | O(n log n) — sorting both character arrays |
| Character count (two maps) | O(n) — three linear passes over the strings |
| Character count (one map) | O(n) — single pass, increment for str1 and decrement for str2, then verify all counts are zero |

---

## Space Complexity

- O(n) — character arrays created during sort, or frequency map storing up to n distinct characters

---
