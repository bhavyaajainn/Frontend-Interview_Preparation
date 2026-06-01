# Async Methods Chaining

## Problem Statement

Implement `UberDriver` where methods can be chained and delay-based methods pause execution before the next method runs.

```js
new UberDriver()
  .pick("TestUser")
  .pick("Rahul")
  .drive(2)        // wait 2 seconds
  .drop("Rahul")
  .drive(4)        // wait 4 seconds
  .drop("TestUser")
  .rest(10);       // wait 10 seconds
```

---

## Why Naive Approaches Fail

| Attempt | Problem |
|---|---|
| `this.delay().then(() => return this)` | Returns `undefined` synchronously; breaks the chain |
| `async drive() { await delay; return this; }` | `async` always returns a Promise — caller must `.then()` it, destroying fluent chaining |

---

## Approach 1 — Queue + Debounce

Each method pushes a task-factory (`() => Promise`) into `this.queue` and schedules `executeInSequence` via `setTimeout(fn, 0)`. The `clearTimeout` + `setTimeout(0)` debounce ensures execution only starts after the full chain is registered (all synchronous calls complete before the event loop picks up the timeout).

```
pick → push task, clearTimeout, setTimeout(0)
pick → push task, clearTimeout, setTimeout(0)   ← resets the timer
...
rest → push task, clearTimeout, setTimeout(0)   ← only this fires
        ↓
executeInSequence: shift + call → .then(recurse)
```

## Approach 2 — Promise Chain (Optimal)

Start with `this.queue = Promise.resolve()`. Each method appends to the chain:

```js
this.queue = this.queue.then(() => { /* do work */ });
```

This works because `.then()` is registered synchronously; the async work executes in the correct order via microtask scheduling. No debounce needed.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `setTimeout(fn, 0)` debounce | Defers execution to after the current synchronous call stack — lets all chain methods register before execution starts |
| `Promise.resolve()` seed | Approach 2 needs a resolved base promise so the first `.then()` fires immediately when the event loop processes it |
| `return this` | Every method must return `this` synchronously, regardless of whether async work is pending |
| `executeInSequence` recursion | Shift task → call it → in `.then()` check if queue has more → recurse — guarantees serial execution |
| `drive` / `rest` in Approach 2 | Use `async () => { log; await this.delay(n) }` inside `.then()` so the next `.then()` in the chain waits for the delay |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Per method call | O(1) — just pushes a closure or chains a `.then()` |
| Total execution | O(n) serial where n = number of chained methods |
| Space | O(n) for the queue array (Approach 1) or Promise chain (Approach 2) |
