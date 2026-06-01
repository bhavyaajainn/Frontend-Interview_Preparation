# Memoize a Function - Part 2

## Problem Statement

Implement `memoize(fn)` using a **trie-like data structure** that correctly handles object arguments by **reference identity** (not value equality). Each argument level in the trie uses `Map` for primitives and `WeakMap` for objects.

```js
const obj1 = { id: 1 };
const obj2 = { id: 1 }; // same content, different reference

fn(obj1); // cache miss
fn(obj1); // cache HIT  (same reference)
fn(obj2); // cache miss (different reference — even though content is equal)
```

---

## Why Not JSON.stringify?

| Issue | JSON approach | Trie approach |
|---|---|---|
| Object identity | Treats same-content objects as equal | Correctly distinguishes by reference |
| Functions as args | `JSON.stringify` throws/omits them | `WeakMap` key — works fine |
| Circular objects | `JSON.stringify` throws | `WeakMap` — no serialisation needed |
| Property order | `{a:1,b:2}` ≠ `{b:2,a:1}` | Order irrelevant — reference is the key |
| Garbage collection | Strings stay in Map forever | `WeakMap` releases objects when GC'd |

---

## Trie Node Structure

```js
{
  primitives: new Map(),    // key → child node  (numbers, strings, null, etc.)
  objects:    new WeakMap(),// key → child node  (objects, arrays, functions)
  hasResult:  false,
  result:     undefined
}
```

One node per argument level. Traversal: start at root, step into child node for each argument.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `WeakMap` for objects | Uses reference equality — `obj1` and `obj2` with same content are different keys |
| `Map` for primitives | Value equality — `"foo"` and `"foo"` are the same key |
| `typeof arg === 'object' && arg !== null` | Detects objects/arrays; `null` is falsy so it goes to Map |
| `hasResult` flag | Distinguishes "result not yet computed" from "result is `undefined`" or other falsy values |
| No arguments | Loop doesn't run; result stored directly on root node |
| Recursive functions | Each recursive call checks the cache independently — works as long as the memoized fn is called recursively |

---

## Time & Space Complexity

| | JSON approach | Trie approach |
|---|---|---|
| Cache key cost | O(m) — serialize all args | O(n) — traverse n args |
| Memory | O(m) — stores serialized strings | O(n) — per-arg nodes; WeakMap GC eligible |
| Object handling | Value equality | Reference identity |
