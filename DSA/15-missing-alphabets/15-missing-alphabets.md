# Find Missing Alphabets to Make a String Panagram

---

## Problem Statement

Given a string, find all the missing alphabets that would make the string a panagram. Return the missing characters in alphabetical order. Ignore case.

---

## Examples

### Example 1

**Input:**

```
Hi from learnersbucket
```

**Output:**

```
dghjpqvwxyz
```

**Explanation:**
These letters are missing to make the string a panagram.

---

### Example 2

**Input:**

```
Learn just don't study
```

**Output:**

```
bcfghiklmpqvwxz
```

**Explanation:**
These letters are missing to make the string a panagram.

---

### Example 3

**Input:**

```
abcdefghijklmnopqrstuvwxyz
```

**Output:**

```

```

**Explanation:**
All alphabets are present, so nothing is missing.

---

### Example 4

**Input:**

```

```

**Output:**

```
abcdefghijklmnopqrstuvwxyz
```

**Explanation:**
All alphabets are missing in an empty string.

---

## Constraints

- 0 ≤ length of string ≤ 10⁵
- String may contain any characters

---

## Time Complexity

- O(n), where n is the length of the string.

---

## Space Complexity

- O(1), constant space for the alphabet array.

---
