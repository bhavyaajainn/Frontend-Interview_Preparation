# Aggregate Array of Objects - Part 2

## Problem Statement

Given an array of activity records, group them by `user` with three transformations:
1. Sum `duration` across records for the same user
2. Merge `equipment` arrays, remove duplicates, sort lexicographically
3. Preserve first-appearance order of users in the output

```js
processRecords(activities);
// [
//   { user: 8, duration: 50,  equipment: ["study"] },
//   { user: 7, duration: 450, equipment: ["biking","coding","gyming","running"] },
//   { user: 1, duration: 10,  equipment: ["eating"] },
//   { user: 2, duration: 400, equipment: ["biking","cocking"] }
// ]
```

---

## Two Approaches

### Approach 1 — Array accumulator (`reduce` with `[]`)
```
find() checks if user exists → O(n) per element → O(n²) total
filter() removes old entry → allocates new array each time
```
Simple and readable; inefficient for large inputs.

### Approach 2 — Object accumulator (`reduce` with `{}`)
```
acc[user] lookup → O(1)
Object.values(result) at the end
```
More efficient; insertion order is preserved in modern JS (ES2015+).

---

## Key Design Points

| Concept | Detail |
|---|---|
| Deduplication | `arr.filter((v, i, self) => self.indexOf(v) === i)` — keeps first occurrence; alternatively `[...new Set(arr)]` |
| Lexicographic sort | `.sort()` with no comparator sorts strings lexicographically (case-sensitive — uppercase before lowercase in ASCII) |
| First-appearance order | Array accumulator preserves this naturally; object accumulator also preserves insertion order in ES2015+ |
| Intra-record duplicates | Same dedup applies — `["running","running"]` → `["running"]` before the first record is stored |
| `Array.find` vs object lookup | `find` is O(n) per call; object key lookup is O(1) — use Approach 2 for better performance |

---

## Time & Space Complexity

| | Approach 1 | Approach 2 |
|---|---|---|
| Time | O(n²) — `find` + `filter` inside reduce | O(n log k) — O(1) lookup + k log k sort per merge |
| Space | O(n) for output + intermediate arrays | O(n) for output object |
