# Debouncing with Leading and Trailing Options

## Problem Statement

Implement `debounce(fn, delay, options)` where `options` controls when `fn` fires:

| `leading` | `trailing` | Behaviour |
|---|---|---|
| `true` | `true` (default) | Fires immediately on first call AND after quiet period |
| `true` | `false` | Fires only on first call; subsequent calls within window ignored |
| `false` | `true` | Classic debounce — fires after quiet period only |
| `false` | `false` | Never fires (degenerate) |

```js
const d = debounce(fn, 300, { leading: true, trailing: true });
d(); // fires immediately (leading)
d(); d(); // within window — no fire
// ...300ms silence → fires again (trailing)
```

---

## Implementation Logic

```js
const debounce = (fn, delay, options = { leading: true, trailing: true }) => {
  let timeout;
  let isLeadingInvoked = false;

  return function (...args) {
    if (timeout) clearTimeout(timeout);

    if (options.leading && !timeout) {
      fn.apply(this, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    timeout = setTimeout(() => {
      if (options.trailing && !isLeadingInvoked) {
        fn.apply(this, args);
      }
      timeout = null;
    }, delay);
  };
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `!timeout` guard for leading | Leading only fires when there is no active timer — prevents re-firing on rapid successive calls |
| `isLeadingInvoked` flag | Prevents the trailing from double-firing when `leading:true` already ran — without this flag `{ leading:true, trailing:true }` would call fn twice at the end |
| `timeout = null` at end | Resets the "active window" so the next isolated call can trigger leading again |
| `clearTimeout` first | Ensures only the last trailing timer is active; earlier ones are cancelled |
| Classic debounce equivalence | `{ leading: false, trailing: true }` is exactly the classic debounce from problem 73 |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Per call | O(1) |
| Space | O(1) — one timer + one boolean flag per instance |
