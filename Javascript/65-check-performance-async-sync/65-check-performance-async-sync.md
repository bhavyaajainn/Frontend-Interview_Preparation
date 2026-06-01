# Check Performance of Async and Sync Functions

## Problem Statement

Implement two functions:

- `measurePerformance(fn, options)` — runs `fn` N times, records timing per iteration, and returns a stats object.
- `comparePerformance(functions, options)` — runs `measurePerformance` for each function, sorts by average time ascending, and logs a ranked comparison.

```js
await measurePerformance(syncFn, { name: 'Sync', iterations: 5, warmup: true });
// → { name, iterations, isAsync, timings, average, min, max, total }

await comparePerformance(
  [{ fn: syncFn, name: 'Sync' }, { fn: asyncFn, name: 'Async' }],
  { iterations: 5 }
);
// logs ranked table sorted by average
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `performance.now()` | Returns a high-resolution timestamp in ms; subtract before/after `await fn()` to get elapsed time |
| `await fn()` | Using `await` on a sync function is safe — it resolves immediately; this unifies the loop for both sync and async |
| `isAsync` detection | `fn.constructor.name === 'AsyncFunction'` — works at runtime without calling the function |
| Warmup run | Runs the function once outside the timed loop to let the JS engine JIT-compile it; errors in warmup should warn, not abort |
| Error handling in loop | `continue` on error so one bad iteration doesn't abort the whole test; don't push a timing for the failed run |
| `average = total / timings.length` | Not `total / iterations` — accounts for skipped (errored) iterations |
| `comparePerformance` sort | `results.sort((a, b) => a.average - b.average)` — lowest average first |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `measurePerformance` | O(n) where n = iterations |
| `comparePerformance` | O(f × n + f log f) where f = number of functions, n = iterations |
| Space | O(n) for the timings array per function |
