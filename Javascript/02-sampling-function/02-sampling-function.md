# Sampling Function

## Problem Statement

Create a function `sampler(fn, count)` that wraps a given function `fn` and only executes it **once every `count` calls**. All other calls are no-ops.

This is different from throttling — throttling limits execution by **time**, sampling limits it by **number of calls**.

---

## Examples

```js
function message() {
  console.log("hello");
}

const sample = sampler(message, 4);
sample(); // no-op
sample(); // no-op
sample(); // no-op
sample(); // hello  ← 4th call
sample(); // no-op
sample(); // no-op
sample(); // no-op
sample(); // hello  ← 8th call
```

---

## Constraints

- The wrapped function should receive the same arguments as the original call.
- The counter resets after each execution so the cycle repeats.
- Should support an optional `context` (`this`) binding.

---

## Approach

- Use a **closure** to keep a `counter` variable.
- On each call, increment `counter`.
- When `counter === count`, invoke `fn` and reset `counter` to `0`.
- Otherwise return early.

---

## Time & Space Complexity

| Operation | Complexity |
|-----------|------------|
| Each call | O(1)       |
| Space     | O(1)       |
