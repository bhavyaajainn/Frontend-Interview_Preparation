# Reverse an Array

---

## Problem Statement

Given an integer array, reverse it and return the result. Implement at least one in-place approach without using built-in reverse methods.

---

## Examples

### Example 1

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[5, 4, 3, 2, 1]
```

**Explanation:**
The two-pointer swap approach exchanges arr[0]↔arr[4] and arr[1]↔arr[3], leaving arr[2] in place. Only half the array is iterated.

---

### Example 2

**Input:**

```
arr = [1, 2]
```

**Output:**

```
[2, 1]
```

**Explanation:**
Only one swap needed — arr[0] and arr[1] exchange positions.

---

### Example 3

**Input:**

```
arr = [7]
```

**Output:**

```
[7]
```

**Explanation:**
A single-element array is already its own reverse. The loop condition (i < arr.length / 2 = 0.5) never executes.

---

### Example 4

**Input:**

```
arr = []
```

**Output:**

```
[]
```

**Explanation:**
Empty array — no elements to swap or copy. Returns immediately.

---

## Constraints

- 0 ≤ arr.length ≤ 10^5
- Elements can be any integer
- The two-pointer swap only iterates to arr.length / 2, so no element is swapped twice

---

## Time Complexity

| Approach | Time Complexity |
|---|---|
| In-place two-pointer swap | O(n) |
| Extra array copy | O(n) |
| Stack-based | O(n) |
| Recursion | O(n) |

---

## Space Complexity

| Approach | Space Complexity |
|---|---|
| In-place two-pointer swap | O(1) |
| Extra array copy | O(n) |
| Stack-based | O(n) |
| Recursion | O(n) — call stack depth |

---
