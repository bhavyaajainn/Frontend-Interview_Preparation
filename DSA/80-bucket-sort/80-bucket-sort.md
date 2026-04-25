# Bucket Sort

---

## Problem Statement

Implement Bucket Sort for two variants:
1. **Positive floating values** — distribute into n buckets based on `Math.floor(arr[i]) * n`, sort each bucket, then gather
2. **Mixed (positive + negative) floating values** — separate positives and negatives, sort each group independently, then merge

---

## Examples

### Example 1 — Positive Floats

**Input:**

```
arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]
```

**Output:**

```
[0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52]
```

**Explanation:**
n = 7 buckets. `0.32 → bucket 0`, `0.42 → bucket 0`, `0.52 → bucket 0`, `0.51 → bucket 0`. Each bucket is sorted individually, then all buckets are gathered in order.

---

### Example 2 — Mixed Floats (Positive + Negative)

**Input:**

```
arr = [-0.897, 0.565, 0.656, -0.1234, 0, 0.3434]
```

**Output:**

```
[-0.897, -0.1234, 0, 0.3434, 0.565, 0.656]
```

**Explanation:**
Negative values `[-0.897, -0.1234]` are extracted, converted to positive `[0.897, 0.1234]`, bucket sorted → `[0.1234, 0.897]`, then reversed and negated → `[-0.897, -0.1234]`. Merged with sorted positives.

---

### Example 3 — Single Element

**Input:**

```
arr = [0.5]
```

**Output:**

```
[0.5]
```

**Explanation:**
One bucket, one element. Trivially sorted.

---

### Example 4 — Already Sorted

**Input:**

```
arr = [0.1, 0.2, 0.3]
```

**Output:**

```
[0.1, 0.2, 0.3]
```

**Explanation:**
Elements distributed across separate buckets. Each bucket has one element — no sorting needed within buckets.

---

## Constraints

- Positive variant: all values in [0, 1) — values must be in [0, 1) for `Math.floor(arr[i]) * n` to distribute correctly into n buckets
- Mixed variant: values can be any float in range [-1, 1)
- Bucket index formula: `Math.floor(arr[i]) * n`
- Each bucket is sorted individually using JavaScript's built-in `.sort()`
- Most suitable when values are uniformly distributed across the range

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(n + k) | Uniform distribution, each bucket ≈ 1 element |
| Average | O(n) | Uniformly distributed input |
| Worst | O(n²) | All elements in one bucket (skewed distribution) |

---

## Space Complexity

- O(n²) — n buckets each potentially holding n elements in worst case
- O(n + k) average — n total elements spread across k buckets

---
