# Count Number of Substrings Recursively

---

## Problem Statement

Given a string `str` and a substring `subStr`, recursively count the **total number of occurrences** of `subStr` within `str`. Overlapping occurrences are not counted — each match advances the cursor past the matched substring.

Recursive logic:
1. **Base case:** if `str` is empty or shorter than `subStr` → return `0`
2. If `str.substring(0, n2) === subStr` → found a match: skip past it and recurse + 1
3. Else → slide one character forward and recurse

---

## Examples

### Example 1 — General Case

**Input:**

```
str = 'learnersbucket'
subStr = 'e'
```

**Output:**

```
3
```

**Explanation:**
`'e'` appears at indices 1, 5, 12 in `'learnersbucket'`. Each match slices it off and recurses, accumulating count of 3.

---

### Example 2 — Multi-character Substring

**Input:**

```
str = 'abcabcabc'
subStr = 'abc'
```

**Output:**

```
3
```

**Explanation:**
`'abc'` appears 3 times consecutively. Each match removes 3 characters and recurses. No overlap checked.

---

### Example 3 — No Match

**Input:**

```
str = 'hello'
subStr = 'xyz'
```

**Output:**

```
0
```

**Explanation:**
`'xyz'` does not exist anywhere in `'hello'`. Every recursion takes the else branch (slide 1). When string length < substring length, returns 0.

---

### Example 4 — Substring at Start and End

**Input:**

```
str = 'aXaYa'
subStr = 'a'
```

**Output:**

```
3
```

**Explanation:**
`'a'` is found at indices 0, 2, 4. Each match removes `'a'` and recurses. Count accumulates to 3.

---

## Constraints

- `0 <= str.length <= 10^4`
- `1 <= subStr.length <= str.length`
- Matching is case-sensitive
- Non-overlapping matches only — after each match, cursor advances by `subStr.length`
- Return `0` if `subStr` is not found or `str` is empty

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n) | Each character is visited once — one character sliced per recursive step |

- n = length of `str`

---

## Space Complexity

- O(n) — recursive call stack can go up to `n` levels deep (one character sliced per call in the no-match path)

---
