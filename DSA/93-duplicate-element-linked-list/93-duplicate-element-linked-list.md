# Program to Find the Duplicate Element in the Linked List

---

## Problem Statement

Given a singly linked list, find and return the **first duplicate element** — the first element that appears more than once in the list. If no duplicate exists, return `-1`.

Two approaches:
1. **Nested Loops (Brute Force)** — for each element, scan the rest of the list for a match — O(n²) time, O(1) space
2. **Set** — track visited elements in a Set, return the first repeated one — O(n) time, O(n) space *(preferred)*

---

## Examples

### Example 1 — Duplicate Exists

**Input:**

```
10 -> 2 -> 5 -> 7 -> 9 -> 1 -> 2
```

**Output:**

```
2
```

**Explanation:**
Traversing the list: `10, 2, 5, 7, 9, 1, 2`. When we reach the second `2`, it's already been seen — return `2` as the first duplicate.

---

### Example 2 — No Duplicate

**Input:**

```
1 -> 2 -> 3 -> 4 -> 5
```

**Output:**

```
-1
```

**Explanation:**
All elements are unique. After traversing the entire list, no duplicate found — return `-1`.

---

### Example 3 — Duplicate at Adjacent Nodes

**Input:**

```
1 -> 2 -> 2 -> 3 -> 4
```

**Output:**

```
2
```

**Explanation:**
`2` appears twice consecutively. The Set approach detects it immediately on the second `2`. Nested loop finds it on first inner pass.

---

### Example 4 — Multiple Duplicates, Return First

**Input:**

```
3 -> 1 -> 4 -> 1 -> 5 -> 3
```

**Output:**

```
1
```

**Explanation:**
Both `1` and `3` are duplicates. `1` appears first as a repeated element (at index 3), so return `1`. The Set approach returns whichever element is seen twice first during traversal.

---

## Constraints

- `1 <= number of nodes <= 10^4`
- `-10^5 <= Node.element <= 10^5`
- Node values can be numbers or strings
- Return the **first** duplicate found during left-to-right traversal
- Return `-1` if no duplicates exist

---

## Time Complexity

| Approach | Time | Space |
|---|---|---|
| Nested Loops | O(n²) | O(1) |
| Set | O(n) | O(n) |

- Set approach is preferred for large lists — single pass with O(1) lookup per element
- Nested loop is useful when extra space is not allowed

---

## Space Complexity

| Approach | Space | Reason |
|---|---|---|
| Nested Loops | O(1) | Only pointer variables used |
| Set | O(n) | Set stores up to n unique elements |

---
