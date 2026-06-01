# Make High Priority API Call

## Problem Statement

While throttling API requests with timers, how do you inject a **high-priority call** that runs before the next scheduled timer fires?

Two approaches:

**1. `fetch` priority option** — hints to the browser to deprioritise a request:
```js
fetch('/articles');                                          // high (default)
fetch('/articles/recommendation', { priority: 'low' });     // explicitly low
```

**2. `queueMicrotask`** — schedules a callback in the **microtask queue**, which drains _before_ the event loop picks up the next macrotask (setTimeout/setInterval):
```js
console.log('start');
setTimeout(regularCall, 0);      // macrotask — runs after current task + microtasks
queueMicrotask(urgentCall);      // microtask — runs before any pending setTimeout
console.log('end');

// Output order: start → end → urgentCall → regularCall
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Macrotask queue | `setTimeout`, `setInterval`, `setImmediate` — processed one per event-loop tick |
| Microtask queue | `Promise.then`, `queueMicrotask`, `MutationObserver` — entire queue drains after each task, before next macrotask |
| Priority ordering | synchronous → microtasks → macrotasks |
| `fetch` `priority` | Browser-level hint (`'high'`, `'low'`, `'auto'`); doesn't affect JS execution order, only network scheduler |
| Use case | Inject an urgent API call between two throttled (setTimeout-based) requests |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) — scheduling is constant time |
| Space | O(1) |
