# Implement an In-Memory DB with Search

## Problem Statement

Build `InMemorySearch` with:

- `addDocuments(namespace, ...docs)` — adds documents to a namespace; creates the namespace if it doesn't exist.
- `search(namespace, filterFn, orderBy?)` — returns documents that pass `filterFn`, optionally sorted by `{ key, asc }`.
- `registerNameSpace(name)` — explicitly pre-registers an empty namespace.

```js
const db = new InMemorySearch();
db.addDocuments('Movies', { name: 'Black Panther', rating: 9.0, year: 2022 }, ...);
db.search('Movies', e => e.rating > 8.5, { key: 'rating', asc: false });
// [{ name: 'Black Panther', ... }, { name: 'Black Adam', ... }]
```

---

## Approach

```js
class InMemorySearch {
  constructor() {
    this.entities = new Map();
  }

  registerNameSpace(name) {
    this.entities.set(name, []);
  }

  addDocuments(nameSpace, ...docs) {
    const existing = this.entities.get(nameSpace) ?? [];
    this.entities.set(nameSpace, [...existing, ...docs]);
  }

  search(nameSpace, filterFn, orderBy) {
    const docs = this.entities.get(nameSpace);
    if (!docs) return [];

    const filtered = docs.filter(filterFn);

    if (orderBy) {
      const { key, asc } = orderBy;
      filtered.sort((a, b) => asc ? a[key] - b[key] : b[key] - a[key]);
    }

    return filtered;
  }
}
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `Map` for namespaces | O(1) lookup per namespace; preserves insertion order of documents |
| Spread merge | `[...existing, ...docs]` creates a new array — avoids mutating stored references |
| `?? []` fallback | `addDocuments` creates the namespace on first use without a separate `registerNameSpace` call |
| Sort direction | `asc ? a[key] - b[key] : b[key] - a[key]` — works for numeric fields; for strings use `localeCompare` |
| Missing namespace | Return `[]` on `search` so callers always get an iterable |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `addDocuments` | O(n) — spread to create merged array |
| `search` | O(n log n) — filter O(n) + sort O(n log n) |
| Space | O(total docs across all namespaces) |
