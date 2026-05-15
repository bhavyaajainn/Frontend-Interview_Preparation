# Publisher-Subscriber - 2

## Problem Statement

Implement an advanced pub/sub event system in JavaScript with the following API:

| Method | Description |
|---|---|
| `subscribe(name, cb)` | Subscribe to a named event; callback fires on every `publish`. Returns `{ remove() }` to unsubscribe. |
| `subscribeOnce(name, cb)` | Subscribe to a named event; callback fires **only on the first** matching `publish`, then auto-removes. |
| `subscribeOnceAsync(name)` | Subscribe to a named event; returns a **Promise** that resolves with the data on the first matching `publish`. |
| `publish(name, data)` | Fire all subscribers (regular + once + async) registered under `name`. |
| `publishAll(data)` | Fire **all** regular subscribers across every event name with `data`. |

---

## Examples

```js
const events = new Events();

const sub1 = events.subscribe("new-user", (payload) => {
  console.log(`Sending Q1 News to: ${payload}`);
});

events.publish("new-user", "John");
// "Sending Q1 News to: John"

const sub2 = events.subscribe("new-user", (payload) => {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");
// "Sending Q1 News to: Doe"
// "Sending Q2 News to: Doe"

sub1.remove();
events.publish("new-user", "Foo");
// "Sending Q2 News to: Foo"

events.publishAll("FooBar");
// "Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", (payload) => {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
// "Sending Q2 News to: Foo Once"
// "I am invoked once Foo Once"

events.publish("new-user", "Foo Again");
// "Sending Q2 News to: Foo Again"  ← once callback is gone

// async variant
const result = await events.subscribeOnceAsync("new-user");
events.publish("new-user", "Async Value");
console.log(result); // "Async Value"
```

---

## Constraints

- Maintain **three separate Maps**: `subscriptionList`, `subscribeOnceList`, `subscribeOnceAsyncList`.
- `subscribe` must return an object with a `remove()` method that removes only that specific callback.
- `subscribeOnce` callbacks are cleared after the first `publish` that matches the event name.
- `subscribeOnceAsync` resolvers are cleared after the first `publish` that matches the event name.
- `publishAll` only fires the regular `subscriptionList` (not once/async lists).

---

## Approach

- Each Map stores `eventName → [callback, ...]`.
- **subscribe**: push callback; `remove()` filters it out by reference.
- **subscribeOnce**: push callback; on `publish`, call then clear the list for that name.
- **subscribeOnceAsync**: store the `resolve` function from a `new Promise`; on `publish`, call then clear.
- **publish**: iterate all three lists for the given name, fire each callback, then clear the once/async lists.
- **publishAll**: iterate every entry in `subscriptionList` and fire all callbacks with the given data.

---

## Time & Space Complexity

| Operation      | Complexity |
|----------------|------------|
| subscribe      | O(1)       |
| unsubscribe    | O(n)       |
| publish        | O(n)       |
| publishAll     | O(E × n)   |
| Space          | O(E × n)   |

> n = subscribers per event, E = total unique event names.
