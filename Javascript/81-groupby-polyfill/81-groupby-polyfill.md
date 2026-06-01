# groupBy() Polyfill

## Problem Statement

Implement `groupBy(collection, iteratee)` that groups collection elements by a derived key. Returns a plain object where each key maps to an array of matching elements.

```js
groupBy([6.1, 4.2, 6.3], Math.floor);
// { 4: [4.2], 6: [6.1, 6.3] }

groupBy(["one", "two", "three"], "length");
// { 3: ["one", "two"], 5: ["three"] }
```

---

## Implementation

```js
const groupBy = (values, keyFinder) => {
  return values.reduce((acc, element) => {
    const key = typeof keyFinder === "function"
      ? keyFinder(element)
      : element[keyFinder];

    if (!acc[key]) {
      acc[key] = [element];
    } else {
      acc[key] = [...acc[key], element];  // or acc[key].push(element)
    }

    return acc;
  }, {});
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Dual iteratee | `typeof keyFinder === 'function'` → call it; else use it as a property name with `element[keyFinder]` |
| `reduce` accumulator | Start with `{}` — builds the grouped object in a single pass |
| Group initialisation | `if (!acc[key]) acc[key] = [element]` — creates the array on first encounter |
| Falsy key values | `!acc[key]` fails when `key` is `0`, `false`, or `""` — safer to use `key in acc` or `acc[key] === undefined` |
| Key type coercion | Object keys are always strings — `Math.floor(6.1)` returns `6` (number) but is stored as `"6"` |
| Original not mutated | `reduce` doesn't touch `values`; push/spread only modifies the accumulator |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — single pass with `reduce` |
| Space | O(n) — output groups contain all n elements |
