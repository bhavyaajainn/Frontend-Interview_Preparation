# Create an Immutability Helper

## Problem Statement

Implement `update(inputObj, action)` — a simplified Immer-like helper:

- `inputObj` may be a deep-frozen object or array.
- `action` is a plain object describing **one** operation at the target path.
- Returns a **new deep-frozen** object with the change applied; original is untouched.

Supported actions:

| Key | Behaviour |
|---|---|
| `_push_` | `[...target, ...value]` |
| `_replace_` | `value` |
| `_merge_` | `{ ...target, ...value }` |
| `_transform_` | `fn(target)` |

---

## Approach

### `deepFreeze`

```js
function deepFreeze(obj) {
  for (const name of Object.getOwnPropertyNames(obj)) {
    const val = obj[name];
    if (val && typeof val === 'object') deepFreeze(val);
  }
  return Object.freeze(obj);
}
```

### `update` — clone → helper → freeze

```js
function update(inputObj, action) {
  // JSON clone unfreezes the data (functions in _transform_ live only in action, not data)
  const clone = JSON.parse(JSON.stringify(inputObj));
  return deepFreeze(helper(clone, action));
}

function helper(target, action) {
  for (const [key, value] of Object.entries(action)) {
    switch (key) {
      case '_push_':      return [...target, ...value];
      case '_replace_':   return value;
      case '_merge_':     return { ...target, ...value };
      case '_transform_': return value(target);
      default:
        // recurse into the next level
        if (Array.isArray(target)) {
          const copy = [...target];
          copy[key] = helper(copy[key], value);
          return copy;
        } else {
          return { ...target, [key]: helper(target[key], value) };
        }
    }
  }
  return target;
}
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Clone before mutating | `JSON.parse(JSON.stringify(...))` deep-clones and un-freezes the input — safe to modify |
| `_transform_` and JSON | The function lives in the **action**, not the data, so JSON cloning the input is fine |
| Recursive path walk | Non-action keys navigate to the right node before applying the action |
| Array paths | `{1: {_replace_: 10}}` — the key `"1"` navigates into array index 1 |
| Spread for immutability | Each level creates a new object/array via spread, preserving untouched siblings |
| Deep freeze output | `deepFreeze` recurses before calling `Object.freeze` — ensures nested objects are frozen too |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `deepFreeze` | O(n) — n = total properties in tree |
| `update` | O(n) — clone + helper traverse + deepFreeze |
| Space | O(n) — full clone of input |
