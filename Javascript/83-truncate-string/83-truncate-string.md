# Create a Function to Truncate String

## Problem Statement

Implement `truncate(str, maxLength)` that shortens a string if it exceeds `maxLength` characters, appending `"..."` at the end of the kept portion.

```js
truncate("What I'd like to tell on this topic is:", 20);
// "What I'd like to tel..."

truncate("Hello", 20); // "Hello"  (unchanged — shorter than maxLength)
truncate("Hello", 5);  // "Hello"  (unchanged — exactly maxLength)
```

---

## Implementation

```js
const truncate = (str, maxLength = 0) => {
  if (!maxLength || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `str.length <= maxLength` | Handles both "shorter than" and "exactly equal" in one check — no truncation needed |
| `!maxLength` guard | Protects against `maxLength = 0` or `undefined` — returns the original string |
| `str.slice(0, maxLength)` | Extracts exactly `maxLength` characters from the start; `slice` is safe with any non-negative integer |
| Final length | The returned string is `maxLength + 3` characters long (kept chars + `"..."`); it does NOT fit within `maxLength` |
| Alternative variant | Some implementations fit within `maxLength` total: `str.slice(0, maxLength - 3) + "..."` — clarify with the interviewer which is expected |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(maxLength) — `slice` copies at most `maxLength` characters |
| Space | O(maxLength) — the returned truncated string |
