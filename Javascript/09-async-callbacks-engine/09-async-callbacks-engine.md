# Implement an Engine that Processes Async Callbacks

## Problem Statement

Implement a `QueueCallbacks` class that acts as a controlled concurrency engine for async tasks.

### Constructor

```js
new QueueCallbacks(order?, concurrentTasks?, queueLimit?, executor?)
```

| Parameter | Default | Description |
|---|---|---|
| `order` | `"FIFO"` | Order to drain the queue: `"FIFO"` or `"LIFO"` |
| `concurrentTasks` | `2` | Max number of callbacks executing at the same time |
| `queueLimit` | `6` | Max callbacks held in the waiting queue (extras are discarded) |
| `executor` | built-in | Optional async function `(task) => Promise` that wraps task execution |

### `process(callback)` rules

1. If fewer than `concurrentTasks` callbacks are running → **execute immediately**.
2. If `concurrentTasks` slots are full and the queue has room → **enqueue**.
3. If the queue is at `queueLimit` → **discard** the callback silently.
4. When a slot frees up → pull the next callback from the queue per `order` and execute it.

---

## Examples

```js
const dummyApi = (index) => new Promise((resolve) => {
  setTimeout(() => resolve(index), index * 1000);
});

// FIFO (default) — max 2 concurrent, max 6 queued
const q = new QueueCallbacks();
q.process(dummyApi(1)); // executes immediately
q.process(dummyApi(2)); // executes immediately
q.process(dummyApi(6)); // queued [6]
q.process(dummyApi(4)); // queued [6,4]
// ... up to 6 queued; extras discarded
// output order: 1, 2, 4, 5, 6, 6, 7, 8  (9 and 10 discarded)
```

```js
// LIFO — queue is drained last-in-first-out
const q2 = new QueueCallbacks('LIFO');
// same process calls → output: 1, 2, 8, 7, 6, 5, 4, 6
```

---

## Constraints

- `process` is called with a **Promise** (already started), not a factory function — call `.then/.finally` directly on it.
- The `executor` variant receives a **task object** `{ id, execute(), onSuccess?, onError? }` instead of a bare Promise.
- When using the executor, call `task.execute()` inside it and invoke `onSuccess`/`onError` callbacks accordingly.
- Queue size and concurrency limits are enforced independently.

---

## Approach

1. **Constructor** — initialise `order`, `callbacksQueue = []`, `ongoingExecution = 0`, plus optional `concurrentTasks`, `queueLimit`, `executor`.
2. **`process(callback)`**:
   - If `ongoingExecution < concurrentTasks` → increment counter, run callback, decrement on `.finally`, then call `executeNext()`.
   - Else if `callbacksQueue.length < queueLimit` → push to queue.
   - Else → discard.
3. **`executeNext()` (private)**:
   - If queue non-empty and a slot is free → pop (LIFO) or shift (FIFO) → call `process`.

---

## Follow-up: Task object with executor

```js
// Task factory
function dummyApi(delay, shouldFail = false, { onSuccess, onError } = {}) {
  return {
    id: `task-${++counter}`,
    execute: () => new Promise((res, rej) => setTimeout(
      () => shouldFail ? rej(new Error(`Failed`)) : res(`Done in ${delay}s`),
      delay * 1000
    )),
    onSuccess,
    onError,
  };
}

// Default executor
const defaultExecutor = async (task) => {
  console.log(`Starting ${task.id}`);
  try {
    const result = await task.execute();
    task.onSuccess?.(result, task.id);
  } catch (err) {
    task.onError?.(err, task.id);
  }
  console.log(`Finished ${task.id}`);
};
```

---

## Time & Space Complexity

| Operation     | Complexity |
|---------------|------------|
| process       | O(1)       |
| executeNext   | O(1)       |
| Space (queue) | O(queueLimit) |
