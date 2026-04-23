# Find Distinct Ways to Climb the Stairs

---

## Problem Statement

There are `n` stairs and you can climb either 1 or 2 steps at a time. Find the total number of distinct ways to reach the top. This is a classic dynamic programming problem — the answer at each step is the sum of ways from the previous two steps (identical to the Fibonacci pattern).

---

## Examples

### Example 1

**Input:**

```
n = 2
```

**Output:**

```
2
```

**Explanation:**
- 1 step + 1 step
- 2 steps

---

### Example 2

**Input:**

```
n = 3
```

**Output:**

```
3
```

**Explanation:**
- 1 step + 1 step + 1 step
- 2 steps + 1 step
- 1 step + 2 steps

---

### Example 3

**Input:**

```
n = 5
```

**Output:**

```
8
```

**Explanation:**
There are 8 distinct combinations of 1-step and 2-step moves that reach stair 5.

---

### Example 4

**Input:**

```
n = 1
```

**Output:**

```
1
```

**Explanation:**
Only one way: take a single 1-step.

---

## Constraints

- 1 ≤ n ≤ 45
- You can only take 1 or 2 steps at a time
- The result follows the Fibonacci sequence: ways(n) = ways(n-1) + ways(n-2)

---

## Time Complexity

| Method | Complexity |
|---|---|
| Recursion (naive) | O(2ⁿ) — exponential due to repeated subproblem calls |
| Recursion + Memoization (DP) | O(n) — each step computed exactly once |

---

## Space Complexity

| Method | Complexity |
|---|---|
| Recursion (naive) | O(n) — call stack depth |
| Recursion + Memoization (DP) | O(n) — memo array + call stack |

---
