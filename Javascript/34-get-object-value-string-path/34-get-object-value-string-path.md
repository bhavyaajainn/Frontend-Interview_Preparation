# Get Object Value from String Path

## Problem Statement

Implement `get(obj, path, defaultValue?)` — a polyfill for lodash `_.get`.

- `path` can be a dot-notation string (`"a.b.c"`), bracket notation (`"a.b[0]"`), mixed, or an array of strings (`["a","b","0"]`).
- Returns the value at the path, or `defaultValue` (default `undefined`) if the path doesn't exist.
- Must correctly return **falsy values** (`0`, `false`, `""`) — do NOT treat them as "not found".

---

## Approach — Normalise → Split → reduce

```js
const get = (obj, path, defaultValue = undefined) => {
  if (path === '' || (Array.isArray(path) && path.length === 0)) return defaultValue;

  // normalise: array → join, then strip [ and ] so "a[0]" becomes "a.0"
  const keys = (Array.isArray(path) ? path.join('.') : path)
    .replace(/\[(\d+)\]/g, '.$1')   // a[0] → a.0
    .split('.')
    .filter(Boolean);

  const value = keys.reduce((node, key) => {
    if (node == null) return undefined;   // stop traversal safely
    return node[key];
  }, obj);

  return value !== undefined ? value : defaultValue;
};
```

---

## Why `value !== undefined` and not `value ? value : defaultValue`

The course solution uses `return value ? value : undefined`, which **breaks for falsy values**:

| Path value | `value ?` check | Correct behaviour |
|---|---|---|
| `0` | treated as not found | should return `0` |
| `false` | treated as not found | should return `false` |
| `""` | treated as not found | should return `""` |
| `null` | treated as not found | debatable; lodash returns `null` |

Always guard with `value !== undefined`.

---

## Key Design Points

| Concept | Detail |
|---|---|
| Normalise brackets | `replace(/\[(\d+)\]/g, '.$1')` converts `[0]` → `.0` before splitting |
| Array path | `path.join('.')` collapses the array to the same string form |
| Safe traversal | `if (node == null) return undefined` prevents `Cannot read property of null` errors mid-path |
| `defaultValue` | Only applied when result is strictly `undefined`, not for any falsy value |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(d) — d = depth of path |
| Space | O(d) — keys array |
