# Program to Print the Collatz Sequence

---

## Problem Statement

Given a number, print its Collatz sequence. If the number is even, divide it by 2; if odd, multiply by 3 and add 1. Repeat until the number becomes 1.

---

## Examples

### Example 1

**Input:**

```
5
```

**Output:**

```
5
16
8
4
2
1
```

**Explanation:**
Collatz sequence for 5.

---

### Example 2

**Input:**

```
11
```

**Output:**

```
11
34
17
52
26
13
40
20
10
5
16
8
4
2
1
```

**Explanation:**
Collatz sequence for 11.

---

### Example 3

**Input:**

```
6
```

**Output:**

```
6
3
10
5
16
8
4
2
1
```

**Explanation:**
Collatz sequence for 6.

---

### Example 4

**Input:**

```
10
```

**Output:**

```
10
5
16
8
4
2
1
```

**Explanation:**
Collatz sequence for 10.

---

## Constraints

- 1 ≤ num ≤ 10^6

---

## Time Complexity

- Not fixed; depends on the sequence for the given number

---

## Space Complexity

- O(1) for iterative, O(sequence length) for recursive

---
