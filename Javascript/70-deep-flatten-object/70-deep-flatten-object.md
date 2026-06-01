# Deep Flatten Object

## Problem Statement

Given a deeply nested object (which may contain arrays), flatten it into a single-level object using dot notation for keys.

```js
flatten({
  A: "12",
  B: 23,
  C: { P: 23, O: { L: 56 }, Q: [1, 2] }
});
// → { A: "12", B: 23, "C.P": 23, "C.O.L": 56, "C.Q.0": 1, "C.Q.1": 2 }
```

---

## Two Approaches

### Approach 1 — `Object.prototype.toString.call()` type detection

```
"[object Object]" → recurse with prefix
"[object Array]"  → iterate by index, append ".index" to key
else              → store primitive
```

### Approach 2 — `typeof` + `Array.isArray()` + array-to-object spread

```
typeof val === "object" → check Array.isArray
  isArray  → const { ...obj } = val; recurse (treats array like object)
  isObject → recurse directly
else → store primitive
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Key building | `const newKey = prefix ? prefix + "." + k : k` — avoids a leading dot when no prefix |
| `for...in` | Iterates all enumerable keys including array indices — works for both approaches |
| Array-to-object spread | `const { ...arrToObj } = val` converts `[1, 2]` to `{ "0": 1, "1": 2 }` so it can be recursed identically to objects |
| `typeof null === "object"` | Null is falsy so `if (typeof val === "object" && val !== null)` guards against treating `null` as an object to recurse into |
| Output merging | `output = { ...output, ...newObj }` — spread-merge keeps all previously accumulated keys |
| Original keys not leaked | Parent keys like `"C"` must NOT appear in the output — only leaf paths |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) where n = total number of leaf values (each visited once) |
| Space | O(d) recursion depth + O(n) for the output object |
