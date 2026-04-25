# Print All Permutations of a String

---

## Problem Statement

Given a string, print all possible permutations of its characters. A permutation is every possible ordering of the characters.

A string of length n has n! permutations.

---

## Examples

### Example 1

**Input:**

```
str = "AB"
```

**Output:**

```
"AB"
"BA"
```

**Explanation:**
2 characters → 2! = 2 permutations. Swap A↔B gives the second permutation.

---

### Example 2

**Input:**

```
str = "ABC"
```

**Output:**

```
"ABC"
"ACB"
"BAC"
"BCA"
"CBA"
"CAB"
```

**Explanation:**
3 characters → 3! = 6 permutations. Backtracking fixes one character at the front, recursively permutes the rest, then restores (backtracks) to try the next character.

---

### Example 3

**Input:**

```
str = "A"
```

**Output:**

```
"A"
```

**Explanation:**
A single character has exactly 1! = 1 permutation — itself. The base case (left === right) triggers immediately.

---

### Example 4

**Input:**

```
str = "AB"
```

**Backtracking trace:**

```
permute("AB", 0, 1)
  swap(0,0) → "AB" → permute("AB", 1, 1) → print "AB"
  swap back → "AB"
  swap(0,1) → "BA" → permute("BA", 1, 1) → print "BA"
  swap back → "AB"
```

**Explanation:**
At each level, the character at index `left` is swapped with each character from `left` to `right`. After the recursive call, the swap is undone (backtracking) to restore the original string for the next iteration.

---

## Constraints

- 1 ≤ str.length ≤ 8 (beyond 8, 8! = 40320 permutations; output grows very fast)
- Characters may be uppercase letters
- The order of permutations depends on the swap order — not guaranteed to be lexicographic
- A helper `swap(str, i, j)` function is typically used since strings are immutable in JavaScript

---

## Time Complexity

- O(n × n!) — there are n! permutations, and printing each takes O(n) time

---

## Space Complexity

- O(n!) — the recursion call stack depth is O(n), but n! recursive calls are made in total across all branches

---
