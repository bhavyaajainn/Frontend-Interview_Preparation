# Find an Element Where Sum of Left Array Equals Sum of Right Array

---

## Problem Statement

Given an array of integers, find the **equilibrium element** — an element where the sum of all elements to its left equals the sum of all elements to its right. If no such element exists, return `-1`.

Three approaches:
1. **Brute Force** — nested loops, calculate left and right sum for each element — O(n²) time, O(1) space
2. **Prefix + Suffix Arrays** — precompute left and right sums — O(n) time, O(n) space
3. **Running Sum (Best)** — compute total right sum once, shrink right and grow left simultaneously — O(n) time, O(1) space

---

## Examples

### Example 1 — General Case

**Input:**

```
arr = [2, 1, 9, 3]
```

**Output:**

```
9
```

**Explanation:**
For element `9` at index 2: left sum = `2 + 1 = 3`, right sum = `3`. They are equal — return `9`.

---

### Example 2 — No Equilibrium

**Input:**

```
arr = [1, 2, 3]
```

**Output:**

```
-1
```

**Explanation:**
- `2`: left = `1`, right = `3` — not equal
- `3` has no right elements; `1` has no left elements
No element satisfies the condition — return `-1`.

---

### Example 3 — Multiple Candidates, Return First

**Input:**

```
arr = [2, 3, 4, 1, 4, 5]
```

**Output:**

```
1
```

**Explanation:**
For `1` at index 3: left sum = `2 + 3 + 4 = 9`, right sum = `4 + 5 = 9`. They are equal — return `1`.

---

### Example 4 — Single Element

**Input:**

```
arr = [7]
```

**Output:**

```
7
```

**Explanation:**
A single element has no left or right neighbors — both sums are 0. Return the element itself.

---

## Constraints

- `1 <= arr.length <= 10^5`
- `-10^5 <= arr[i] <= 10^5`
- Return the **first** equilibrium element found (left to right)
- Return `-1` if no such element exists
- A single-element array always returns that element

---

## Time Complexity

| Approach | Time | Space |
|---|---|---|
| Brute Force | O(n²) | O(1) |
| Prefix + Suffix Arrays | O(n) | O(n) |
| Running Sum | O(n) | O(1) |

---

## Space Complexity

- **Best:** O(1) — Method 3 (running sum), only two integer variables used
- Method 2 uses O(n) for two auxiliary arrays of size n
- Brute Force uses O(1) — only index pointers and counters

---
