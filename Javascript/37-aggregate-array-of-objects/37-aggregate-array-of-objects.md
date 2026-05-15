# Aggregate Array of Objects on the Given Keys

## Problem Statement

Implement `aggregate(arr, on, who)`:

- Group objects by unique values of the `on` key.
- Collect all corresponding `who` values into an array for each group.
- Return an array of objects `[{ [on]: value, [who]: [...] }, ...]`.

```js
aggregate(endorsements, 'skill', 'user')
// [{ skill: 'css', user: ['Bill', 'Sue'] }, ...]
```

---

## Approach — reduce into a map, return values

```js
const aggregate = (arr, on, who) => {
  const map = arr.reduce((acc, item) => {
    const key = item[on];
    if (!acc[key]) {
      acc[key] = { [on]: key, [who]: [] };
    }
    acc[key][who].push(item[who]);
    return acc;
  }, {});

  return Object.values(map);
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Dynamic keys | `item[on]` and `item[who]` use bracket notation — works for any key names |
| Map keyed by `on` value | One entry per unique `on` value; O(1) lookup per item |
| Push vs spread | `push` is O(1) per item; spread `[...arr, val]` would be O(n) each time |
| `Object.values` | Converts the map back to the required array format; preserves insertion order |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — one pass through the array |
| Space | O(n) — output map holds all values |
