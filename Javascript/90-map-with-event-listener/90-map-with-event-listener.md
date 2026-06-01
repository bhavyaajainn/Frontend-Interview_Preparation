# Implement Map Data Structure with Event Listener

## Problem Statement

Implement `StoreData` — a key-value store that fires registered event listeners whenever a stored value changes.

```js
const store = new StoreData();
store.add("name", "joe");
store.on("change:name", (old, nw, key) => console.log(`${key}: ${old} → ${nw}`));
store.add("name", "emma"); // fires → "name: joe → emma"

store.on("age", (old, nw, key) => console.log(old, nw));
store.add("age", 30);  // first insert — no listener fired
store.add("age", 50);  // fires → 30 50
```

---

## API

| Method | Description |
|---|---|
| `add(key, value)` | Store value. If key existed before and new value ≠ old value → fire all matching listeners |
| `has(key)` | Return `true` if key is in store, `false` otherwise |
| `on(event, callback)` | Register `callback` for `event`. Event is either `"key"` or `"change:key"` — both work |

---

## Key Design Points

| Concept | Detail |
|---|---|
| `hasOldValue = key in this.data` | Captured **before** setting the new value — so the first-ever insert has `hasOldValue = false` → no listener fires |
| `oldValue !== value` | Strict equality; only fires when value actually changes |
| Dual event format | `trigger()` checks both `listeners["change:key"]` and `listeners["key"]` — registering either format is valid |
| Multiple listeners | `listeners[event]` is an array — `on()` pushes callbacks, `trigger()` calls all of them |
| Publisher-Subscriber pattern | `on` = subscribe; `trigger` = publish |

---

## Trigger Logic

```js
trigger(key, oldValue, newValue) {
  // "change:key" format
  (this.listeners[`change:${key}`] || []).forEach(cb => cb(oldValue, newValue, key));
  // "key" shorthand format
  (this.listeners[key]             || []).forEach(cb => cb(oldValue, newValue, key));
}
```

---

## Time & Space Complexity

| | Complexity |
|---|---|
| `add` (no change) | O(1) |
| `add` (with trigger) | O(L) where L = number of registered listeners for the key |
| `has` | O(1) |
| `on` | O(1) amortized |
| Space | O(k + L) where k = keys, L = total listeners |
