# Execute a Set of Async Tasks with Dependencies (like a Build Graph)

## Problem Statement

Given a map of async tasks and a dependency graph, execute all tasks respecting their dependencies. Tasks whose dependencies have all completed run in parallel. A task is skipped if any dependency failed.

```js
runTasks(tasks, { D: ['A','B'], E: ['C','D'] })
// A, B, C run in parallel → D runs after A+B → E runs after C+D
```

---

## Class Contract

```
TaskRunner
  ├── constructor(tasks, dependencies)
  ├── canRun(taskId)        → bool — all deps completed?
  ├── getReadyTasks()       → taskId[] — not yet run, deps met (or skip failed deps)
  ├── runTask(taskId)       → updates completed/failed/results/errors
  └── run()                 → while loop until all processed → returns { results, errors, success }
```

---

## Algorithm

```
while (completed + failed < total):
  ready = getReadyTasks()
  if ready is empty → deadlock detected, throw
  await Promise.allSettled(ready.map(runTask))

return { results, errors, success: failed.size === 0 }
```

### `getReadyTasks` logic

```
for each task not yet processed:
  if any dependency is in failed → mark this task failed (skip), exclude from ready
  else if all dependencies are in completed → include in ready
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `Promise.allSettled` | Runs all ready tasks in parallel; never rejects — each result is `{ status, value/reason }` |
| `completed` Set | Only tasks that ran and resolved are added here — failed/skipped tasks do NOT count |
| Cascade failure | When a dependency fails, all downstream tasks are immediately marked failed in `getReadyTasks` without running |
| Deadlock detection | If `getReadyTasks` returns `[]` while tasks remain unprocessed, we have a circular dependency or unresolvable state |
| `Promise.allSettled` vs `Promise.all` | `allSettled` is essential — `Promise.all` would reject on the first failure and halt the runner |

---

## Execution Order (article example)

```
Round 1: A, B, C run in parallel (no deps)
Round 2: D runs (A+B done); E blocked (C done, D not done yet)
Round 3: E runs (C+D done)
```

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Total rounds | O(depth of dependency graph) |
| Per round | O(k) tasks in parallel |
| Space | O(n) for completed/failed sets + results/errors maps |
