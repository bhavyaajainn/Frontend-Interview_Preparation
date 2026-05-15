# Execute Promises with Priority

## Problem Statement

Implement `resolvePromisesWithPriority(promises)`.

- Input: array of `{ task: fn, priority: number }` objects. Lower priority number = higher priority.
- Run **all tasks in parallel**.
- Resolve with the **value of the highest-priority task that succeeds**.
- If **all tasks fail**, reject with a custom `Error`.

---

## Example

```js
resolvePromisesWithPriority([
  { task: createAsyncTask(6), priority: 1 },  // rejects (val > 5)
  { task: createAsyncTask(5), priority: 2 },  // resolves with 5
  { task: createAsyncTask(3), priority: 3 },  // resolves with 3
  { task: createAsyncTask(3), priority: 4 },  // resolves with 3
]).then(console.log);
// 5  — value from priority-2 task (priority-1 rejected)
```

---

## Approach

```js
function resolvePromisesWithPriority(promises) {
  promises.sort((a, b) => a.priority - b.priority);

  let rejected = {};
  let result = {};
  let mostPriorityIndex = 0;
  let taskCompleted = 0;

  return new Promise((resolve, reject) => {
    promises.forEach(({ task, priority }, i) => {
      task()
        .then(value => {
          result[i] = value;
        })
        .catch(() => {
          rejected[i] = true;
          if (i === mostPriorityIndex) {
            mostPriorityIndex++;
          }
        })
        .finally(() => {
          taskCompleted++;

          if (taskCompleted === promises.length) {
            // skip over any rejected high-priority tasks
            while (rejected[mostPriorityIndex]) mostPriorityIndex++;

            if (mostPriorityIndex < promises.length) {
              resolve(result[mostPriorityIndex]);
            } else {
              reject(new Error('All promises were rejected'));
            }
          }
        });
    });
  });
}
```

**Key points:**
- Sort first so array index == priority rank.
- `mostPriorityIndex` tracks the current best candidate; advances when that index rejects.
- Decision is made only in `finally` after **all** tasks have settled (parallel, not series).
- The `while (rejected[mostPriorityIndex])` guard handles the case where tasks settle out of order (e.g. priority-2 rejects before priority-1 resolves).

---

## Gotcha — Out-of-Order Rejection

If priority-2 rejects before priority-1 settles, `mostPriorityIndex` is still 0 (correct). But if priority-1 also rejects, the simple `if (i === mostPriorityIndex) mostPriorityIndex++` misses it. The `while` loop in `finally` ensures all leading rejected slots are skipped at decision time.

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n log n) sort + O(n) parallel execution |
| Space | O(n) — result and rejected maps |
