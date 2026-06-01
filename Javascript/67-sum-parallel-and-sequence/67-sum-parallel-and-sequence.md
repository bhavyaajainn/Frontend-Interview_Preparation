# Sum up Functions Return Value Running in Parallel and in Sequence

## Problem Statement

Write two async functions that each return a number after a delay, then sum their results in two ways:

- `series()` — run them one after another → total time ~5 s
- `parallel()` — run them concurrently → total time ~3 s (limited by the slower task)

```js
// A returns 2 after 2s, B returns 3 after 3s

await series();   // ~5000ms, result = 5
await parallel(); // ~3000ms, result = 5
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `wait(num)` | `new Promise(resolve => setTimeout(resolve, num * 1000, num))` — the third arg to `setTimeout` is passed as the resolved value |
| Sequential with `await` | `await A()` then `await B()` — second task only starts after first resolves; total = sum of durations |
| Parallel with deferred `await` | Call `A()` and `B()` first (both start immediately), then `await` each result; total = max of durations |
| Common mistake | Writing `await A(); await B()` in parallel thinking it runs concurrently — `await` blocks immediately so it is sequential |
| `Promise.all` alternative | `const [r1, r2] = await Promise.all([A(), B()])` — cleaner and scales to N functions; equivalent timing |
| Why same sum? | Both approaches compute 2 + 3 = 5; the difference is only in wall-clock time, not in correctness |

---

## Time Complexity

| Approach | Wall-clock time | Why |
|---|---|---|
| `series()` | O(sum of durations) = ~5 s | Each task waits for the previous |
| `parallel()` | O(max of durations) = ~3 s | All tasks run concurrently |
