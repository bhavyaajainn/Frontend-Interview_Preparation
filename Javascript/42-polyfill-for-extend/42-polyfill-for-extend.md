# Polyfill for extend

## Problem Statement

Implement `extend(Parent, Child)` that makes `Child` inherit from `Parent`:

- `Child` instances can call `Parent` prototype methods.
- `Child`'s own methods override `Parent`'s methods of the same name.
- Static methods defined on `Parent` are accessible on `Child`.
- `child instanceof Parent` and `child instanceof Child` both return `true`.
- `child.constructor` still points to `Child`.

---

## Approach

```js
const extend = (Parent, Child) => {
  // 1. Link Child.prototype → Parent.prototype (non-static inheritance)
  Object.setPrototypeOf(Child.prototype, Parent.prototype);

  // 2. Link Child → Parent (static method inheritance)
  Object.setPrototypeOf(Child, Parent);

  // 3. Restore constructor (step 1 would leave it pointing to Parent)
  Child.prototype.constructor = Child;
};
```

---

## How the prototype chain looks after `extend(Person, Student)`

```
student
  └── [[Prototype]] → Student.prototype  (sayHello, sayGoodBye, constructor: Student)
        └── [[Prototype]] → Person.prototype  (walk, sayHello)
              └── [[Prototype]] → Object.prototype

Student
  └── [[Prototype]] → Person  (staticMethod)
        └── [[Prototype]] → Function.prototype
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `Object.setPrototypeOf(Child.prototype, Parent.prototype)` | Creates the non-static chain; `child.walk()` resolves through this link |
| `Object.setPrototypeOf(Child, Parent)` | Creates the static chain; `Student.staticMethod()` resolves here |
| Restore `constructor` | After re-linking, `Child.prototype.constructor` would point to `Parent` — must be explicitly reset to `Child` |
| `instanceof` | Works because JS checks the `[[Prototype]]` chain against `.prototype` — no extra code needed |
| Method override | Child methods are own properties on `Child.prototype` — they shadow Parent's methods earlier in the chain |
| `__proto__` vs `setPrototypeOf` | `__proto__` is non-standard (deprecated); `Object.setPrototypeOf` is the ES6 standard |

---

## Common Pitfall — missing constructor restore

```js
Object.setPrototypeOf(Child.prototype, Parent.prototype);
// At this point: Child.prototype.constructor === Parent  ← WRONG
Child.prototype.constructor = Child;  // must be added
```

Without restoring, `new child.constructor()` would create a `Parent` instance instead of a `Child`.

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) — three prototype operations |
| Space | O(1) — no copies made |
