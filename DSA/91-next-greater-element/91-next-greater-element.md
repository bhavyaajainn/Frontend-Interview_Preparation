# Program to Print the Next Greater Element in the Array

---

## Problem Statement

Given an array of integers, for each element find the **next greater element** — the first element to its right that is strictly greater than it. If no such element exists, output `-1`.

Two approaches:
1. **Brute Force** — nested loops, O(n²) time, O(1) space
2. **Stack** — single pass using a monotonic stack, O(n) time, O(n) space

---

## Examples

### Example 1 — General Case

**Input:**

```
arr = [4, 5, 2, 25]
```

**Output:**

```
4  ---> 5
5  ---> 25
2  ---> 25
25 ---> -1
```

**Explanation:**
For `4`: next greater to its right is `5`. For `5`: next greater is `25`. For `2`: next greater is `25`. For `25`: no greater element exists → `-1`.

---

### Example 2 — Descending Order (Worst Case)

**Input:**

```
arr = [11, 13, 21, 3]
```

**Output:**

```
11 ---> 13
13 ---> 21
21 ---> -1
3  ---> -1
```

**Explanation:**
`11` → next greater is `13`. `13` → next greater is `21`. `21` and `3` → no greater elements to their right → `-1`.

---

### Example 3 — All Descending (Stack Worst Case)

**Input:**

```
arr = [5, 4, 3, 2, 1]
```

**Output:**

```
5 ---> -1
4 ---> -1
3 ---> -1
2 ---> -1
1 ---> -1
```

**Explanation:**
Every element is smaller than all elements to its left — nothing greater exists to the right for any element.

---

### Example 4 — Single Element

**Input:**

```
arr = [7]
```

**Output:**

```
7 ---> -1
```

**Explanation:**
No elements to the right of `7`. Next greater is `-1`.

---

## Constraints

- `1 <= arr.length <= 10^4`
- `-10^5 <= arr[i] <= 10^5`
- Output the next greater element for each position in order
- If no greater element exists to the right → output `-1`
- Stack approach processes each element at most 4 times in the worst case

---

## Time Complexity

| Approach | Time | When |
|---|---|---|
| Brute Force | O(n²) | Nested loops — worst case: all descending |
| Stack | O(n) | Each element pushed/popped at most twice |

---

## Space Complexity

| Approach | Space | Reason |
|---|---|---|
| Brute Force | O(1) | Only index variables used |
| Stack | O(n) | Stack can hold up to n elements in worst case |

---
