# Program to Sort Only Positive Numbers of the Array

---

## Problem Statement

Given an array of integers containing both positive and negative numbers, sort **only the positive numbers** in ascending order while keeping the **negative numbers fixed in their original positions**.

Steps:
1. Filter out positive numbers from the array and sort them
2. Traverse the original array — when a positive number is encountered, replace it with the next sorted positive number
3. Negative numbers remain at their original indices unchanged

---

## Examples

### Example 1 — General Case

**Input:**

```
arr = [2, -6, -3, -8, 4, 1]
```

**Output:**

```
[1, -6, -3, -8, 2, 4]
```

**Explanation:**
Positive numbers: `[2, 4, 1]` → sorted: `[1, 2, 4]`. Replace positives in original positions: index 0 → `1`, index 4 → `2`, index 5 → `4`. Negatives at indices 1, 2, 3 stay unchanged.

---

### Example 2 — Multiple Positives

**Input:**

```
arr = [9, -2, 3, -1, 1, 5]
```

**Output:**

```
[1, -2, 3, -1, 5, 9]
```

**Explanation:**
Positive numbers: `[9, 3, 1, 5]` → sorted: `[1, 3, 5, 9]`. Replace positives in order: index 0 → `1`, index 2 → `3`, index 4 → `5`, index 5 → `9`. Negatives at indices 1 and 3 stay.

---

### Example 3 — All Negative

**Input:**

```
arr = [-3, -1, -4, -2]
```

**Output:**

```
[-3, -1, -4, -2]
```

**Explanation:**
No positive numbers to sort. The filtered array is empty. All elements remain in their original positions.

---

### Example 4 — All Positive

**Input:**

```
arr = [5, 3, 1, 4, 2]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
All elements are positive — sorting the full array. No negatives to preserve, so result is fully sorted ascending.

---

## Constraints

- `1 <= arr.length <= 10^4`
- `-10^5 <= arr[i] <= 10^5`
- Zero is neither positive nor negative — treat `0` as a non-positive (keep in place, do not sort)
- Negative numbers must stay at their exact original indices
- Return a new array — do not mutate the original

---

## Time Complexity

| Step | Time |
|---|---|
| Filter positives | O(n) |
| Sort filtered positives | O(k log k) where k = number of positives |
| Rebuild array | O(n) |
| **Total** | **O(n log n)** |

---

## Space Complexity

- O(n) — filtered positive array (size k ≤ n) + result array (size n)
- Total auxiliary space: O(n)

---
