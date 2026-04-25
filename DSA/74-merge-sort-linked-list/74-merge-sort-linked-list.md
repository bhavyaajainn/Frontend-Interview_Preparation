# Merge Sort a Linked List

---

## Problem Statement

Given the head of a singly linked list, sort it in ascending order using Merge Sort and return the new head. Unlike array merge sort, linked list merge sort can be done in O(1) auxiliary space since nodes can be relinked without copying values.

---

## Examples

### Example 1

**Input:**

```
40 -> 10 -> 35 -> 70 -> 22 -> 3 -> 5
```

**Output:**

```
3 -> 5 -> 10 -> 22 -> 35 -> 40 -> 70
```

**Explanation:**
Find middle → split into [40,10,35] and [70,22,3,5]. Recursively sort each half. Merge sorted halves by comparing heads and relinking nodes.

---

### Example 2

**Input:**

```
5 -> 3 -> 1
```

**Output:**

```
1 -> 3 -> 5
```

**Explanation:**
Middle node is 3. Left: [5], Right: [3,1] → sorted right [1,3]. Merge [5] and [1,3] → [1,3,5].

---

### Example 3

**Input:**

```
7
```

**Output:**

```
7
```

**Explanation:**
Base case: `head === null || head.next === null` — return head immediately.

---

### Example 4

**Input:**

```
10 -> 10 -> 5
```

**Output:**

```
5 -> 10 -> 10
```

**Explanation:**
Duplicate values are handled correctly. Stability is maintained: equal elements from the left list are placed before those from the right.

---

## Constraints

- 1 ≤ list length ≤ 10^4
- Base case: single node or null — return immediately
- Find the middle using the **slow/fast pointer (Floyd's)** technique
- Set `middle.next = null` to physically split the list before recursing
- `sortedMerge` recurses on next pointers directly — no extra array needed

---

## Time Complexity

- O(n log n) — log n levels of splitting, O(n) merge work per level

---

## Space Complexity

- O(log n) — recursive call stack depth (log n levels of splitting)
- O(1) auxiliary space — no temporary arrays; nodes are relinked in-place

---

## Key Advantage Over Array Merge Sort

Array merge sort requires O(n) auxiliary space for temporary arrays during merging. Linked list merge sort avoids this by manipulating `next` pointers directly — only the call stack is used.

---
