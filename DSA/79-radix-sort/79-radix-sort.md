# Radix Sort

---

## Problem Statement

Implement Radix Sort for two variants:
1. **Positive integers** — sort digit by digit from least significant to most significant place
2. **Negative integers** — extend with range-shifted counting sort to handle negative digits

Radix sort uses counting sort as an intermediate stable sort at each digit place.

---

## Examples

### Example 1 — Positive Integers

**Input:**

```
arr = [121, 432, 564, 23, 1, 45, 788]
```

**Output:**

```
[1, 23, 45, 121, 432, 564, 788]
```

**Explanation:**
max = 788 (3 digits). Pass 1 (units): sort by `arr[i] % 10`. Pass 2 (tens): sort by `Math.floor(arr[i]/10) % 10`. Pass 3 (hundreds): sort by `Math.floor(arr[i]/100) % 10`. Each pass uses a stable counting sort.

---

### Example 2 — Negative Integers

**Input:**

```
arr = [121, -432, 564, 23, -1, 45, 788]
```

**Output:**

```
[-432, -1, 23, 45, 121, 564, 788]
```

**Explanation:**
Digit extraction `Math.floor(arr[i] / place) % 10` can produce negative digits for negative numbers. Shift by subtracting min digit to use non-negative count array indices.

---

### Example 3 — Already Sorted

**Input:**

```
arr = [1, 2, 3, 4, 5]
```

**Output:**

```
[1, 2, 3, 4, 5]
```

**Explanation:**
max = 5 (1 digit). One pass of counting sort. No reordering needed.

---

### Example 4 — Single Element

**Input:**

```
arr = [42]
```

**Output:**

```
[42]
```

**Explanation:**
max = 42 (2 digits). Both passes run but produce no reordering.

---

## Constraints

- Positive variant: all elements ≥ 0
- Negative variant: elements can be any integer
- Elements must be integers (radix sort is not applicable to floating point)
- The digit extraction formula: `Math.floor(arr[i] / place) % 10`
- `place` starts at 1 and multiplies by 10 each pass: 1 → 10 → 100 → ...
- Loop continues while `place <= max`

---

## Time Complexity

- O(d × (n + k)) — d = number of digits in max element, n = array size, k = base (10 for decimal)
- Better than O(n log n) comparison sorts when d is small relative to n

---

## Space Complexity

- O(n + k) — output array (n) + count/frequency array (k = 10 for positive variant)

---

## Key Difference from Counting Sort

| | Counting Sort | Radix Sort |
|---|---|---|
| Sorts by | Element value | Digit at each place |
| Passes | 1 | d (number of digits in max) |
| Range needed | max - min | 0–9 per pass |
| Use case | Small range | Large numbers with few digits |

---
