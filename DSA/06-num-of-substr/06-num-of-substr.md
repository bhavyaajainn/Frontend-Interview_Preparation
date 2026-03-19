# Count Number of Substring Occurrences in a String

---

## Problem Statement

Given a string **S** and a substring **P**, determine how many times **P** appears in **S**.

The counting should support two modes:

- **Overlapping occurrences** – Substrings can overlap.
- **Non-overlapping occurrences** – Once a substring is counted, the next search continues after the end of the previous match.

Return the count of occurrences based on the chosen mode.

---

## Examples

### Example 1 (Overlapping)

**Input:**  
String: `"aaa"`  
Substring: `"aa"`  
Mode: Overlapping

**Output:**  
`2`

**Explanation:**

- `"aa"` appears at index 0–1
- `"aa"` appears again at index 1–2  
  Both are counted because overlapping is allowed.

---

### Example 2 (Non-Overlapping)

**Input:**  
String: `"aaa"`  
Substring: `"aa"`  
Mode: Non-Overlapping

**Output:**  
`1`

**Explanation:**

- `"aa"` appears at index 0–1
- Next search starts after index 1, so no further complete match exists.

---

### Example 3

**Input:**  
String: `"foofoobar"`  
Substring: `"foo"`  
Mode: Non-Overlapping

**Output:**  
`2`

**Explanation:**

- `"foo"` appears at index 0–2
- `"foo"` appears again at index 3–5  
  Both matches are separate and non-overlapping.

---

### Example 4

**Input:**  
String: `"aaaa"`  
Substring: `"aaa"`  
Mode: Overlapping

**Output:**  
`2`

**Explanation:**

- `"aaa"` appears at index 0–2
- `"aaa"` appears again at index 1–3  
  Overlapping is allowed, so both matches are counted.

---

## Constraints

- \( 1 \leq |S| \leq 10^5 \)
- \( 1 \leq |P| \leq 10^5 \)
- String and substring consist of valid ASCII characters.
- Substring length will not exceed string length.
- Case sensitivity depends on implementation requirements.

---

## Time Complexity

- **O(n × m)**  
  Where:
  - `n` = length of the string
  - `m` = length of the substring

In the worst case, each position in the string may require checking up to `m` characters.

---

## Space Complexity

- **O(1)**  
  Only constant extra space is required for counting and indexing variables.

---
