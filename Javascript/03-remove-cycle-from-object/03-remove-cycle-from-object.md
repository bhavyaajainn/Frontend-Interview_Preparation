# Remove Cycle from the Object

## Problem Statement

Given an object (or linked-list-style object) that contains a **circular reference**, write a function `removeCycle(obj)` that removes the cycle **in-place** so the object is no longer circular.

Also implement `getCircularReplacer()` — a replacer factory for `JSON.stringify()` that safely serializes a circular object by omitting the back-reference.

---

## Examples

```js
const List = function(val) {
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1; // cycle: item3 → item1

removeCycle(item1);
console.log(item1);
// { val: 10, next: { val: 20, next: { val: 30 } } }
// cycle is gone — item3.next has been deleted
```

```js
// Safe JSON serialisation of a circular object
console.log(JSON.stringify(item1, getCircularReplacer()));
// '{"val":10,"next":{"val":20,"next":{"val":30}}}'
```

---

## Constraints

- The mutation must happen **in-place** — do not return a new object.
- Any object reference that has already been visited should be treated as the cycle point and deleted.
- `getCircularReplacer` must work as a drop-in second argument to `JSON.stringify`.
- Do **not** traverse inherited prototype properties (use `hasOwnProperty`).

---

## Approach

### `removeCycle`

- Use a **`WeakSet`** to track every object reference that has been visited.
- Seed the set with the root object.
- Recursively iterate own properties; for each value that is an object:
  - If the `WeakSet` already contains it → **delete** that property (cycle found).
  - Otherwise → add it to the set and recurse into it.

### `getCircularReplacer`

- Return a **closure** over a `WeakSet` called `seen`.
- The replacer receives `(key, value)`; when `value` is a non-null object:
  - If `seen` has it → return `undefined` (JSON.stringify omits the key).
  - Otherwise → add it to `seen` and return `value` unchanged.

---

## Time & Space Complexity

| Operation              | Complexity |
|------------------------|------------|
| `removeCycle`          | O(n)       |
| `getCircularReplacer`  | O(n)       |
| Space (WeakSet)        | O(n)       |

> n = number of unique object references reachable from the root.
