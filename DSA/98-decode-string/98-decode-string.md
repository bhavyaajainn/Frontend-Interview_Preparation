# Decode a String (Encoded with Number Followed by String)

---

## Problem Statement

Given an encoded string where substrings are wrapped in square brackets preceded by a repeat count (e.g., `3[abc]`), decode and return the fully expanded string. Encoded patterns can be **nested**.

Encoding format: `k[substring]` means `substring` repeated `k` times.

Use two stacks:
- `numStack` — stores the repeat counts
- `charStack` — stores characters and bracket markers

Steps:
1. If digit → push to `numStack`
2. If `[` → push to `charStack`; if no preceding digit, push `1` to `numStack`
3. If `]` → pop count from `numStack`, collect chars from `charStack` back to `[`, repeat the collected string `count` times, push result back to `charStack`
4. If letter → push to `charStack`
5. At end → join `charStack` into result string

---

## Examples

### Example 1 — Nested Encoding

**Input:**

```
str = "2[a2[b]]"
```

**Output:**

```
"abbabb"
```

**Explanation:**
Inner `2[b]` → `bb`. So `2[abb]` → `abbabb`. The nested bracket is decoded first, then the outer repeat is applied.

---

### Example 2 — Multiple Groups

**Input:**

```
str = "3[b2[ca]]"
```

**Output:**

```
"bcacabcacabcaca"
```

**Explanation:**
Inner `2[ca]` → `caca`. So `3[bcaca]` → `bcacabcacabcaca`.

---

### Example 3 — Simple No Nesting

**Input:**

```
str = "3[abc]"
```

**Output:**

```
"abcabcabc"
```

**Explanation:**
`3[abc]` → repeat `abc` 3 times = `abcabcabc`. No nesting — straightforward single-level decoding.

---

### Example 4 — Multiple Sequential Groups

**Input:**

```
str = "2[ab]3[c]"
```

**Output:**

```
"ababccc"
```

**Explanation:**
`2[ab]` → `abab`. `3[c]` → `ccc`. Concatenate both → `ababccc`.

---

## Constraints

- `1 <= str.length <= 30`
- `str` consists of lowercase letters, digits, and `[` `]`
- It is guaranteed that the input string is valid — brackets are always balanced
- Repeat counts (`k`) are positive integers: `1 <= k <= 300`
- Patterns can be nested arbitrarily deep
- No spaces in the input

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| All | O(n²) | Joining charStack into decoded string repeatedly per `]` |

- Each `]` triggers a string join which is O(n) in worst case
- Overall: O(n²) due to repeated string concatenation

---

## Space Complexity

- O(n + n) = O(n) — `numStack` holds counts, `charStack` holds characters and bracket markers
- In deeply nested cases, both stacks scale with the encoded string length

---
