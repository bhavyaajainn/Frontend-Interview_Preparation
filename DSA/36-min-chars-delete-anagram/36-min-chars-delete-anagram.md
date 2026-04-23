# Minimum Characters to Delete to Make Two Strings Anagram

---

## Problem Statement

Given two strings of lowercase alphabets, find the minimum number of characters that must be deleted (from either string) to make the two strings anagrams of each other. Characters common to both strings with matching counts are kept; all excess characters must be removed.

---

## Examples

### Example 1

**Input:**

```
a = "abc"
b = "cde"
```

**Output:**

```
4
```

**Explanation:**
Delete `a` and `b` from "abc", and `d` and `e` from "cde". Only `c` is common to both. Total deletions = 2 + 2 = 4.

---

### Example 2

**Input:**

```
a = "ghj"
b = "jhk"
```

**Output:**

```
2
```

**Explanation:**
Delete `g` from "ghj" and `k` from "jhk". Characters `j` and `h` are common. Total deletions = 1 + 1 = 2.

---

### Example 3

**Input:**

```
a = "abc"
b = "abc"
```

**Output:**

```
0
```

**Explanation:**
Both strings are already anagrams — no deletions needed.

---

### Example 4

**Input:**

```
a = "aab"
b = "bbc"
```

**Output:**

```
3
```

**Explanation:**
Delete one `a` from "aab" (one `a` matches nothing in "bbc"), keep one `b` shared. Delete one `b` and `c` from "bbc". Total deletions = 1 + 2 = 3.

---

## Constraints

- 1 ≤ a.length, b.length ≤ 10^5
- Both strings contain only lowercase English letters (a–z)
- Deletions can be made from either or both strings

---

## Time Complexity

- O(m + n) — one pass through each string, where m and n are the lengths of the two strings

---

## Space Complexity

- O(1) — a fixed-size array of 26 is used regardless of input length

---
