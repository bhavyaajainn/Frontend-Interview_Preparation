# Highlight the Words in the String

## Problem Statement

Given a string and an array of keywords, wrap any word (or adjacent sub-words) that match a keyword in `<strong>` tags. If two keywords are adjacent within a single space-separated word, highlight them together as one block.

---

## Examples

```js
const str   = "Ultimate JavaScript / FrontEnd Guide";
const words = ['Front', 'End', 'JavaScript'];

highlight(str, words);
// "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"
// "FrontEnd" → both "Front" and "End" are keywords → combined into one <strong>
```

---

## Constraints

- Split input on spaces to get individual tokens.
- Keywords matching is **case-sensitive**.
- Two keyword halves that are adjacent (concatenated without space) must be highlighted **together**.
- A keyword may appear as a standalone word or as part of a concatenated word (CamelCase style).

---

## Approach

1. Put `keywords` into a `Set` for O(1) lookup.
2. Split `str` on `" "` to get tokens.
3. For each token:
   - **Full match**: if `keywords.has(token)` → wrap entirely in `<strong>`.
   - **Split match**: iterate split points `i` from 0 to `token.length - 1`:
     - `prefix = token.slice(0, i + 1)`, `suffix = token.slice(i + 1)`.
     - Both present → `<strong>prefix + suffix</strong>` (combined).
     - Only prefix → `<strong>prefix</strong> + suffix`.
     - Only suffix → `prefix + <strong>suffix</strong>`.
   - **No match**: keep token as-is.
4. Join tokens back with `" "` and return.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n × m) — n = tokens, m = max token length (split-point scan) |
| Space | O(k) — keyword Set of size k |
