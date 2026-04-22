# Find Digital Root of a Given Number

---

## Problem Statement

Given a number, find its digital root. The digital root is the recursive sum of all the digits in a number until only a single digit remains.

---

## Examples

### Example 1

**Input:**

```
5674
```

**Output:**

```
4
```

**Explanation:**
5 + 6 + 7 + 4 = 22 → 2 + 2 = 4

---

### Example 2

**Input:**

```
493193
```

**Output:**

```
2
```

**Explanation:**
4 + 9 + 3 + 1 + 9 + 3 = 29 → 2 + 9 = 11 → 1 + 1 = 2

---

### Example 3

**Input:**

```
257520643
```

**Output:**

```
7
```

**Explanation:**
2 + 5 + 7 + 5 + 2 + 0 + 6 + 4 + 3 = 34 → 3 + 4 = 7

---

### Example 4

**Input:**

```
34758
```

**Output:**

```
9
```

**Explanation:**
3 + 4 + 7 + 5 + 8 = 27 → 2 + 7 = 9

---

## Constraints

- 0 ≤ n ≤ 10¹⁸

---

## Time Complexity

- Recursive method: O(n²), where n is the number of digits.
- Mathematical formula: O(1)

---

## Space Complexity

- Recursive method: O(n), due to recursion depth.
- Mathematical formula: O(1)

---
