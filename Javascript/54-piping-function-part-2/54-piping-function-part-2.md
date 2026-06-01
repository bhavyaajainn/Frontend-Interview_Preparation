# Piping Function – Part 2

## Problem Statement

Implement `pipe(...fns)` that accepts any number of functions and returns a new function. When the returned function is called with a value, it passes that value through each function **left to right**, feeding each output as the next input, and returns the final result.

```js
const getSalary  = (person)      => person.salary;
const addBonus   = (netSalary)   => netSalary + 1000;
const deductTax  = (grossSalary) => grossSalary - grossSalary * 0.3;

pipe(getSalary, addBonus, deductTax)({ salary: 10000 });
// 7700
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Rest params | `...fns` collects all passed functions into an array |
| Closure | Inner function captures `fns` and applies them in order |
| Left-to-right | Each function's return value becomes the next function's argument |
| `reduce` alternative | `fns.reduce((val, f) => f(val), initialVal)` is a concise one-liner equivalent |
| Single-function pipe | `pipe(f)(x)` should behave identically to `f(x)` |
| No functions | `pipe()(x)` should return `x` unchanged |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) where n = number of functions |
| Space | O(1) — no extra data structures |
