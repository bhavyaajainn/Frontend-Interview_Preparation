# Convert Time in 24 Hours Format

## Problem Statement

Given a time string in 12-hour format (e.g. `"12:10AM"`, `"3:05PM"`), convert it to 24-hour format with zero-padded hours and minutes.

```js
formatTime("12:10AM"); // "00:10"
formatTime("12:33PM"); // "12:33"
formatTime("3:05PM");  // "15:05"
formatTime("11:59AM"); // "11:59"
```

---

## Conversion Rules

| Input | Condition | Output |
|---|---|---|
| `12:xxAM` | Midnight hour | `00:xx` |
| `1–11:xxAM` | Normal AM | `h:xx` (unchanged) |
| `12:xxPM` | Noon hour | `12:xx` (unchanged) |
| `1–11:xxPM` | Normal PM | `h+12:xx` |

---

## Implementation

```js
const formatTime = (time) => {
  const t = time.toLowerCase();
  let [hours, mins] = t.split(":");

  if (t.endsWith("am")) {
    hours = hours == 12 ? "0" : hours;
  } else {
    hours = hours == 12 ? hours : String(+hours + 12);
  }

  return `${hours.padStart(2, "0")}:${mins.slice(0, -2).padStart(2, "0")}`;
};
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `toLowerCase()` first | Makes the `endsWith` check case-insensitive — handles both `"AM"` and `"am"` |
| `split(":")` | After split, `mins` still has the `am`/`pm` suffix — strip it with `.slice(0, -2)` |
| `12:AM` special case | `12:xxAM` must become `00:xx`; without this guard it would stay `12` |
| `12:PM` special case | `12:xxPM` must stay `12:xx`; without this guard `12 + 12 = 24` (wrong) |
| `hours == 12` (loose equality) | Compares string `"12"` to number `12` — works but using `hours === "12"` is more explicit |
| `.padStart(2, "0")` | Ensures single-digit hours/minutes always get a leading zero |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) — fixed-length string operations |
| Space | O(1) — no data structures, just string manipulation |
