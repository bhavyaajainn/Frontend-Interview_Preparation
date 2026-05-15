# Create Custom Cookie

## Problem Statement

Extend the `document` object with a `myCookie` property that behaves like a simplified browser cookie:

- **set** `document.myCookie = "key=value"` — stores a cookie with no expiry.
- **set** `document.myCookie = "key=value;max-age=N"` — stores a cookie that expires after `N` seconds.
- **get** `document.myCookie` — returns all non-expired cookies as `"k1=v1; k2=v2"`.

---

## Approach — `Object.defineProperty` with a Map store

```js
function useCustomCookie() {
  const store = new Map(); // key → { value, expires }

  Object.defineProperty(document, 'myCookie', {
    configurable: true,
    enumerable: true,

    get() {
      const now = Date.now();
      const parts = [];
      for (const [name, { value, expires }] of store) {
        if (expires !== null && expires <= now) {
          store.delete(name);
        } else {
          parts.push(`${name}=${value}`);
        }
      }
      return parts.join('; ');
    },

    set(str) {
      const [nameValue, ...rest] = str.split(';');
      const [key, value] = nameValue.split('=').map(s => s.trim());
      let expires = null;

      for (const opt of rest) {
        const [k, v] = opt.split('=').map(s => s.trim());
        if (k === 'max-age') {
          expires = Date.now() + Number(v) * 1000;
        }
      }

      store.set(key, { value, expires });
    },
  });
}
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `Object.defineProperty` | Adds a property with custom `get`/`set` to any object — the only way to intercept assignment |
| `configurable: true` | Allows re-defining or deleting the property; required so `useCustomCookie()` can be called again in tests |
| `Map` store | Preserves insertion order (consistent output) and gives O(1) key lookup for overwrites |
| `expires = null` | Sentinel meaning "no expiry" — avoids the `0` / falsy ambiguity |
| Lazy expiry in `get` | Cookies are cleaned up on read, not on a separate timer — simpler and avoids timer leaks |
| Overwrite | `store.set(key, ...)` naturally replaces an existing entry with the same key |

---

## Alternative — Timer-based deletion

Instead of lazy expiry, schedule `store.delete(name)` with `setTimeout(fn, N * 1000)`.  
Trade-off: more predictable expiry time but slightly more complex (need to clear old timers on overwrite).

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `get` | O(n) — scans all stored cookies |
| `set` | O(1) — map insertion |
| Space | O(n) — n = number of active cookies |
