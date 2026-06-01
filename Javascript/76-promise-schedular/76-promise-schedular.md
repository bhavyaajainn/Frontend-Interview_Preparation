# Create PromiseSchedular that can be Paused and Resumed

## Problem Statement

Implement `PromiseSchedular` — a class that executes an array of async functions serially and supports pausing, resuming, and running all unexecuted functions.

```js
const scheduler = new PromiseSchedular(promises, {
  startIndex: 1,
  callbacks: { onStart, onPause, onCompleted }
});

scheduler.run();          // starts from startIndex
scheduler.pause();        // halts after current promise
scheduler.run();          // resumes from where it stopped
scheduler.getState();     // { state, unexecutedFunctionsIndices }
scheduler.runAllUnexecutedFunctions(); // runs any gaps left by startIndex or pause
```

---

## Class Contract

| Method | Description |
|---|---|
| `run()` | Sets `isProcessing=true`, calls `processHelper()`, fires `onStart` |
| `pause()` | Sets `isProcessing=false`, `runningAllUnExecuted=false`, fires `onPause` |
| `getState()` | Returns `{ state: 'in-progress'|'paused'|'completed', unexecutedFunctionsIndices }` |
| `runAllUnexecutedFunctions()` | Runs all skipped indices; wraps around if paused mid-way |
| `processHelper()` | Recursive async executor — terminates when `!isProcessing` or all done |

---

## Key Design Points

| Concept | Detail |
|---|---|
| `isProcessing` flag | Set to `false` in `pause()` — `processHelper()` checks this at the top and returns immediately, halting the recursive chain after the current promise finishes |
| `promisesExecutedIndices` | `{ 0: false, 1: false, ... }` map — tracks which functions have run; used by `getState()` and `unexecutedFunctionsIndices()` |
| Already-executed guard | `if (promisesExecutedIndices[startIndex])` — prevents re-running a completed promise when `run()` is called after completion |
| `runningAllUnExecuted` | Extra flag so `processHelper` knows to wrap around when it hits the end with gaps still remaining |
| Pause timing | Pause is "soft" — the current in-flight promise runs to completion; only the next one is blocked |
| `startIndex` edge case | Functions before `startIndex` are never executed by `run()` alone — use `runAllUnexecutedFunctions()` to cover them |

---

## State Machine

```
           run()
 idle ──────────────→ in-progress
                           │  pause()
                           ↓
                         paused ──── run() ──→ in-progress
                           │
                     runAllUnexecuted()
                           │
                           ↓ (wraps around if needed)
                       completed
```

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `processHelper` per step | O(1) + async task duration |
| `unexecutedFunctionsIndices` | O(n) — scans all indices |
| Space | O(n) for the executed-indices map |
