# Print All the Quadruplets with Given Sum

---

## Problem Statement

Given an integer array `arr` of size `n` and an integer `target`, return **all unique quadruplets** `[a, b, c, d]` such that:

- `a + b + c + d = target`
- All elements belong to different indices in the array.
- The result must not contain duplicate quadruplets.

This problem is an extension of the classic **4 Sum** problem where instead of checking for existence, we must print all valid unique quadruplets.

---

## Examples

### Example 1

**Input:**  
arr = [2, 7, 4, 0, 9, 5, 1, 3]  
target = 20

**Output:**  
[0, 4, 7, 9]  
[1, 3, 7, 9]  
[2, 4, 5, 9]

**Explanation:**  
After sorting the array, we search for all combinations of four numbers whose sum equals 20. Only the above unique quadruplets satisfy the condition.

---

### Example 2

**Input:**  
arr = [1, 2, 3, 5, 6, 11, 15, 16, 17, 18]  
target = 20

**Output:**  
[1, 2, 6, 11]  
[1, 3, 5, 11]

**Explanation:**  
We fix two numbers and use the two-pointer approach to find the remaining two numbers that complete the target sum.

---

### Example 3

**Input:**  
arr = [1, 0, -1, 0, -2, 2]  
target = 0

**Output:**  
[-2, -1, 1, 2]  
[-2, 0, 0, 2]  
[-1, 0, 0, 1]

**Explanation:**  
Sorting helps avoid duplicate combinations. All valid unique quadruplets summing to 0 are listed above.

---

### Example 4

**Input:**  
arr = [2, 2, 2, 2, 2]  
target = 8

**Output:**  
[2, 2, 2, 2]

**Explanation:**  
Although multiple index combinations exist, only one unique quadruplet is possible.

---

## Constraints

- 1 ≤ n ≤ 2000
- -10⁹ ≤ arr[i] ≤ 10⁹
- -10⁹ ≤ target ≤ 10⁹
- The output must contain only unique quadruplets.

---

## Time Complexity

- Sorting the array: **O(n log n)**
- Nested loops with two-pointer search: **O(n³)**

Overall Time Complexity:

**O(n³)**

---

## Space Complexity

- No extra data structures used apart from result storage.

Auxiliary Space Complexity:

**O(1)** (excluding output storage)

---
