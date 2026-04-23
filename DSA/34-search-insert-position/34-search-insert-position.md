# Find the Correct Position to Insert an Element in the Array

---

## Problem Statement

Given a sorted array of distinct integers and a target value, return the index of the target if found. If not found, return the index where it would be inserted to keep the array sorted.

---

## Examples

### Example 1

**Input:**

```
nums = [1, 3, 5, 6]
target = 5
```

**Output:**

```
2
```

**Explanation:**
5 is already present at index 2.

---

### Example 2

**Input:**

```
nums = [1, 3, 5, 6]
target = 2
```

**Output:**

```
1
```

**Explanation:**
2 is not in the array. It would be inserted at index 1, between 1 and 3.

---

### Example 3

**Input:**

```
nums = [1, 3, 5, 6]
target = 7
```

**Output:**

```
4
```

**Explanation:**
7 is greater than all elements, so it is inserted at the end at index 4.

---

### Example 4

**Input:**

```
nums = [1, 3, 5, 6]
target = 0
```

**Output:**

```
0
```

**Explanation:**
0 is smaller than all elements, so it is inserted at the beginning at index 0.

---

## Constraints

- 1 ≤ nums.length ≤ 10^4
- -10^4 ≤ nums[i] ≤ 10^4
- nums is sorted in ascending order with no duplicates
- -10^4 ≤ target ≤ 10^4

---

## Time Complexity

| Method | Complexity |
|---|---|
| Linear scan | O(n) — iterates through the array twice at most |
| Binary search | O(log n) — halves the search space each iteration |

---

## Space Complexity

- O(1) — no extra space used in either approach

---
