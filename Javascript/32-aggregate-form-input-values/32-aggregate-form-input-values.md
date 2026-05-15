# Aggregate the Input Values of the Form

## Problem Statement

Given a `<form>` (or any wrapper) containing `<input type="text">` elements whose `name` attributes use dot-notation (`"a.b.c"`), return a single nested object where each path maps to the input's value.

**Example:**
```html
<form id="parent">
  <input type="text" name="a.c"   value="1"/>
  <input type="text" name="a.b.d" value="2"/>
  <input type="text" name="a.b.e" value="3"/>
</form>
```
```js
aggregateValues('parent');
// { a: { c: '1', b: { d: '2', e: '3' } } }
```

---

## Approach — reduce + pointer traversal

```js
const buildNested = (inputs) => {
  return Array.from(inputs).reduce((acc, { name, value }) => {
    const keys = name.split('.');
    let node = acc;

    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        node[key] = value;           // leaf — assign value
      } else {
        if (!(key in node)) node[key] = {};  // create branch if absent
        node = node[key];            // walk deeper
      }
    });

    return acc;
  }, {});
};

// DOM wrapper
const aggregateValues = (id) => {
  const el = document.querySelector(`#${id}`);
  return buildNested(el.querySelectorAll('input[type="text"]'));
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Split on `.` | Converts `"a.b.c"` → `['a', 'b', 'c']` — the path to the leaf |
| Pointer `node` | Starts at root `acc`, advances one level per key — avoids recursion |
| Branch guard | `if (!(key in node)) node[key] = {}` — only creates a node if absent, preserving siblings already set |
| Leaf assignment | Last key gets `current.value`, not `{}` |
| `reduce` accumulator | Same `{}` reference flows through every input; mutations are cumulative |

---

## Edge Cases

| Scenario | Behaviour |
|---|---|
| Flat name (no dots) | Single key written directly to root |
| Deep nesting | Works for any depth — pointer just walks more steps |
| Shared ancestor | Branch already exists; pointer re-uses it, siblings preserved |
| Duplicate path | Last `<input>` wins (overwrites earlier value) |
| Empty form | `reduce` returns initial `{}` untouched |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n × d) — n inputs, d = max depth of dot-notation name |
| Space | O(n × d) — the output object |
