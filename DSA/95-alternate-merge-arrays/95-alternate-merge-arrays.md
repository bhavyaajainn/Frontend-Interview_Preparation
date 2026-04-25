# Alternatively Merge Two Different Arrays

---

## Problem Statement

Given two arrays of possibly different lengths, merge them **alternatively** into a third array — picking one element from each array in turn. Once one array is exhausted, append the remaining elements of the other array to the result.

Steps:
1. Use two pointers `i` and `j`, starting at index 0 of each array
2. While both arrays have elements: push `arr1[i]` then `arr2[j]`, advance both pointers
3. Append any remaining elements from `arr1` or `arr2`

---

## Examples

### Example 1 — First Array Longer

**Input:**

```
arr1 = [1, 2, 3, 4, 5, 6, 7, 8]
arr2 = [11, 22, 33, 44]
```

**Output:**

```
[1, 11, 2, 22, 3, 33, 4, 44, 5, 6, 7, 8]
```

**Explanation:**
Elements are interleaved until `arr2` is exhausted after index 3. Remaining elements from `arr1` (`5, 6, 7, 8`) are appended at the end.

---

### Example 2 — Second Array Longer

**Input:**

```
arr1 = [1, 2]
arr2 = [10, 20, 30, 40]
```

**Output:**

```
[1, 10, 2, 20, 30, 40]
```

**Explanation:**
Elements interleaved until `arr1` is exhausted after index 1. Remaining elements from `arr2` (`30, 40`) are appended.

---

### Example 3 — Equal Length Arrays

**Input:**

```
arr1 = [1, 3, 5]
arr2 = [2, 4, 6]
```

**Output:**

```
[1, 2, 3, 4, 5, 6]
```

**Explanation:**
Both arrays exhaust at the same time. Result is a perfectly interleaved merged array.

---

### Example 4 — One Empty Array

**Input:**

```
arr1 = [1, 2, 3]
arr2 = []
```

**Output:**

```
[1, 2, 3]
```

**Explanation:**
The while loop for simultaneous traversal never runs. All elements from `arr1` are appended in the first tail-loop.

---

## Constraints

- `0 <= arr1.length, arr2.length <= 10^4`
- `-10^5 <= arr[i] <= 10^5`
- Returns a new third array — original arrays are not mutated
- If both arrays are empty, return an empty array `[]`
- Order within each array is preserved; elements from `arr1` always precede `arr2` elements at each interleaved position

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n1 + n2) | Every element from both arrays is visited exactly once |

---

## Space Complexity

- O(n1 + n2) — the result array holds all elements from both arrays
- No in-place modification — a new third array is always allocated

---
