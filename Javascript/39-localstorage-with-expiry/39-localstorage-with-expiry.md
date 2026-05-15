# Localstorage with Expiry

## Problem Statement

`localStorage` has no native expiry. Implement `myLocalStorage` with:

- `setItem(key, value, maxAge?)` — stores `value` with an expiry timestamp. Default `maxAge` = 30 days (ms).
- `getItem(key)` — returns the value if not expired, otherwise removes the entry and returns `null`.

```js
myLocalStorage.setItem('foo', 'bar', 1000); // expires in 1 second
setTimeout(() => myLocalStorage.getItem('foo'), 1500); // null
```

---

## Approach — Wrap the value with an `expireTime`

```js
const myLocalStorage = {
  setItem(key, value, maxAge = 30 * 24 * 60 * 60 * 1000) {
    const record = {
      data: value,
      expireTime: Date.now() + maxAge,
    };
    localStorage.setItem(key, JSON.stringify(record));
  },

  getItem(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const record = JSON.parse(raw);
    if (record.expireTime <= Date.now()) {
      localStorage.removeItem(key);
      return null;
    }
    return record.data;
  },
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Wrapper object | `{ data, expireTime }` serialised as JSON — piggybacks on the string-only localStorage |
| `expireTime` | Absolute timestamp (`Date.now() + maxAge`), not a countdown — survives page reloads |
| Lazy expiry | Entry is cleaned up on `getItem`, not via a timer — no background process needed |
| Default maxAge | 30 days in ms: `30 * 24 * 60 * 60 * 1000` (the course has a typo — missing `* 24`) |
| Object values | Because the value is JSON-stringified, any JSON-serialisable value (object, array, number) works |

---

## Alternative — Timer-based deletion

Use `setTimeout(() => localStorage.removeItem(key), maxAge)` in `setItem`.  
**Downside:** timer is lost on page refresh, so items set in a previous session never get cleaned up. The lazy-expiry approach handles this correctly.

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `setItem` | O(1) |
| `getItem` | O(1) |
| Space overhead | O(1) extra per entry (just the `expireTime` field) |
