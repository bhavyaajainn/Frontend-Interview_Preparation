# Maximum Collatz Sequence Under 1,000,000

---

## Problem Statement

Find the starting number under 1,000,000 that produces the longest Collatz sequence. The Collatz rule is: if a number is even, divide it by 2; if odd, multiply by 3 and add 1. Repeat until the number reaches 1. Return the starting number whose sequence has the maximum count of steps.

---

## Examples

### Example 1

**Input:**

```
limit = 10
```

**Output:**

```
9
```

**Explanation:**
Among numbers 1–10, starting number 9 produces the longest Collatz sequence with 20 steps: 9 → 28 → 14 → 7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1.

---

### Example 2

**Input:**

```
limit = 20
```

**Output:**

```
18
```

**Explanation:**
Among numbers 1–20, starting number 18 produces the longest Collatz sequence with 21 steps.

---

### Example 3

**Input:**

```
limit = 100
```

**Output:**

```
97
```

**Explanation:**
Among numbers 1–100, starting number 97 produces the longest Collatz sequence with 119 steps.

---

### Example 4

**Input:**

```
limit = 1000000
```

**Output:**

```
837799
```

**Explanation:**
Among all numbers from 1 to 1,000,000, the number 837799 produces the longest Collatz sequence with 525 steps. Memoization is used to cache already-computed sequence lengths, avoiding redundant computation when a number in the current chain was previously encountered.

---

## Constraints

- 1 ≤ limit ≤ 10^6
- The starting number must be strictly less than the given limit
- Sequence always terminates at 1 (Collatz conjecture — unproven but holds for all tested values up to very large bounds)

---

## Time Complexity

- Not fixed; the Collatz sequence length for any individual number has no known closed-form bound
- With memoization, each unique number is computed at most once, making the overall loop over 1,000,000 numbers significantly faster in practice

---

## Space Complexity

- O(N) where N = 1,000,000 — a memo object of size N is used to cache the sequence count for every number from 1 to the limit

---
