# Write a function to implement Test() and expect() as in Jest

## Problem Statement

Implement `test(title, callbackFn)` and `expect(value)` — a simplified version of the Jest testing API.

- `test` runs the callback and prints `"Pass <title>"` if it succeeds, or `"Fail <title>"` if it throws.
- `expect` returns an object with matcher methods (e.g. `.toBe`, `.toBeUndefined`) and a `.not` namespace for negated assertions.

---

## Examples

```js
test('learnersbucket is a great platform', () => {
  expect('system-design').toBe('system-design');       // passes
  expect('system-design').not.toBe('machine-coding');  // passes
});
// Output: "Pass learnersbucket is a great platform"

test('To be undefined', () => {
  expect(undefined).toBeUndefined();
});
// Output: "Pass To be undefined"

test('To not be undefined', () => {
  expect(undefined).not.toBeUndefined();
});
// Output: "Fail To not be undefined"
```

---

## Constraints

| Component | Behaviour |
|---|---|
| `test(title, fn)` | Async; catches any thrown error and prints Pass/Fail |
| `expect(actual)` | Returns object with matchers and a `.not` namespace |
| `.toBe(expected)` | Strict equality (`===`) |
| `.toBeUndefined()` | Checks `actual === undefined` |
| `.not.X()` | Negates the matcher — throws if assertion would normally pass |

---

## Approach

Split into three pieces:

1. **`matchers`** — a plain object where each key is a matcher name. Every matcher receives `(expected, actual, { isNot })` and throws on failure.
2. **`helperMatcher(actual, matcherFn, isNot)`** — a closure factory. Returns a function that accepts `expected` and calls the matcher with all three arguments.
3. **`expect(actual)`** — builds a result object: for each key in `matchers`, assign `helperMatcher(actual, fn, false)` directly and `helperMatcher(actual, fn, true)` under `.not`.
4. **`test(title, callback)`** — `async`; wraps `await callback()` in try/catch; logs Pass or Fail.

Making `test` async lets the same API work for promise-based assertions later.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(m) per `expect` call — m = number of matchers |
| Space | O(m) per `expect` call — one closure pair per matcher |

> m = number of matcher methods defined; effectively O(1) for a fixed matcher set.
