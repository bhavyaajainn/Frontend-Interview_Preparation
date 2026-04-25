# Leap Year

---

## Problem Statement

Given a year, determine whether it is a leap year or not. Return `true` if it is a leap year, otherwise return `false`.

A year is a leap year if:
- It is exactly divisible by **400**, **OR**
- It is divisible by **4** but **not** divisible by **100**

---

## Examples

### Example 1

**Input:**

```
year = 2000
```

**Output:**

```
true
```

**Explanation:**
2000 is divisible by 400, so it is a leap year.

---

### Example 2

**Input:**

```
year = 1900
```

**Output:**

```
false
```

**Explanation:**
1900 is divisible by 100 but not by 400, so it is not a leap year.

---

### Example 3

**Input:**

```
year = 2020
```

**Output:**

```
true
```

**Explanation:**
2020 is divisible by 4 and not by 100, so it is a leap year.

---

### Example 4

**Input:**

```
year = 2019
```

**Output:**

```
false
```

**Explanation:**
2019 is not divisible by 4, so it is not a leap year.

---

## Constraints

- 1 ≤ year ≤ 10^6
- The divisibility check for 400 must come before the check for 4 and 100 to avoid incorrectly excluding century years that are leap years.

---

## Time Complexity

- O(1) — only a fixed number of modulo operations regardless of input size

---

## Space Complexity

- O(1) — no extra storage used

---
