# Cached API Call with Expiry Time

## Problem Statement

Implement `cachedApiCall(time)` that returns an async function `call(path, config)`. The returned function caches API responses for `time` milliseconds. Calls within the TTL return the cached value without hitting the network; calls after expiry make a fresh request.

```js
const call = cachedApiCall(1500);

call('/todos/1', {});          // network hit, result cached
call('/todos/1', {});          // 700ms later — served from cache
call('/todos/1', {});          // 2000ms later — cache expired, network hit again
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Closure for cache | `cachedApiCall` returns a new closure; each invocation of `cachedApiCall` gets its own private `cache` object |
| Cache key | Deterministic string built from `path` + sorted config keys/values — sort ensures `{ a:1, b:2 }` and `{ b:2, a:1 }` produce the same key |
| Expiry check | `Date.now() > entry.expiryTime` — compare against the stored timestamp, not a separate timer |
| `expiryTime` storage | Store `Date.now() + time` at write time, not a countdown — simpler to check and survives re-reads |
| Concurrent dedup (bonus) | If two calls arrive for the same key while the first is still in-flight, store the promise in the cache and return it to the second caller — prevents duplicate network requests |
| Error handling | On fetch failure, don't write to cache so the next call retries; clean up any stored promise so it doesn't get reused after failure |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `generateKey` | O(k log k) where k = number of config keys |
| `call` (cache hit) | O(k log k) for key generation, then O(1) lookup |
| `call` (cache miss) | O(k log k) + network latency |
| Space | O(n) where n = number of distinct cached entries |
