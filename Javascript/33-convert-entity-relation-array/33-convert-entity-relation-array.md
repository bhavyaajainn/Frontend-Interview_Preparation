# Convert Entity Relation Array to Object

## Problem Statement

Given an array of `[child, parent]` pairs (in any order), return an array of strings showing every full ancestry path from root to each node.

```js
Input:  [["lion","cat"],["cat","mammal"],["mammal","animal"],...]
Output: ["animal -> mammal", "animal -> mammal -> cat", "animal -> mammal -> cat -> lion", ...]
```

---

## Approach — Aggregate then Recursive Path Build

### Step 1 — Aggregate into a child→parent map

One child has exactly one parent, so the map is unambiguous:

```js
const aggregate = (arr) =>
  arr.reduce((acc, [child, parent]) => {
    acc[child] = parent;
    return acc;
  }, {});
// { lion:"cat", cat:"mammal", dog:"mammal", mammal:"animal", fish:"animal", shark:"fish" }
```

### Step 2 — Build full path string for each node

Walk the map upward from each `child` until reaching a root (a value not present as a key):

```js
const getPath = (map, key) => {
  const parent = map[key];
  if (parent in map) return getPath(map, parent) + ' -> ' + key;
  return parent + ' -> ' + key;
};
```

### Step 3 — Collect paths for all nodes

```js
const convert = (map) =>
  Object.keys(map).map(key => getPath(map, key));
```

### Complete solution

```js
const ancestry = (arr) => {
  const map = arr.reduce((acc, [child, parent]) => {
    acc[child] = parent;
    return acc;
  }, {});

  const getPath = (key) => {
    const parent = map[key];
    return (parent in map ? getPath(parent) : parent) + ' -> ' + key;
  };

  return Object.keys(map).map(getPath);
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `child → parent` map | One child has at most one parent → flat key-value pair, O(1) lookup |
| Recursion base case | `parent` is not a key in `map` → it's a root; prepend it and stop |
| Path direction | Build from leaf upward, concatenate parent prefix + `" -> " + key` |
| Output size | One path string per node in the map (every non-root entity) |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n × d) — n nodes, d = max depth; each node walks up to its root |
| Space | O(n) — map + output array |
