# Polyfill for ClassNames in React

## Problem Statement

Implement `ClassNames(...args)` — a polyfill for the popular [`classnames`](https://www.npmjs.com/package/classnames) npm package used in React to compose CSS class strings dynamically.

The function accepts **any number of arguments** of **any type** and returns a single space-separated string of class names.

---

## Examples

```js
ClassNames('foo', 'bar');                                        // 'foo bar'
ClassNames('foo', { bar: true });                                // 'foo bar'
ClassNames({ 'foo-bar': true });                                 // 'foo-bar'
ClassNames({ 'foo-bar': false });                                // ''
ClassNames({ foo: true }, { bar: true });                        // 'foo bar'
ClassNames({ foo: true, bar: true });                            // 'foo bar'

ClassNames('foo', { bar: true, duck: false }, 'baz', { quux: true });
// 'foo bar baz quux'

ClassNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '');
// 'bar 1'

const arr = ['b', { c: true, d: false }];
ClassNames('a', arr);                                            // 'a b c'

let buttonType = 'primary';
ClassNames({ [`btn-${buttonType}`]: true });                     // 'btn-primary'
```

---

## Constraints

| Input type | Behaviour |
|---|---|
| `string` | Use as-is |
| `number` | Convert to string (`0` is falsy → skip; `-1`, `1` → include) |
| `boolean / null / undefined` | Ignore |
| `object` (plain) | Include **key** if its **value** is truthy; skip prototype keys |
| `Array` | Spread elements and process each recursively |

---

## Approach

Split the logic into three small functions:

1. **`appendClass(existing, newClass)`** — concatenates two class strings with a space; returns `existing` unchanged if `newClass` is empty.
2. **`processArg(arg)`** — converts a single argument to a class string:
   - `string` → return as-is.
   - `number` → `"" + arg`.
   - Not an object → `""`.
   - Array → recurse via `ClassNames(...arg)`.
   - Plain object → iterate own keys; include key if value is truthy.
3. **`ClassNames(...args)`** — iterate args; skip falsy; call `processArg` and `appendClass` for each.

---

## Time & Space Complexity

| Operation    | Complexity |
|--------------|------------|
| Time         | O(n)       |
| Space        | O(n)       |

> n = total number of class tokens across all arguments (including nested arrays/objects).
