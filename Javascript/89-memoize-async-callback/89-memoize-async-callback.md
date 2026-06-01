# Memoised Function for Async Callback Based Tasks

## Problem Statement

Implement `memoizeCallback(fn, options)` and `memoizeAsync(fn, options)` that cache async operations with full production features:

```js
const search = memoizeCallback(fakeSearchCb);
search("react", cb); // cache miss → runs fn
search("react", cb); // cache hit  → instant

const searchAsync = memoizeAsync(fakeSearchPromise);
searchAsync("react"); // cache miss
searchAsync("react"); // cache hit (promise shared if in-flight)
```

---

## Options

| Option | Default | Description |
|---|---|---|
| `ttl` | `Infinity` | Cache entry expires after this many ms |
| `maxSize` | `100` | Max cache entries (LRU eviction) |
| `key` | `JSON.stringify` | Custom cache key generator |
| `abort` | `false` | Attach `AbortController.signal` to fn calls |
| `latestWins` | `false` | Cancel previous in-flight call, only latest resolves |

---

## LRU Cache

Uses `Map` (insertion-order preserved). Most-recently-used = last entry. On `get`, delete + re-insert to refresh position. On `set` when full, delete `map.keys().next().value` (first = oldest = LRU).

---

## Key Design Points

### Concurrent Dedup
If two calls arrive for the same key while the first is still in-flight, don't start a second task — push the second callback onto the existing `flight.callbacks[]` array. When the task completes, invoke all accumulated callbacks.

### `latestWins`
On each new call: if there's an in-flight task for the same key, abort its `AbortController` and remove it from `inFlight`. The new call starts fresh, ignoring any in-progress prior calls.

### TTL Check
`now < cached.expiry` — check at call time (not via `setTimeout`). `Infinity` never expires.

### Callback Style vs Promise Style
| | Callback | Promise |
|---|---|---|
| Result sharing | `flight.callbacks[]` fan-out | `inFlight.promise` returned to all waiters |
| `latestWins` abort | `flight.controller.abort()` | Same — abort controller |
| Cache store | After `cb(null, result)` fires | In `.then()` handler |

---

## LRU Eviction Detail

```
set("a"), set("b")  →  Map: a→b (a is LRU)
get("a")            →  Map: b→a (b is LRU now)
set("c") [maxSize=2] →  delete "b" (LRU), Map: a→c
```

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Cache hit | O(1) LRU lookup + move |
| Cache miss | O(1) + async fn execution time |
| Space | O(maxSize) for cache + O(concurrent calls) for inFlight |
