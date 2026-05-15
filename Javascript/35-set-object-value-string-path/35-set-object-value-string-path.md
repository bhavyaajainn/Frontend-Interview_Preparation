# Set Object Value at String Path

## Problem Statement

Implement `set(obj, path, value)` — a polyfill for lodash `_.set`.

- Mutates `obj` in-place and returns it.
- `path` can be dot-notation (`"a.b.c"`), bracket notation (`"a.b[0]"`), or an array of strings.
- Creates missing intermediate nodes automatically.
- If the **next** key in the path is numeric, create an array; otherwise create a plain object.

```js
const obj = { a: [{ b: { c: 3 } }] };
set(obj, 'a[0].b.c', 4);   // obj.a[0].b.c === 4
set(obj, ['x','0','y'], 5); // obj.x[0].y    === 5
```

---

## Approach — Iterative pointer walk

```js
const set = (obj, path, value) => {
  // normalise to array of keys
  const keys = (Array.isArray(path) ? path.join('.') : path)
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);

  let node = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key     = keys[i];
    const nextKey = keys[i + 1];

    // create missing intermediate node
    if (node[key] == null || typeof node[key] !== 'object') {
      node[key] = isNaN(Number(nextKey)) ? {} : [];
    }

    node = node[key];
  }

  node[keys[keys.length - 1]] = value;
  return obj;
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Normalise path | `replace(/\[(\d+)\]/g, '.$1')` converts `[0]` → `.0`; then `split('.')` |
| Pointer `node` | Advances one level per key, always pointing at the current container |
| Missing node check | `node[key] == null \|\| typeof !== 'object'` handles both absent keys and primitives blocking deeper paths |
| Array vs object | Look-ahead at `nextKey`: `isNaN(Number(nextKey))` → `{}`, else `[]` |
| Leaf assignment | After the loop, `node` is the direct parent; assign to the last key |
| Falsy values | `value` is assigned directly with `=`, so `0`, `false`, `""` are stored correctly |

---

## Common Pitfall

The recursive course solution checks `obj[current]` as falsy to decide whether to create a node.  
This **clobbers existing falsy values** (e.g., `node[key] = 0` → node is replaced on the next `set` call).  
The iterative approach uses `== null || typeof !== 'object'`, which only replaces nodes that genuinely block traversal.

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(d) — d = path depth |
| Space | O(d) — keys array |
