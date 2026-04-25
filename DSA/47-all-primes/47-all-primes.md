# Print All Prime Numbers up to N (Sieve of Eratosthenes)

---

## Problem Statement

Given a number N, find and return all prime numbers from 2 to N using the Sieve of Eratosthenes algorithm.

A prime number is a number greater than 1 that has no divisors other than 1 and itself.

---

## Examples

### Example 1

**Input:**

```
n = 10
```

**Output:**

```
[2, 3, 5, 7]
```

**Explanation:**
From 2 to 10, the numbers 2, 3, 5, and 7 have no divisors other than 1 and themselves. 4, 6, 8, 9, and 10 are composite.

---

### Example 2

**Input:**

```
n = 20
```

**Output:**

```
[2, 3, 5, 7, 11, 13, 17, 19]
```

**Explanation:**
All numbers in the range that are not multiples of any smaller prime are included. 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20 are composite.

---

### Example 3

**Input:**

```
n = 2
```

**Output:**

```
[2]
```

**Explanation:**
2 is the smallest and only even prime number.

---

### Example 4

**Input:**

```
n = 100
```

**Output:**

```
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
```

**Explanation:**
There are 25 prime numbers between 2 and 100. The sieve marks all multiples of each prime starting from i² as composite.

---

## Constraints

- 2 ≤ n ≤ 10^6
- 0 and 1 are never prime and must be marked false from the start
- Inner loop starts at i² (not 2×i) — all smaller multiples of i are already marked by earlier primes

---

## Time Complexity

- O(n log log n) — derived from summing the harmonic series of reciprocals of primes: n(1/2 + 1/3 + 1/5 + ...)

---

## Space Complexity

- O(n) — a boolean array of size n+1 is created to track prime status

---
