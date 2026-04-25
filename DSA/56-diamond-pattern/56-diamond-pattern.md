# Print the Diamond Pattern

---

## Problem Statement

Given the number of rows, print a diamond pattern using `*`. The diamond is formed by printing a complete pyramid (top half) followed by an inverted pyramid (bottom half), sharing no repeated middle row.

---

## Examples

### Example 1

**Input:**

```
rows = 5
```

**Output:**

```
"    *    "
"   ***   "
"  *****  "
" ******* "
"*********"
" ******* "
"  *****  "
"   ***   "
"    *    "
```

**Explanation:**
Top half (rows 1–5): complete pyramid — (rows−i) spaces + (2i−1) stars + (rows−i) spaces.
Bottom half (rows 4–1): inverted pyramid starting at i = rows−1, same formula applied in reverse.
Total printed rows = 2×rows − 1 = 9.

---

### Example 2

**Input:**

```
rows = 3
```

**Output:**

```
"  *  "
" *** "
"*****"
" *** "
"  *  "
```

**Explanation:**
Top half produces 3 rows, bottom half produces 2 rows (rows−1 down to 1). Total = 5 rows.

---

### Example 3

**Input:**

```
rows = 1
```

**Output:**

```
"*"
```

**Explanation:**
A 1-row diamond is just a single star. The bottom loop (i = rows−1 = 0) never executes, so only one row is printed.

---

### Example 4

**Input:**

```
rows = 2
```

**Output:**

```
" * "
"***"
" * "
```

**Explanation:**
Top half: rows 1–2 (2 rows). Bottom half: row 1 only (1 row). Total = 3 rows.

---

## Constraints

- 1 ≤ rows ≤ 50
- Top half uses loop `i = 1 to rows` — same as the complete pyramid
- Bottom half uses loop `i = rows−1 down to 1` — avoids repeating the widest row
- Each row follows: (rows−i) spaces + (2i−1) stars + (rows−i) spaces
- Total rows printed = 2×rows − 1

---

## Time Complexity

- O(n²) — two pyramid sections each take O(n²); combined is O(2n²) = O(n²)

---

## Space Complexity

- O(1) — only the current row string is stored at any time

---
