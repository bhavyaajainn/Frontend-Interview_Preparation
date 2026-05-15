# HTML Encoding of a String

## Problem Statement

Given a string and an array of style ranges `[start, end, tag]`, return the HTML-encoded string with proper opening/closing tags — including correct handling of **overlapping** ranges.

---

## Examples

```js
const str = 'Hello, world';
const styleArr = [[0, 2, 'i'], [4, 9, 'b'], [7, 10, 'u']];

// Output: '<i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>'
```

```js
// Overlapping example
parse('Hello, World', [[0, 2, 'i'], [1, 3, 'b']]);
// '<i>H<b>el</b></i><b>l</b>o, World'
// b overlaps i → b is closed at i's end and reopened after
```

---

## Constraints

- Ranges can overlap — overlapping tags must be closed and re-opened at the boundary.
- `start` is inclusive, `end` is exclusive (character at `end` is NOT wrapped).
- Tags are applied in order of range size (longest first) when they start at the same index.

---

## Approach 1 — Custom Algorithm (Priority Queue + Stack)

Three helper pieces:

**`Tag(start, end, tag)`** — holds a style entry and a `getRange()` method (`end - start`).

**`addAndSort(track, index, data)`** — inserts a `Tag` into `track[index]` and sorts by descending range so the longest tag opens first.

**`parse(str, markups)`**:
1. Build a `track` array (size = `str.length`). For each markup, call `addAndSort` at its start index.
2. Create a `Stack`, push an initial sentinel `Tag(0, MAX_VALUE, "")`.
3. Iterate each character `i`:
   - For each tag queued at `track[i]`: open it (`<tag>`), check if its `end` exceeds the stack top's `end` — if so, **split**: shorten current tag to stack top's `end`, create a new tag for the remainder and re-queue it.
   - Push the tag onto the stack and accumulate the character into the stack top's text.
   - At the end of a tag's range, pop it from the stack, close it (`</tag>`), and append to the new stack top's text.
4. Return the sentinel's accumulated text.

## Approach 2 — DOMParser (browser only)

1. Use `reduce` to insert `<tag>` at `chars[start]` and `</tag>` at `chars[end]` for each markup (may produce malformed HTML for overlaps).
2. Pass the joined string through `DOMParser` with `'text/html'` — the browser auto-corrects mismatched tags.
3. Return `body.innerHTML`.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time (custom) | O(n log k) — n = string length, k = styles (sort per index) |
| Time (DOMParser) | O(n + k) — linear scan + browser parsing |
| Space | O(n + k) — track array + stack |
