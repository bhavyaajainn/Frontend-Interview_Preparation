# Sort String Based on Frequency of Characters

---

## Problem Statement

Given a string, sort its characters in descending order based on their frequency. Characters that appear more frequently come first. If two characters have the same frequency, either order between them is valid.

---

## Examples

### Example 1

**Input:**

```
s = "tree"
```

**Output:**

```
"eert" or "eetr"
```

**Explanation:**
'e' appears 2 times, 't' and 'r' each appear 1 time. 'e' must come first. The order between 't' and 'r' does not matter.

---

### Example 2

**Input:**

```
s = "cccaaa"
```

**Output:**

```
"aaaccc" or "cccaaa"
```

**Explanation:**
Both 'a' and 'c' appear 3 times. Since frequencies are equal, either grouping first is valid.

---

### Example 3

**Input:**

```
s = "Aabb"
```

**Output:**

```
"bbAa" or "bbaa" (depending on case sensitivity)
```

**Explanation:**
'b' appears 2 times, 'A' and 'a' each appear 1 time. 'b' must come first. 'A' and 'a' are treated as distinct characters.

---

### Example 4

**Input:**

```
s = "a"
```

**Output:**

```
"a"
```

**Explanation:**
Single character — trivially sorted.

---

## Constraints

- 1 ≤ s.length ≤ 5×10⁵
- Characters are case-sensitive ('A' ≠ 'a')
- Multiple valid outputs exist when characters share the same frequency — any valid grouping is accepted
- Three phases: (1) count frequencies, (2) sort unique characters by frequency, (3) rebuild the string using `repeat()`

---

## Time Complexity

- O(n log n) — O(n) to count, O(k log k) to sort unique characters (k ≤ 26 for letters but generalises to O(n log n)), O(n) to rebuild

---

## Space Complexity

- O(n) — frequency map and output string each hold up to n characters

---
