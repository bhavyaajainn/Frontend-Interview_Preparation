# Method Chaining – Part 2

## Problem Statement

Implement `ComputeAmount` (both as a constructor and as a closure) that supports method chaining for Indian currency denominations. `value()` returns the accumulated total.

```js
ComputeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();
// 143545000
```

Supported methods: `crore(n)`, `lacs(n)`, `thousand(n)`, `hundred(n)`, `ten(n)`, `unit(n)`, `value()`.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `return this` | Every mutating method returns `this` to allow chaining |
| Denomination multipliers | crore = 10⁷, lacs = 10⁵, thousand = 10³, hundred = 10², ten = 10, unit = 1 |
| Constructor approach | `new ComputeAmount()` — `this` is the instance; methods use regular functions |
| Closure approach | `ComputeAmount()` without `new` — returns a plain object; methods use `this` inside object literals |
| `value()` terminal | Breaks the chain and returns the numeric result |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) per operation |
| Space | O(1) |
