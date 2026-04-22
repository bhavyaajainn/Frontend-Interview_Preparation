# Check if Given Number is Armstrong Number

---

## Problem Statement

Given a number, check if it is an Armstrong number. An Armstrong number is a number that is equal to the sum of the cubes of its digits.

---

## Examples

### Example 1

**Input:**

```
153
```

**Output:**

```
true
```

**Explanation:**
1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153

---

### Example 2

**Input:**

```
127
```

**Output:**

```
false
```

**Explanation:**
1^3 + 2^3 + 7^3 = 1 + 8 + 343 = 352

---

### Example 3

**Input:**

```
407
```

**Output:**

```
true
```

**Explanation:**
4^3 + 0^3 + 7^3 = 64 + 0 + 343 = 407

---

### Example 4

**Input:**

```
154
```

**Output:**

```
false
```

**Explanation:**
1^3 + 5^3 + 4^3 = 1 + 125 + 64 = 190

---

## Constraints

- 0 ≤ num ≤ 10^9

---

## Time Complexity

- O(log n) or O(d), where d is the number of digits.

---

## Space Complexity

- O(1)

---
