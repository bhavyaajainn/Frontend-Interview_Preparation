# Difference Between Square of Sum and Sum of Squares

---

## Problem Statement

Given a number n, find the difference between the square of the sum of the first n natural numbers and the sum of the squares of the first n natural numbers.

---

## Examples

### Example 1

**Input:**

```
10
```

**Output:**

```
2640
```

**Explanation:**
(1 + 2 + ... + 10)^2 = 55^2 = 3025
1^2 + 2^2 + ... + 10^2 = 385
Difference = 3025 - 385 = 2640

---

### Example 2

**Input:**

```
25
```

**Output:**

```
100100
```

**Explanation:**
(1 + 2 + ... + 25)^2 = 325^2 = 105625
1^2 + 2^2 + ... + 25^2 = 5525
Difference = 105625 - 5525 = 100100

---

### Example 3

**Input:**

```
97
```

**Output:**

```
22282064
```

**Explanation:**
(1 + 2 + ... + 97)^2 = 4753^2 = 22692709
1^2 + 2^2 + ... + 97^2 = 410645
Difference = 22692709 - 410645 = 22282064

---

## Constraints

- 1 ≤ n ≤ 10^6

---

## Time Complexity

- O(n) for loop method
- O(1) for formula method

---

## Space Complexity

- O(1)

---
