# Program to Find the GCD of Two Numbers

---

## Problem Statement

Given two positive integers, find their Greatest Common Divisor (GCD) — the largest number that divides both without leaving a remainder. Implement using the Euclidean Algorithm both iteratively and recursively.

---

## Examples

### Example 1

**Input:**

```
num1 = 60
num2 = 15
```

**Output:**

```
15
```

**Explanation:**
15 divides both 60 (60 / 15 = 4) and 15 (15 / 15 = 1) exactly. No larger number does.

---

### Example 2

**Input:**

```
num1 = 36
num2 = 60
```

**Output:**

```
12
```

**Explanation:**
12 is the largest number dividing both 36 (36 / 12 = 3) and 60 (60 / 12 = 5).

---

### Example 3

**Input:**

```
num1 = 7
num2 = 5
```

**Output:**

```
1
```

**Explanation:**
7 and 5 are coprime — no common factor other than 1.

---

### Example 4

**Input:**

```
num1 = 100
num2 = 100
```

**Output:**

```
100
```

**Explanation:**
When both numbers are equal, the GCD is the number itself.

---

## Constraints

- 1 ≤ num1, num2 ≤ 10^9
- Both numbers are positive integers
- Based on the Euclidean Algorithm: GCD(a, b) = GCD(b, a % b) until b = 0

---

## Time Complexity

| Method | Complexity |
|---|---|
| Iterative (subtraction) | O(log a + log b) |
| Recursive (modulo) | O(log(min(a, b))) |

---

## Space Complexity

| Method | Complexity |
|---|---|
| Iterative | O(1) |
| Recursive | O(n) — call stack depth proportional to number of recursive calls |

---
