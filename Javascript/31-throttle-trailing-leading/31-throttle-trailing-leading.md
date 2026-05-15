# Create a Throttle Function with Trailing and Leading Options

## Problem Statement

Implement `throttle(fn, wait, option)` that restricts how often `fn` can be called:

- `option.leading = true` — invoke `fn` immediately on the **first** call; suppress calls during the cooldown window.
- `option.trailing = true` — invoke `fn` once **after** the cooldown ends, using the most-recent arguments from the burst.
- Both options can be active simultaneously: fires at the start **and** end of each burst.
- Default: `{ leading: true, trailing: false }`.

---

## Approach — Timer + Last-Args Tracking

```js
const throttle = (fn, wait, option = { leading: true, trailing: false }) => {
  let timerId;
  let lastArgs;

  return function throttled(...args) {
    const { leading, trailing } = option;

    const waitFunc = () => {
      // after cooldown: if trailing, fire with most-recent args and restart timer
      if (trailing && lastArgs) {
        fn.apply(this, lastArgs);
        lastArgs = null;
        timerId = setTimeout(waitFunc, wait);
      } else {
        timerId = null;
      }
    };

    if (!timerId && leading) {
      fn.apply(this, args);   // fire immediately
    } else {
      lastArgs = args;        // stash for possible trailing call
    }

    if (!timerId) {
      timerId = setTimeout(waitFunc, wait);
    }
  };
};
```

---

## Options Behaviour at a Glance

| leading | trailing | First call | During cooldown | After cooldown |
|---------|----------|------------|-----------------|----------------|
| true    | false    | fires immediately | suppressed | next call fires immediately |
| false   | true     | fires after `wait` | suppressed; last args kept | fires with last args |
| true    | true     | fires immediately | last args kept | fires with last args |

---

## Key Design Points

| Concept | Detail |
|---|---|
| `timerId` | Tracks active cooldown. `null` means the throttle window is open. |
| `lastArgs` | Stores the most-recent call's arguments for the trailing invocation. |
| `waitFunc` | Called when the timer expires; decides whether to fire (trailing) or just reset. |
| Leading guard | `!timerId && leading` — only fires on the very first call of a burst. |
| Trailing loop | After a trailing fire, timer restarts so subsequent bursts are handled correctly. |
| `this` binding | `fn.apply(this, args)` preserves the caller's context. |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) per call |
| Space | O(1) — single timer + last-args reference |
