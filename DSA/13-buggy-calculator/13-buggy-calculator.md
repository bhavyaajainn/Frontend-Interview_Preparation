# Buggy Calculator

---

## Problem Statement

Given two numbers, calculate their sum without carrying over any digits (i.e., add each digit independently and ignore any carry). Return the resulting number.

---

## Examples

### Example 1

**Input:**

```
12 + 9
```

**Output:**

```
11
```

**Explanation:**
1 + 0 (from 12 and 9) = 1, 2 + 9 = 11 (ignore carry, so last digit is 1). Result is 11.

---

### Example 2

**Input:**

```
25 + 25
```

**Output:**

```
40
```

**Explanation:**
2 + 2 = 4, 5 + 5 = 10 (ignore carry, so last digit is 0). Result is 40.

---

### Example 3

**Input:**

```
11 + 9
```

**Output:**

```
10
```

**Explanation:**
1 + 0 = 1, 1 + 9 = 10 (ignore carry, so last digit is 0). Result is 10.

---

### Example 4

**Input:**

```
793 + 5142314
```

**Output:**

```
5142007
```

**Explanation:**
Align numbers to the right and add each digit without carrying. Result is 5142007.

---

## Constraints

- 0 ≤ n1, n2 ≤ 10⁹

---

## Time Complexity

- O(d), where d is the number of digits in the greater number.

---

## Space Complexity

- O(1), constant space used.

---
