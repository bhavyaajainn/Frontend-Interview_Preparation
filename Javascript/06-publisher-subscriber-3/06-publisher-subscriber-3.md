# Publisher-Subscriber - 3 (Observable)

## Problem Statement

Create an `Observable` class that implements the observer pattern with the following API:

| Method | Description |
|---|---|
| `subscribe(callback)` | Register a callback; returns `{ unsubscribe() }` to remove it. Throws if `callback` is not a function. |
| `notify(...data)` | Invoke all registered callbacks with the provided arguments. |
| `getObserverCount()` | Return the number of active subscribers. |
| `clear()` | Remove all subscribers at once. |

---

## Examples

```js
const observable = new Observable();

const sub1 = observable.subscribe((data) => console.log('Sub1:', data));
const sub2 = observable.subscribe((data) => console.log('Sub2:', data));
const sub3 = observable.subscribe((data) => console.log('Sub3:', data));

console.log(observable.getObserverCount()); // 3

observable.notify('Broadcast message');
// Sub1: Broadcast message
// Sub2: Broadcast message
// Sub3: Broadcast message

sub2.unsubscribe();

observable.notify('Another message');
// Sub1: Another message
// Sub3: Another message

observable.clear();
observable.notify('No one listening'); // (no output)
```

---

## Constraints

- `subscribe` must accept only functions; throw `Error('Callback must be a function')` otherwise.
- `unsubscribe` must remove only the specific subscription it belongs to (not all callbacks with the same function reference if subscribed multiple times).
- `notify` accepts a variable number of arguments (`...data`) and passes them all to each callback.
- Errors thrown inside a callback should be caught and logged, not allowed to break other subscribers.
- `clear` empties the entire observer list.

---

## Approach

- Store observers as an **array of objects** `{ callback }` so each subscription is a unique reference regardless of the callback function.
- `subscribe` pushes an observer object and returns `{ unsubscribe }` that splices it out by index.
- `notify` iterates the list, spreading `...data` into each `callback`; wrap in `try/catch` to isolate errors.
- `getObserverCount` returns `this.observers.length`.
- `clear` sets `this.observers = []`.

---

## Time & Space Complexity

| Operation          | Complexity |
|--------------------|------------|
| subscribe          | O(1)       |
| unsubscribe        | O(n)       |
| notify             | O(n)       |
| getObserverCount   | O(1)       |
| clear              | O(1)       |
| Space              | O(n)       |

> n = number of active subscribers.
