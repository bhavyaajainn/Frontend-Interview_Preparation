# Shuffle an Array

---

## Problem Statement

Given an array, produce a **random permutation** of its elements using the **Fisher–Yates Shuffle** algorithm. The algorithm guarantees a uniform distribution — every permutation is equally likely.

The algorithm works by iterating from the last index down to 0, at each step picking a random index in the remaining unshuffled portion and swapping the current element with the randomly chosen one.

Three variants:
1. **In-place** — mutates the original array
2. **Non-mutating** — shuffles a copy (`arr.slice()`) and returns it
3. **Prototype method** — adds `Array.prototype.Shuffle` for universal use

---

## Examples

### Example 1 — In-Place Shuffle

**Input:**

```
arr = [2, 5, 7, 11, 25]
```

**Output (random):**

```
[7, 11, 5, 2, 25]
```

**Explanation:**
Starting at index 4 (length - 1), a random index is chosen and the two elements are swapped. This continues down to index 0. Result is a valid random permutation.

---

### Example 2 — Non-Mutating Shuffle

**Input:**

```
arr = [2, 5, 7, 11, 25]
shuffle(arr.slice())
```

**Output:**

```
Original: [2, 5, 7, 11, 25]
Shuffled: [11, 25, 5, 2, 7]
```

**Explanation:**
`arr.slice()` creates a copy — the original array is preserved. The copy is shuffled in-place and returned.

---

### Example 3 — Single Element

**Input:**

```
arr = [42]
```

**Output:**

```
[42]
```

**Explanation:**
Loop starts at `currentIndex = 1`. First iteration: random index in `[0, 1)` = 0, swap `arr[0]` with `arr[0]` — no change. Loop ends. Single element always returns itself.

---

### Example 4 — Two Elements

**Input:**

```
arr = [1, 2]
```

**Output (50/50):**

```
[1, 2]  or  [2, 1]
```

**Explanation:**
`currentIndex = 2`. Random index in `[0, 2)` is 0 or 1. If 0: swap `arr[1]` and `arr[0]` → `[2, 1]`. If 1: swap `arr[1]` with itself → `[1, 2]`. Equal probability.

---

## Constraints

- `1 <= arr.length <= 10^5`
- Array elements can be any type (numbers, strings, objects)
- Every permutation must be equally likely — Fisher–Yates guarantees this
- In-place variant mutates original; use `arr.slice()` to preserve original
- `Math.floor(Math.random() * currentIndex)` generates uniform random index in `[0, currentIndex)`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Single loop from n-1 down to 0, one swap per iteration |

---

## Space Complexity

| Variant | Space | Reason |
|---|---|---|
| In-place | O(1) | Only a temp variable for swapping |
| Non-mutating / Prototype | O(n) | `arr.slice()` creates a copy of size n |

---
