# Method Chaining with Priority

## Problem Statement

Extend the async method chaining solution (problem 71) with a `coffeeBreak(duration, priority=1)` method that always executes at position `priority` in the queue, regardless of where it appears in the chain.

```js
new UberDriver()
  .pick("TestUser")   // queued at index 0
  .pick("Rahul")      // queued at index 1
  .coffeeBreak(3, 1)  // spliced to index 0 → executes FIRST
  .drive(2)
  .drop("Rahul")
  .rest(10);
// Output order: coffeeBreak → pick TestUser → pick Rahul → drive → drop → rest
```

---

## Key Design Point: Why Queue + Debounce (not Promise Chain)

The promise-chain approach from problem 71 cannot support priority insertion — by the time `coffeeBreak` is called, earlier promises are already queued and immutable. The **queue + debounce** approach stores tasks as pending functions in an array, so `splice` can inject `coffeeBreak` at any index before execution starts.

```
pick("A")     → queue = [pickA]
pick("B")     → queue = [pickA, pickB]
coffeeBreak(3, 1) → queue.splice(0, 0, coffee) → [coffee, pickA, pickB]
                  debounce resets timer ↑
rest(10)      → queue = [coffee, pickA, pickB, rest]
               ↓ setTimeout(0) fires → executeInSequence starts
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `splice(priority-1, 0, task)` | Inserts `task` at zero-based index `priority-1`; shifts all tasks at that index and beyond right by one |
| Debounce necessity | `setTimeout(fn, 0)` defers execution to after the full synchronous call stack — ensures `coffeeBreak` is spliced before execution begins |
| Single-break guard | `hasTakenCoffeeBreak` flag prevents duplicate coffee breaks; remove to allow multiple |
| `priority=1` | Executes before everything — maps to `splice(0, ...)` |
| Out-of-range priority | If `priority > queue.length`, `splice` appends at the end — safe, no error |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `pick` / `drop` / `drive` / `rest` | O(1) — push to end of queue |
| `coffeeBreak` | O(n) — `splice` shifts up to n elements |
| `executeInSequence` | O(n) total — processes each task once |
| Space | O(n) for the queue |
