# Sum and Product of All Nodes in Linked List Less Than K

---

## Problem Statement

Given a singly linked list and an integer `k`, find the **sum** and **product** of all node values that are **strictly less than k**. Traverse the list once, accumulate sum with `+` and product with `*` for qualifying nodes, then return or print both results.

---

## Examples

### Example 1 — General Case

**Input:**

```
5 -> 15 -> 17 -> 3 -> 22 -> 9 -> 2 -> 13
k = 15
```

**Output:**

```
sum = 32, product = 3510
```

**Explanation:**
Nodes less than 15: `5, 3, 9, 2, 13`. Sum = `5 + 3 + 9 + 2 + 13 = 32`. Product = `5 × 3 × 9 × 2 × 13 = 3510`.

---

### Example 2 — No Nodes Less Than K

**Input:**

```
10 -> 20 -> 30
k = 5
```

**Output:**

```
sum = 0, product = 1
```

**Explanation:**
No node values are less than 5. Sum stays at initial value `0`, product stays at initial value `1` (multiplicative identity).

---

### Example 3 — All Nodes Less Than K

**Input:**

```
1 -> 2 -> 3
k = 10
```

**Output:**

```
sum = 6, product = 6
```

**Explanation:**
All nodes qualify: `1, 2, 3`. Sum = `1 + 2 + 3 = 6`. Product = `1 × 2 × 3 = 6`.

---

### Example 4 — K Equals a Node Value (Strict Less Than)

**Input:**

```
5 -> 10 -> 15
k = 10
```

**Output:**

```
sum = 5, product = 5
```

**Explanation:**
Only `5` is strictly less than `10`. Node with value `10` is excluded (not less than, equal to k). Sum = `5`, Product = `5`.

---

## Constraints

- `1 <= number of nodes <= 10^4`
- `-10^5 <= Node.element <= 10^5`
- `k` can be any integer
- Condition is **strict** — nodes equal to `k` are not included
- Sum starts at `0`, product starts at `1` (multiplicative identity)
- If no nodes qualify: sum = `0`, product = `1`

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Every node is visited exactly once |

---

## Space Complexity

- O(1) — only two variables (`sum` and `product`) used regardless of list size

---
