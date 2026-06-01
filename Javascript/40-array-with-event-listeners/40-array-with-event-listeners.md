# Array with Event Listeners

## Problem Statement

Extend `Array.prototype` so any array can subscribe to `"add"` and `"remove"` events:

```js
const arr = [];
arr.addListener("add", (event, items, array) => console.log("added", items));
arr.pushWithEvent("add", [1, 2, 3]); // logs: added [1, 2, 3]
arr.popWithEvent("remove");
```

Methods to implement: `addListener`, `removeListener`, `pushWithEvent`, `popWithEvent`, `triggerEvent`.

---

## Critical Bug in the Course Solution

The course assigns `Array.prototype.listeners = {}` — a **single shared object** on the prototype.  
When `addListener` does `this.listeners[name] = []`, it mutates the **prototype's** object, so **all arrays share the same listeners**. Adding a listener to `arr1` would also fire on `arr2`.

**Fix:** use `hasOwnProperty` to create a fresh `listeners` map on each instance the first time `addListener` is called.

---

## Key Design Points

| Concept                | Detail                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| Per-instance listeners | `hasOwnProperty` guard ensures each array owns its map                    |
| `triggerEvent`         | Central dispatcher — iterates callbacks, passes `(eventName, args, this)` |
| `removeListener`       | Uses `filter` to exclude the reference; only works for named functions    |
| `pushWithEvent`        | Pushes first, then fires — listener sees the updated array                |
| `popWithEvent`         | Pops first, passes the removed element to the listener                    |

---

## Time & Space Complexity

|                  | Complexity                                   |
| ---------------- | -------------------------------------------- |
| `addListener`    | O(1)                                         |
| `removeListener` | O(k) — k = number of callbacks for the event |
| `triggerEvent`   | O(k) — fires each callback once              |
| `pushWithEvent`  | O(n + k) — n = items pushed                  |
