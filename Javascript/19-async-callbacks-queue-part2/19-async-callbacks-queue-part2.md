# Process Async Callbacks Queue - Part 2

## Problem Statement

Implement `Queue(processorFn, onCompleteFn, concurrency)` — an async task queue with concurrency control.

The constructor returns a `QueueObject` with four methods:

| Method | Description |
|---|---|
| `push(Task \| Task[])` | Add task(s) to the **end** of the queue and trigger processing |
| `unshift(Task \| Task[])` | Add task(s) to the **front** of the queue and trigger processing |
| `drain(callbackFn)` | Register a listener fired when **all** tasks are processed |
| `error(callbackFn(error, task))` | Register a listener fired on any task error |

- At most `concurrency` tasks run in parallel at any time.
- `processorFn(task, callback)` — processes one task, calls `callback(data, error?)`.
- `onCompleteFn(data, error, task)` — called after each task completes.

---

## Examples

```js
const myQueue = new Queue(processorFn, onCompleteFn, 2);

myQueue.push({ name: 'foo' });
myQueue.push([{ name: 'baz' }, { name: 'bay' }, { name: 'bax' }]);

// foo and baz run in parallel (concurrency = 2)
// bay and bax run next, etc.

myQueue.drain(() => console.log('All done'));
```

```js
// unshift inserts at front — runs before remaining queued items
myQueue.unshift({ name: 'priority-task' });
```

---

## Constraints

- `push` / `unshift` accept a single task or an array of tasks.
- New tasks added while processing continues should be picked up immediately if a slot is free.
- `drain` fires only when the queue is empty **and** no tasks are in-flight.
- Tasks that complete with an error call the `error` listener (and still count as processed).

---

## Approach

**Data storage**: maintain `items[]` (the queue), `functionsMap` (for `drain` / `error` listeners), and `itemsInProcess` counter.

**`push` / `unshift`**: normalise input to array, add to `items`, then call `startProcessing()` if `itemsInProcess < concurrency`.

**`startProcessing()`**:
1. Splice up to `concurrency` tasks from `items`.
2. For each task, increment `itemsInProcess` and call `processorFn(task, callback)`.
3. In the callback:
   - Call `onCompleteFn(data, error, task)`.
   - If error → call `functionsMap.error`.
   - Decrement `itemsInProcess`.
   - If `items.length > 0` → call `startProcessing()` again (refill the slot).
   - If `items.length === 0 && itemsInProcess === 0` → call `functionsMap.drain`.

**`drain` / `error`**: simply store the provided function in `functionsMap`.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n / concurrency) batches — each batch runs in parallel |
| Space | O(n) — queue holds all pending tasks |
