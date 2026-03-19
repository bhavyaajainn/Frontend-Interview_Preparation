# Swap Two Numbers Without Using a Temporary Variable

---

## Problem Statement

Given two variables **a** and **b**, swap their values without using any extra temporary variable.

The swap must be performed in-place using constant space.

---

## Examples

### Example 1

**Input:**  
a = 1  
b = 2

**Output:**  
a = 2  
b = 1

**Explanation:**  
The values of `a` and `b` are exchanged without using a third variable.

---

### Example 2

**Input:**  
a = 10  
b = 15

**Output:**  
a = 15  
b = 10

**Explanation:**  
After swapping, the original value of `a` becomes the value of `b` and vice versa.

---

### Example 3

**Input:**  
a = -5  
b = 7

**Output:**  
a = 7  
b = -5

**Explanation:**  
The swapping works correctly even when one of the numbers is negative.

---

### Example 4

**Input:**  
a = 0  
b = 25

**Output:**  
a = 25  
b = 0

**Explanation:**  
Zero can also be swapped without affecting correctness.

---

## Constraints

- Values of `a` and `b` are integers.
- Values must be within the valid integer range.
- No additional variable should be used for swapping.
- The operation must be performed in constant time.

---

## Time Complexity

- **O(1)**  
  Swapping is performed using a fixed number of operations, independent of input size.

---

## Space Complexity

- **O(1)**  
  No extra space is used apart from the input variables.

---
