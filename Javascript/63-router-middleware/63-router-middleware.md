# Implement a Router Middleware

## Problem Statement

Implement `RouterMiddleWare()`, a constructor that creates a router instance with:

- `addRoute(path, value)` — registers a path → value mapping. Paths may contain `*` as a wildcard segment.
- `callRoute(path)` — returns the value for the given path. Exact matches take priority; falls back to wildcard matching in insertion order. Returns `null` if nothing matches.

```js
const router = new RouterMiddleWare();
router.addRoute("/bar", "result");
router.callRoute("/bar");          // "result"

router.addRoute("/bar/*/baz", "bar");
router.callRoute("/bar/a/baz");    // "bar"

router.addRoute("/foo/baz", "foo");
router.addRoute("/foo/*", "wildcard");
router.callRoute("/foo/baz");      // "foo"   — exact wins
router.callRoute("/foo/other");    // "wildcard"
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Storage | `Map` preserves insertion order — critical for wildcard priority when no exact match exists |
| Exact-first lookup | `store.get(path)` is O(1); do it before iterating wildcards |
| Wildcard regex | Escape `/` in the pattern, replace `*` with `.*` and `?` with `.`, then anchor with `^...$` |
| Regex escaping bug | The article's original regex `pattern.replace(/\?/g, '.')` fails in some engines; escape the forward-slash: `pattern.replace(/\//g, '\/')` |
| Insertion-order priority | When exact is skipped, the first wildcard pattern added that matches wins — order of `addRoute` calls matters |
| Ambiguity discussion | If `/foo/baz` (exact) and `/foo/*` (wildcard) are both registered, the choice of which wins is a design decision — document it |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `addRoute` | O(1) amortized |
| `callRoute` (exact) | O(1) |
| `callRoute` (wildcard fallback) | O(n) where n = number of registered routes |
| Space | O(n) for the route store |
