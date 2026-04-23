# FizzBuzz Program

---

## Problem Statement

Print all numbers from 1 to N, replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both 3 and 5 with "FizzBuzz". All other numbers are printed as-is.

---

## Examples

### Example 1

**Input:**

```
n = 10
```

**Output:**

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
```

**Explanation:**
3, 6, 9 → "Fizz". 5, 10 → "Buzz". No number up to 10 is divisible by both 3 and 5.

---

### Example 2

**Input:**

```
n = 15
```

**Output:**

```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

**Explanation:**
15 is divisible by both 3 and 5, so it prints "FizzBuzz".

---

### Example 3

**Input:**

```
n = 5
```

**Output:**

```
1, 2, Fizz, 4, Buzz
```

**Explanation:**
3 → "Fizz", 5 → "Buzz", rest are plain numbers.

---

### Example 4

**Input:**

```
n = 1
```

**Output:**

```
1
```

**Explanation:**
Only one number — 1 is neither divisible by 3 nor 5.

---

## Constraints

- 1 ≤ n ≤ 10^4
- Check divisibility by both 3 and 5 first (before individual checks), otherwise "FizzBuzz" case is never reached

---

## Time Complexity

- O(n) — iterates through every number from 1 to n once

---

## Space Complexity

- O(1) — no extra storage; output is printed directly

---
