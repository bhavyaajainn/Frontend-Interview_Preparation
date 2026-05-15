# Publisher-Subscriber - 1 (Observer Pattern)

## Problem Statement

Implement the **Observer (Pub/Sub) design pattern** in JavaScript.

Create a `Move` constructor function that acts as the **host/publisher**. It should allow observers to subscribe, unsubscribe, and be notified when an event is fired.

---

## Examples

```js
const moveHandler = function (item) {
  console.log("fired: " + item);
};

const moveHandler2 = function (item) {
  console.log("Moved: " + item);
};

const move = new Move();

move.subscribe(moveHandler);
move.fire('event #1');
// "fired: event #1"

move.unsubscribe(moveHandler);
move.fire('event #2');
// (no output — no subscribers)

move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire('event #3');
// "fired: event #3"
// "Moved: event #3"
```

---

## Constraints

- `subscribe(fn)` — adds `fn` to the list of observers.
- `unsubscribe(fn)` — removes `fn` from the list (by reference).
- `fire(o, thisObj)` — invokes every subscribed handler with `o` as the argument; `thisObj` sets the `this` context (defaults to `window`/global).
- Subscribing the same function twice should result in it being called twice on fire.
- Unsubscribing a function that was never subscribed should have no effect.

---

## Approach

- Store handlers in an array on the instance (`this.handlers`).
- `subscribe` — push the function onto the array.
- `unsubscribe` — filter the array to remove the matching function reference.
- `fire` — iterate handlers and call each with `.call(scope, o)`.

---

## Time & Space Complexity

| Operation     | Complexity |
|---------------|------------|
| subscribe     | O(1)       |
| unsubscribe   | O(n)       |
| fire          | O(n)       |
| Space         | O(n)       |

> n = number of currently subscribed handlers.
