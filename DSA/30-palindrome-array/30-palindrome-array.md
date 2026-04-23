# Check if an Array is Palindrome

---

## Problem Statement

Given an array of numbers, determine whether it reads the same forwards and backwards. Return `true` if the array is a palindrome, otherwise return `false`.

---

## Examples

### Example 1

**Input:**

```
[1, 2, 3, 2, 1]
```

**Output:**

```
true
```

**Explanation:**
The array reads the same from both ends: 1 = 1, 2 = 2, and the middle element 3 is unchanged.

---

### Example 2

**Input:**

```
[1, 2, 3, 3, 1]
```

**Output:**

```
false
```

**Explanation:**
The second element is 2 but the second-to-last element is 3, so the array is not a palindrome.

---

### Example 3

**Input:**

```
[5, 5]
```

**Output:**

```
true
```

**Explanation:**
A two-element array where both elements are equal is always a palindrome.

---

### Example 4

**Input:**

```
[1, 2, 2, 2]
```

**Output:**

```
false
```

**Explanation:**
The first element is 1 but the last element is 2, so the array fails the palindrome check at the very first comparison.

---

## Constraints

- 1 ≤ arr.length ≤ 10^5
- Array elements can be any integers
- A single-element array is always a palindrome

---

## Time Complexity

| Method | Complexity |
|---|---|
| Iterative (brute force) | O(n) — loops through half the array |
| Recursive | O(n) — makes n/2 recursive calls |

---

## Space Complexity

| Method | Complexity |
|---|---|
| Iterative (brute force) | O(1) — only uses a boolean flag, no extra space |
| Recursive | O(n) — each recursive call is pushed onto the call stack |

---
