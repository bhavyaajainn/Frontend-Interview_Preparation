# Sort a String Ignoring the Case

---

## Problem Statement

Given an array of strings, sort the array in **ascending** or **descending** order while **ignoring the case** (case-insensitive). The original array must not be mutated — return a new sorted array.

Use JavaScript's `localeCompare()` method with the `sensitivity` option inside `Array.sort()`:
- `sensitivity: 'base'` — ignores case entirely (treats `'Ae'` and `'ae'` as equal)
- `sensitivity: 'case'` — considers case (lowercase comes before uppercase)

`localeCompare(other, locale, options)` returns:
- Negative value → `a` comes before `b`
- Positive value → `b` comes before `a`
- Zero → maintain current order

---

## Examples

### Example 1 — Ascending, Case-Insensitive (`sensitivity: 'base'`)

**Input:**

```
strs = ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae']
```

**Output:**

```
['Ae', 'ae', 'be', 'BE', 'de', 'ec', 'ee']
```

**Explanation:**
`'Ae'` and `'ae'` are treated as equal (base sensitivity), so their relative order is preserved. All strings are grouped alphabetically regardless of case.

---

### Example 2 — Ascending, Case-Sensitive (`sensitivity: 'case'`)

**Input:**

```
strs = ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae']
```

**Output:**

```
['ae', 'Ae', 'be', 'BE', 'de', 'ec', 'ee']
```

**Explanation:**
With case sensitivity enabled, lowercase letters are prioritized over uppercase for the same alphabetical value — `'ae'` appears before `'Ae'`, `'be'` before `'BE'`.

---

### Example 3 — Descending, Case-Insensitive (`sensitivity: 'base'`)

**Input:**

```
strs = ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae']
```

**Output:**

```
['ee', 'ec', 'de', 'be', 'BE', 'Ae', 'ae']
```

**Explanation:**
Reverse the comparison by swapping `a` and `b` in `localeCompare` — `b.localeCompare(a, ...)`. Strings are sorted Z→A ignoring case.

---

### Example 4 — All Same Letters, Different Cases

**Input:**

```
strs = ['A', 'a', 'AA', 'aa', 'aA']
```

**Output (base):**

```
['A', 'a', 'aA', 'AA', 'aa']
```

**Explanation:**
Single-character strings come first. Among equal-length strings, `localeCompare` with `sensitivity: 'base'` treats all as equivalent, preserving original relative order among ties.

---

## Constraints

- `1 <= strs.length <= 10^4`
- `1 <= strs[i].length <= 100`
- Strings contain only ASCII alphabetic characters (a–z, A–Z)
- Do **not** mutate the original array — use spread `[...strs]` to create a copy
- `locale` parameter should be `undefined` to use browser/system default
- `sensitivity: 'base'` → fully case-insensitive; `sensitivity: 'case'` → case-aware

---

## Time Complexity

| Case | Time | When |
|---|---|---|
| Best | O(n log n) | All strings same length |
| Average | O(n log n) | Standard random input |
| Worst | O(n log n · m) | Long strings where m = avg string length |

- `Array.sort()` in V8 uses TimSort — O(n log n)
- Each `localeCompare` call is O(m) where m = string length
- Overall: **O(n log n · m)**

---

## Space Complexity

- O(n) — a copy of the array is created using spread operator to avoid mutation
- `Array.sort()` itself uses O(log n) auxiliary space internally (TimSort)

---
