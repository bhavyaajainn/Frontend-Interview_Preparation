# Method Chaining - Part 1

## Problem Statement

Implement a `calculator` object and a `CALC` constructor function that support **method chaining** for basic arithmetic operations.

```js
// Object approach
calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total); // 20

// Constructor approach (multiple independent instances)
const c = new CALC();
c.add(10).subtract(2).divide(2).multiply(5);
console.log(c.total); // 20
```

Both must support: `add(val)`, `subtract(val)`, `multiply(val)`, `divide(val)`.  
Each method mutates `this.total` and returns `this` to enable chaining.

---

## Key Design Points

| Concept | Detail |
|---|---|
| `return this` | Each method returns the current object — enables the next method call in the chain |
| Object literal | Single shared instance; `this` inside regular functions refers to the object |
| Constructor function | `new CALC()` creates independent instances with isolated `total` state |
| Arrow functions in constructor | Arrow functions capture `this` from the enclosing `CALC` context — safe for constructor use |
| Object literal limitation | Can't instantiate with `new`; `Object.create(calculator)` is a workaround for new instances |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) per operation |
| Space | O(1) |
