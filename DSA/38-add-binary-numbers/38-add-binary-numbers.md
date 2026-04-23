# Program to Add Two Binary Numbers

---

## Problem Statement

Given two binary numbers represented as strings, return their sum also as a binary string. Do not convert the binary strings to decimal integers — implement the binary addition logic directly using carry.

---

## Examples

### Example 1

**Input:**

```
a = "1010"
b = "1011"
```

**Output:**

```
10101
```

**Explanation:**
1010 (10 in decimal) + 1011 (11 in decimal) = 10101 (21 in decimal). Carry propagates from the rightmost bit.

---

### Example 2

**Input:**

```
a = "1"
b = "1"
```

**Output:**

```
10
```

**Explanation:**
1 + 1 = 2 in decimal, which is 10 in binary. Sum bit is 0 and carry is 1.

---

### Example 3

**Input:**

```
a = "111"
b = "1"
```

**Output:**

```
1000
```

**Explanation:**
111 (7) + 1 = 1000 (8). All bits produce a carry, resulting in an extra leading 1.

---

### Example 4

**Input:**

```
a = "1101"
b = "101"
```

**Output:**

```
10010
```

**Explanation:**
1101 (13) + 101 (5) = 10010 (18). Carry must propagate through multiple positions.

---

## Constraints

- 1 ≤ a.length, b.length ≤ 10^4
- a and b consist only of '0' and '1' characters
- Neither string has leading zeros except for the value "0" itself
- Do not use built-in binary conversion functions like `parseInt(n, 2)` or `toString(2)`

---

## Time Complexity

- O(n) — where n is the length of the longer binary string; each bit is processed once

---

## Space Complexity

- O(n) — the result string grows up to n+1 characters (extra bit for a final carry)

---
