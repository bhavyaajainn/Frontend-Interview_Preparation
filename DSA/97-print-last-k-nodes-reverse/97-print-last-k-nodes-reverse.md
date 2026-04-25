# Print the Last K Nodes of the Linked List in Reverse

---

## Problem Statement

Given a singly linked list and an integer `k`, print the **last k nodes** of the list in **reverse order** (i.e., from the tail towards the head, stopping after k nodes).

Two approaches:
1. **Recursive** — recurse to the tail, then print on the way back using a counter — O(n) time, O(n) call stack
2. **Stack** — push all elements onto a stack, pop k times — O(n) time, O(n) space

---

## Examples

### Example 1 — General Case

**Input:**

```
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
k = 5
```

**Output:**

```
7
6
5
4
3
```

**Explanation:**
Last 5 nodes are `3, 4, 5, 6, 7`. Reversed: `7, 6, 5, 4, 3`. The recursive approach prints them on the way back up the call stack; the stack approach pops them from a LIFO stack.

---

### Example 2 — K Equals List Length

**Input:**

```
1 -> 2 -> 3 -> 4
k = 4
```

**Output:**

```
4
3
2
1
```

**Explanation:**
All nodes are printed in reverse — equivalent to fully reversing the list output.

---

### Example 3 — K Greater Than List Length

**Input:**

```
1 -> 2 -> 3
k = 5
```

**Output:**

```
3
2
1
```

**Explanation:**
k (5) exceeds the list length (3). All nodes are printed in reverse. The stack approach breaks early when the stack is empty; the recursive approach stops when count exceeds the actual node count.

---

### Example 4 — K = 1

**Input:**

```
10 -> 20 -> 30 -> 40
k = 1
```

**Output:**

```
40
```

**Explanation:**
Only the last node is printed. Recursive approach increments count to 1 at the tail and prints it; stack pops once and stops.

---

## Constraints

- `1 <= number of nodes <= 10^4`
- `-10^5 <= Node.element <= 10^5`
- `1 <= k`
- If `k >= list length`, print all nodes in reverse
- Recursive approach uses implicit call stack — space is O(n) regardless of k
- Stack approach explicitly allocates O(n) space for the stack

---

## Time Complexity

| Approach | Time | When |
|---|---|---|
| Recursive | O(n) | Traverses full list via call stack |
| Stack | O(n) | Push all n elements, pop k |

---

## Space Complexity

| Approach | Space | Reason |
|---|---|---|
| Recursive | O(n) | Call stack depth equals list length |
| Stack | O(n) | Stack holds all n elements |

---
