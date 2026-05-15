# Create Analytics SDK

## Problem Statement

Implement an `SDK` class that queues analytics events and sends them one at a time with the following rules:

- Each event is sent after a **1-second delay**.
- Sending **fails every `n % 5 === 0` attempt** (i.e. the 5th, 10th, 15th… calls to the internal wait function).
- The **next event is sent only after the previous one resolves** (sequential, not parallel).
- On failure, **retry the same event** (push it back to the front of the queue) and reset the failure counter.

---

## API

| Method | Description |
|---|---|
| `logEvent(event)` | Queue an event string for later sending. |
| `send()` | Start draining the queue sequentially. |

---

## Examples

```js
const sdk = new SDK();

sdk.logEvent("event 1");
// ... up to event 10
sdk.logEvent("event 10");

sdk.send();
```

Expected output (one line per second):
```
"Analytics sent event 1"
"Analytics sent event 2"
"Analytics sent event 3"
"Analytics sent event 4"
"-----------------------"
"Failed to send event 5"
"Retrying sending event 5"
"-----------------------"
"Analytics sent event 5"
"Analytics sent event 6"
"Analytics sent event 7"
"Analytics sent event 8"
"-----------------------"
"Failed to send event 9"
"Retrying sending event 9"
"-----------------------"
"Analytics sent event 9"
"Analytics sent event 10"
```

> Events 5 and 9 fail because they are the 5th and 9th attempts respectively — `5 % 5 === 0` and after the retry the counter resets so 9 becomes the 5th attempt again.

---

## Constraints

- `logEvent` can be called any number of times before `send`.
- `send` must process events **in order** and **one at a time**.
- On failure: log the failure/retry messages, reset the counter to `1`, and put the event back at the **front** of the queue.
- On success: log the sent message and increment the counter.

---

## Approach

1. **Constructor** — initialise `this.queue = []` and `this.count = 1`.
2. **`logEvent`** — push the event string onto the queue.
3. **`wait`** — return a `Promise` that resolves/rejects inside a `setTimeout` of 1 second; reject when `this.count % 5 === 0`.
4. **`sendAnalytics`** (internal async helper) — recursively:
   - Base case: queue empty → return.
   - `shift` the first event.
   - `await this.wait()` in a `try/catch`.
   - On resolve: log success, increment `count`, recurse.
   - On reject: log failure/retry, reset `count = 1`, `unshift` the event back, recurse.

---

## Time & Space Complexity

| Operation     | Complexity |
|---------------|------------|
| logEvent      | O(1)       |
| send (total)  | O(n)       |
| Space (queue) | O(n)       |

> n = number of events logged (retries add extra iterations but not extra unique events).
