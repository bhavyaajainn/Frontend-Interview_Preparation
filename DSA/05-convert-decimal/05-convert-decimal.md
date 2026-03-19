# Convert Decimal to Binary, Octal or Hexadecimal

---

## Problem Statement

Given a decimal number `n` and a base `b`, convert the number from **decimal (base 10)** to the given base representation.

The base `b` can be:

- 2 (Binary)
- 8 (Octal)
- 16 (Hexadecimal)

The converted number should be returned as a string representation.

---

## Examples

### Example 1

**Input:**  
n = 1021313  
b = 2

**Output:**  
11111001010110000001

**Explanation:**  
The decimal number 1021313 converted to binary (base 2) results in 11111001010110000001.

---

### Example 2

**Input:**  
n = 1021313  
b = 8

**Output:**  
3712601

**Explanation:**  
The decimal number 1021313 converted to octal (base 8) results in 3712601.

---

### Example 3

**Input:**  
n = 1021313  
b = 16

**Output:**  
F9581

**Explanation:**  
The decimal number 1021313 converted to hexadecimal (base 16) results in F9581.

---

### Example 4

**Input:**  
n = 25  
b = 2

**Output:**  
11001

**Explanation:**  
25 in decimal equals 11001 in binary.

---

## Constraints

- 0 ≤ n ≤ 10⁹
- b ∈ {2, 8, 16}
- The output must be returned as a string.
- For hexadecimal representation, use uppercase letters A–F.

---

## Time Complexity

- Each division reduces the number by a factor of the base.
- The total number of iterations is proportional to the number of digits in the converted representation.

Overall Time Complexity:

**O(log₍b₎ n)**  
(Approximately O(log n))

---

## Space Complexity

- The output string stores all digits of the converted number.

Overall Space Complexity:

**O(log₍b₎ n)**

---
