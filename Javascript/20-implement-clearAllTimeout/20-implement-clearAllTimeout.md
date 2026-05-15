# Implement clearAllTimeout

## Problem Statement

Implement `clearAllTimeout()` — a function that cancels **all active** `setTimeout` timers at once.

---

## Examples

```js
MY_TIMERS.setTimeout(() => { console.log("hello");  }, 1000);
MY_TIMERS.setTimeout(() => { console.log("hello1"); }, 2000);
MY_TIMERS.setTimeout(() => { console.log("hello2"); }, 3000);

MY_TIMERS.clearAllTimeout();
// Nothing is logged — all timers cancelled before they fire
```

---

## Constraints

- `setTimeout` is async — `clearAllTimeout` runs synchronously before any timer callback fires.
- Must not break the original `clearTimeout` behavior (individual cancellation should still work).
- Avoid polluting the global scope with the ID array.

---

## Approach

### Approach 1 — Override `window.setTimeout` (browser)
1. Save the original `window.setTimeout` reference.
2. Replace `window.setTimeout` with a wrapper that calls the original, pushes the returned ID into a global `timeoutIds[]`, and returns the ID.
3. `clearAllTimeout` pops IDs from `timeoutIds` and calls `clearTimeout` on each.

**Drawback**: `timeoutIds` is global — can be accidentally overwritten.

### Approach 2 — Encapsulated object (preferred)
Wrap everything in a `MY_TIMERS` object:
- `MY_TIMERS.setTimeout(fn, delay)` → calls native `setTimeout`, stores the ID in `this.timeoutIds`, returns ID.
- `MY_TIMERS.clearAllTimeout()` → pops and `clearTimeout`s all stored IDs.

No global variables, no monkey-patching `window`.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| `setTimeout` | O(1) per call |
| `clearAllTimeout` | O(n) — n = number of active timers |
| Space | O(n) — ID array |
