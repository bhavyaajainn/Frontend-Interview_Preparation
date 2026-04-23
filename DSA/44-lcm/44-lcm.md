# Find the LCM of Two Numbers

---

## Problem Statement

Given two positive integers, find their Least Common Multiple (LCM) — the smallest positive integer that is divisible by both numbers. Implement using two approaches: with GCD and without GCD.

---

## Examples

### Example 1

**Input:**

```
n1 = 15
n2 = 20
```

**Output:**

```
60
```

**Explanation:**
60 is the smallest number divisible by both 15 (60 / 15 = 4) and 20 (60 / 20 = 3).

---

### Example 2

**Input:**

```
n1 = 5
n2 = 7
```

**Output:**

```
35
```

**Explanation:**
5 and 7 are coprime (GCD = 1), so LCM = 5 × 7 = 35.

---

### Example 3

**Input:**

```
n1 = 4
n2 = 6
```

**Output:**

```
12
```

**Explanation:**
GCD(4, 6) = 2, so LCM = (4 × 6) / 2 = 12.

---

### Example 4

**Input:**

```
n1 = 12
n2 = 12
```

**Output:**

```
12
```

**Explanation:**
LCM of two equal numbers is the number itself.

---

## Constraints

- 1 ≤ n1, n2 ≤ 10^9
- Both numbers are positive integers
- Mathematical formula: LCM(a, b) = (a × b) / GCD(a, b)

---

## Time Complexity

| Method | Complexity |
|---|---|
| Using GCD | O(log(min(a, b))) — dominated by the GCD computation |
| Without GCD (repeated addition) | Not fixed — depends on how large the LCM is relative to the inputs |

---

## Space Complexity

- O(1) — both approaches use constant extra space

---
