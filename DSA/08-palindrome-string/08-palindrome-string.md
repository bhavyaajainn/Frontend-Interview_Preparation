# Palindrome String

---

## Problem Statement

Given a string **S**, determine whether it is a palindrome.

A **palindrome** is a word, sequence, or number that reads the same forward and backward.

Return `true` if the string is a palindrome, otherwise return `false`.

---

## Examples

### Example 1

**Input:**  
S = "abba"

**Output:**  
true

**Explanation:**  
Reading from left to right and right to left produces the same string.

---

### Example 2

**Input:**  
S = "learnersbucket"

**Output:**  
false

**Explanation:**  
The reversed string does not match the original string.

---

### Example 3

**Input:**  
S = "ABCDCBA"

**Output:**  
true

**Explanation:**  
The string reads the same in both directions.

---

### Example 4

**Input:**  
S = "a"

**Output:**  
true

**Explanation:**  
A single-character string is always a palindrome.

---

## Constraints

- \( 1 \leq |S| \leq 10^5 \)
- The string consists of valid ASCII characters.
- Case sensitivity depends on implementation requirements.
- No additional data structures should be used unless specified.

---

## Time Complexity

- **O(n)**  
  Where `n` is the length of the string.  
  Each character is compared at most once (up to half of the string).

---

## Space Complexity

- **O(1)** (Optimized comparison approach)  
  Only constant extra space is required.

- **O(n)** (If using string reversal techniques)  
  Additional space may be used to create a reversed copy of the string.

---
