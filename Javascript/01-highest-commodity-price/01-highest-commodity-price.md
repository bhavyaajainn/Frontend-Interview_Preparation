# Find Highest Commodity Price Under a Timestamp

## Problem Statement

Given a list of timestamps and commodity prices, find the highest commodity price at a given timestamp.

- Timestamps are **not necessarily in sorted order**.
- There can be **multiple entries** for the same timestamp.

**Followup:** After each `(timestamp, price)` entry, a checkpoint identifier can be placed. Given a timestamp and a checkpoint, find the maximum commodity price up to (and including) that checkpoint.

**Asked in:** Atlassian Frontend Interview

---

## Examples

### Example 1 — Base Problem

Input:
```
s.add(1, 1);
s.add(1, 4);
s.add(1, 2);
s.highestPrice(1)
```

Output:
```
4
```

---

### Example 2 — With Checkpoints

Input:
```
s.add(1, 1);
s.add(1, 4);
s.add(1, 2);
s.add(1, 3, 'a');  // checkpoint 'a' placed here
s.add(1, 6);
s.add(1, 7);
s.add(1, 8, 'b');  // checkpoint 'b' placed here
```

Output:
```
s.highestPrice(1, 'a')  // 4
s.highestPrice(1, 'b')  // 8
s.highestPrice(1)       // 8
```

---

## Constraints

- Timestamps can be any number and may appear out of order.
- Multiple prices can share the same timestamp.
- Checkpoints are unique string identifiers.
- If no checkpoint is provided, return the max across all entries for that timestamp.

---

## Approach

### Base Problem
- Use a `Map` keyed by timestamp, storing an array of prices.
- On `add`: push the price into the array for that timestamp.
- On `highestPrice`: spread the array into `Math.max`.

### Followup — Checkpoints
Two approaches:
1. **Inline checkpoint markers** — store the checkpoint string inside the prices array after the last price; on query, slice up to the checkpoint index and filter non-numeric values.
2. **Separate checkpoint map (optimal)** — track running max per timestamp and snapshot it into a separate map keyed by `timestamp__checkpoint` on each checkpoint call. `highestPrice` with checkpoint is O(1).

---

## Time Complexity

| Operation       | Inline Markers | Separate Map |
|-----------------|---------------|--------------|
| `add`           | O(1)          | O(1)         |
| `highestPrice`  | O(n)          | O(1)         |

---

## Space Complexity

- O(n) where n is the total number of entries.
