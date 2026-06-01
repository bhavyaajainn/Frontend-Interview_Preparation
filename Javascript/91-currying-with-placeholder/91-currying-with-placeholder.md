# Currying with Placeholder

## Problem Statement

Implement `curry(func)` where `curry.placeholder` is a unique Symbol that defers an argument position. When all `func.length` positions are filled by real values (no placeholders remaining), `func` is invoked.

```js
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
const _ = curry.placeholder;

curriedAdd(_, _, 3)(_, 1)(3); // 7
//  step 1: [_, _, 3]  — two placeholders, not ready
//  step 2: [_, 1, 3]  — first _ replaced by _ (still placeholder!), 1 fills second _
//  step 3: [3, 1, 3]  — 3 fills remaining _ → invoke add(3, 1, 3) = 7
```

---

## Implementation

```js
function fillPlaceholders(currentArgs, newArgs, placeholder) {
  const result = [];
  let ni = 0;
  for (const arg of currentArgs) {
    result.push(arg === placeholder && ni < newArgs.length ? newArgs[ni++] : arg);
  }
  while (ni < newArgs.length) result.push(newArgs[ni++]);
  return result;
}

function curry(func, limit = func.length) {
  const placeholder = curry.placeholder;
  return function curried(...args) {
    const validArgs = args.filter(a => a !== placeholder);
    const hasPlaceholders = args.slice(0, limit).includes(placeholder);
    if (validArgs.length >= limit && !hasPlaceholders) {
      return func(...args.slice(0, limit));
    }
    return (...nextArgs) => curried(...fillPlaceholders(args, nextArgs, placeholder));
  };
}

curry.placeholder = Symbol("_");
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `Symbol` for placeholder | Guarantees uniqueness — no user value can accidentally equal the placeholder |
| `fillPlaceholders` | Scans left-to-right; each real arg in `newArgs` fills the next `_` slot; extras are appended |
| `hasPlaceholders = args.slice(0, limit).includes(_)` | Only the first `limit` positions matter — trailing extras are irrelevant |
| Execution condition | `validArgs.length >= limit && !hasPlaceholders` — both checks are needed |
| `func.length` as default limit | Picks up the arity of the wrapped function automatically |

---

## Execution Trace (article example)

```
curriedAdd(_, _, 3)          → args = [_, _, 3], 1 valid → wait
  (_, 1)                     → fillPlaceholders([_, _, 3], [_, 1]) = [_, 1, 3] → still has _ → wait
    (3)                      → fillPlaceholders([_, 1, 3], [3]) = [3, 1, 3] → no _ → add(3,1,3) = 7
```

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Per call | O(n) where n = current accumulated arg count |
| Space | O(n) for merged args array |
