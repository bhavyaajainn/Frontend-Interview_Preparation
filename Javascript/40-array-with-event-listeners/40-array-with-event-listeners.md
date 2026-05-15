# Array with Event Listeners

## Problem Statement

Extend `Array.prototype` so any array can subscribe to `"add"` and `"remove"` events:

```js
const arr = [];
arr.addListener('add', (event, items, array) => console.log('added', items));
arr.pushWithEvent('add', [1, 2, 3]); // logs: added [1, 2, 3]
arr.popWithEvent('remove');
```

Methods to implement: `addListener`, `removeListener`, `pushWithEvent`, `popWithEvent`, `triggerEvent`.

---

## Approach — Per-instance listeners via `hasOwnProperty` guard

```js
Array.prototype.addListener = function (name, callback) {
  // IMPORTANT: create a per-instance listeners map, not shared on the prototype
  if (!Object.prototype.hasOwnProperty.call(this, 'listeners')) {
    this.listeners = {};
  }
  if (!this.listeners[name]) this.listeners[name] = [];
  this.listeners[name].push(callback);
};

Array.prototype.removeListener = function (name, callback) {
  if (!this.listeners?.[name]) return;
  this.listeners[name] = this.listeners[name].filter(cb => cb !== callback);
};

Array.prototype.triggerEvent = function (name, args) {
  (this.listeners?.[name] ?? []).forEach(cb => cb(name, args, this));
};

Array.prototype.pushWithEvent = function (event, items) {
  this.push(...items);
  this.triggerEvent(event, items);
};

Array.prototype.popWithEvent = function (event) {
  const item = this.pop();
  this.triggerEvent(event, item);
};
```

---

## Critical Bug in the Course Solution

The course assigns `Array.prototype.listeners = {}` — a **single shared object** on the prototype.  
When `addListener` does `this.listeners[name] = []`, it mutates the **prototype's** object, so **all arrays share the same listeners**. Adding a listener to `arr1` would also fire on `arr2`.

**Fix:** use `hasOwnProperty` to create a fresh `listeners` map on each instance the first time `addListener` is called.

---

## Key Design Points

| Concept | Detail |
|---|---|
| Per-instance listeners | `hasOwnProperty` guard ensures each array owns its map |
| `triggerEvent` | Central dispatcher — iterates callbacks, passes `(eventName, args, this)` |
| `removeListener` | Uses `filter` to exclude the reference; only works for named functions |
| `pushWithEvent` | Pushes first, then fires — listener sees the updated array |
| `popWithEvent` | Pops first, passes the removed element to the listener |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `addListener` | O(1) |
| `removeListener` | O(k) — k = number of callbacks for the event |
| `triggerEvent` | O(k) — fires each callback once |
| `pushWithEvent` | O(n + k) — n = items pushed |
