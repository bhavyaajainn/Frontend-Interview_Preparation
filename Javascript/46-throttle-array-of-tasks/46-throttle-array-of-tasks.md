# Throttle an Array of Tasks

## Problem Statement

Implement `throttle(task, count, callback, delay)` that returns a function.  
When the returned function is called:

- On the **first call**: all tasks are pushed into an internal queue; the first `count` tasks are dequeued and passed to `callback` immediately.
- On **subsequent calls**: the function debounces — it waits until `delay` ms have elapsed since the last execution before picking the next `count` tasks from the queue.
- When the queue is **exhausted**, it refills from the original `task` array.

```js
const fn = throttle([1,2,3,4,5,6,7,8,9,10], 5, console.log, 2000);

fn(); // [1,2,3,4,5]  — immediately
fn(); // [6,7,8,9,10] — after 2 s
fn(); // [1,2,3,4,5]  — after 2 s  (queue refilled)
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `queue` array | Persists between calls; accumulates tasks and drains by `count` per batch |
| `lastRan` guard | `undefined` on first call — triggers immediate execution |
| Debounce pattern | `clearTimeout` + new `setTimeout` ensures only one pending timer exists at a time |
| Timer duration | `delay - (Date.now() - lastRan)` fires at exactly `lastRan + delay`, not `delay` from *this* call |
| Queue refill | When empty, repopulated from original `task` array so batches cycle infinitely |
| Default `count` | `task.length` — first call always drains the entire array if count is omitted |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(count) per execution |
| Space | O(n) for the queue (at most `n = task.length` items) |
