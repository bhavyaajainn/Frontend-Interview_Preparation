# Dutch National Flag Problem

---

## Problem Statement

Given an array containing only 0s, 1s, and 2s, sort it in-place in linear time and constant space (ascending order: all 0s, then 1s, then 2s).

Named after the three colours of the Netherlands flag, this is a classic variant of the three-way partition in quicksort.

---

## Examples

### Example 1

**Input:**

```
arr = [2, 0, 1, 0, 2]
```

**Output:**

```
[0, 0, 1, 2, 2]
```

**Explanation:**
Three pointers: `low = 0`, `mid = 0`, `high = 4`. The mid pointer scans left to right. 0s are swapped to the low region, 2s to the high region, and 1s are left in place.

---

### Example 2

**Input:**

```
arr = [2, 2, 2, 0, 0, 0, 1, 1]
```

**Output:**

```
[0, 0, 0, 1, 1, 2, 2, 2]
```

**Explanation:**
All 2s appear first, so they get repeatedly swapped to the high end. Once mid passes all 2s, 0s swap to the low end and 1s are skipped.

---

### Example 3

**Input:**

```
arr = [0, 1, 2, 0, 1, 2]
```

**Output:**

```
[0, 0, 1, 1, 2, 2]
```

**Explanation:**
Step-by-step array state after each swap: [0,1,2,0,1,2] → [0,1,1,0,2,2] → [0,0,1,1,2,2].

---

### Example 4

**Input:**

```
arr = [1]
```

**Output:**

```
[1]
```

**Explanation:**
Single element — mid starts at 0, high at 0. arr[mid] = 1 → mid++ → mid > high → loop exits immediately.

---

## Constraints

- Array contains only the values 0, 1, and 2
- 1 ≤ arr.length ≤ 10^5
- Must be sorted in O(n) time and O(1) space
- Three-pointer logic: `low` tracks the boundary for 0s, `high` tracks the boundary for 2s, `mid` is the current element being examined
- Loop invariant: arr[0..low-1] = 0, arr[low..mid-1] = 1, arr[high+1..n-1] = 2

---

## Time Complexity

| Approach | Time Complexity |
|---|---|
| Three-pointer (one pass) | O(n) |
| Count then overwrite (multi-pass) | O(n) |

---

## Space Complexity

- O(1) — in-place; only three pointer variables used

---
