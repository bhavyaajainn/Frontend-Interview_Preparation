# Implement Two Stacks with an Array

---

## Problem Statement

Design a data structure `twoStacks` that implements **two stacks using a single array** of size `n`. The structure must support the following operations:

- `push1(elm)` — push element onto Stack 1
- `push2(elm)` — push element onto Stack 2
- `pop1()` — pop and return top element from Stack 1
- `pop2()` — pop and return top element from Stack 2

**Two approaches:**
1. **Method 1 (Naive)** — divide array into two equal halves; simple but space-inefficient
2. **Method 2 (Space Efficient)** — Stack 1 grows from index `0` forward; Stack 2 grows from index `n-1` backward; overflow only when they meet

---

## Examples

### Example 1 — Basic Push and Pop

**Input:**

```
stack = new twoStacks(10)
stack.push1('Prashant')
stack.push2('Yadav')
stack.pop1()
stack.pop2()
```

**Output:**

```
"Prashant"
"Yadav"
```

**Explanation:**
Stack 1 stores from index 0 forward (`top1 = 0`). Stack 2 stores from index 9 backward (`top2 = 9`). Each pop returns its respective top element.

---

### Example 2 — Multiple Pushes

**Input:**

```
stack = new twoStacks(5)
stack.push1(1), stack.push1(2)
stack.push2(10), stack.push2(20)
stack.pop1()
stack.pop2()
```

**Output:**

```
2
20
```

**Explanation:**
Stack 1: `[1, 2]` — pop returns `2` (LIFO). Stack 2: `[10, 20]` stored from end — pop returns `20` (LIFO).

---

### Example 3 — Stack Overflow

**Input:**

```
stack = new twoStacks(2)
stack.push1('a')
stack.push2('b')
stack.push1('c')   // overflow
```

**Output:**

```
"Stack overflow"
```

**Explanation:**
With size 2, `top1 = 0` and `top2 = 1`. When `push1('c')` is called, `top1 (0)` is no longer `< top2 - 1 (0)`, so overflow is reported.

---

### Example 4 — Stack Underflow

**Input:**

```
stack = new twoStacks(5)
stack.pop1()   // nothing pushed yet
```

**Output:**

```
"Stack underflow"
```

**Explanation:**
`top1` is initialized to `-1`. Popping when `top1 === -1` means Stack 1 is empty — underflow.

---

## Constraints

- `1 <= n <= 10^4` (total array size)
- Stack 1 grows left to right starting at index `0` (`top1` starts at `-1`)
- Stack 2 grows right to left starting at index `n-1` (`top2` starts at `n`)
- Overflow: when `top1 >= top2 - 1` (no space left between stacks)
- Underflow: Stack 1 pops when `top1 === -1`; Stack 2 pops when `top2 === n`
- Method 2 is preferred — no wasted space regardless of how elements are distributed

---

## Time Complexity

| Operation | Average | Worst |
|---|---|---|
| Access | Θ(N) | O(N) |
| Search | Θ(N) | O(N) |
| Insert (push) | Θ(1) | O(1) |
| Delete (pop) | Θ(1) | O(1) |

- Push and pop are O(1) — direct index operations
- Search and access are O(N) — no built-in indexing by value

---

## Space Complexity

| Case | Space |
|---|---|
| Worst | O(N) |

- A single array of size `n` is allocated — O(N) total
- No additional space used beyond the array and two index pointers

---
