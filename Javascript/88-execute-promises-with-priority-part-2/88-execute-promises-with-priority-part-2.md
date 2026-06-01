# Execute Promises with Priority – Part 2

## Problem Statement

Given an array of promises where **array index = priority** (index 0 is highest), resolve with the value of the highest-priority promise that fulfils. Skip any rejected promises at higher positions and continue to the next. If all reject, throw.

```js
// p0 resolves last but wins (highest priority)
priorityResolve([p0_slow, p1_fast, p2_medium]); // → p0's value

// p0 rejects → p1 is next highest
priorityResolve([p0_reject, p1_resolve, p2_resolve]); // → p1's value

// all reject → AggregateError
priorityResolve([p0_reject, p1_reject, p2_reject]); // throws AggregateError
```

---

## Two Approaches

### Approach 1 — Parallel (recommended)

All promises start simultaneously. On each settle, scan left-to-right:

```
states[i].status === 'pending'   → stop (a higher-priority promise is still running)
states[i].status === 'rejected'  → skip, continue to next
states[i].status === 'fulfilled' → resolve with states[i].value
```

If `rejectedCount === states.length` → reject with `AggregateError`.

**Benefit:** Total time = slowest non-blocked promise (not sum of all).

### Approach 2 — Sequential (simpler)

```js
for (const p of promises) {
  try { return await p; } catch { /* skip */ }
}
throw new Error('All promises rejected');
```

**Trade-off:** If p0 takes 10s and p1 takes 100ms, sequential waits 10s before even trying p1. Parallel would return p0's result but still only waited 10s total — the issue is only when p0 rejects slowly while p1 resolves fast.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `settled` flag | Prevents multiple resolve/reject calls after the first win is found |
| Scan from index 0 | Guarantees priority is respected — don't resolve until all higher-priority promises are settled |
| `pending` → stop scan | Even if a lower-index promise is still running, we can't skip past it |
| `rejected` → continue scan | Move to the next index — this promise lost its chance |
| `AggregateError` | Standard way to report multiple failures (used by `Promise.any` too) |
| `Promise.resolve(p)` wrapping | Handles non-Promise values in the input array safely |

---

## Time Complexity

| | Approach 1 (parallel) | Approach 2 (sequential) |
|---|---|---|
| Best case (p0 resolves) | O(time of p0) | O(time of p0) |
| p0 rejects slowly | O(max of p0 + settling time) | O(time of p0 + time of p1) |
| All reject | O(max of all promises) | O(sum of all promises) |
