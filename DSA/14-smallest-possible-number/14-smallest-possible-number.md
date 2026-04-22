# Form the Smallest Possible Number from the Given Number

---

## Problem Statement

Given a number (as a string), rearrange its digits to form the smallest possible number. The result should not start with 0 if there is at least one non-zero digit. If all digits are zero, return the string of zeros.

---

## Examples

### Example 1

**Input:**

```
55010
```

**Output:**

```
10055
```

**Explanation:**
Rearrange digits to get the smallest number, ensuring no leading zero.

---

### Example 2

**Input:**

```
7652634
```

**Output:**

```
2345667
```

**Explanation:**
Rearrange digits in ascending order, no leading zero.

---

### Example 3

**Input:**

```
000001
```

**Output:**

```
100000
```

**Explanation:**
Only one non-zero digit, so it comes first.

---

### Example 4

**Input:**

```
000000
```

**Output:**

```
000000
```

**Explanation:**
All digits are zero, so return as is.

---

## Constraints

- 1 ≤ length of num ≤ 10⁵
- num consists of digits '0'-'9'

---

## Time Complexity

- O(n log n), where n is the number of digits (for sorting).

---

## Space Complexity

- O(n), for storing the character array.

---
