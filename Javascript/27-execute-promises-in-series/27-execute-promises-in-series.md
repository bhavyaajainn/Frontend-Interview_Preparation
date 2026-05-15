# Execute Promises in Series

## Problem Statement

Implement `asyncSeriesExecuter(promises)` — takes an array of **async functions** (each returns a promise when called) and executes them **one at a time**. The next task starts only after the previous one resolves.

- Input is an array of **thunks** (functions that return a promise), not bare promises.
- Execution order must match input order, regardless of resolution time.

---

## Examples

```js
const asyncTask = (i) => () =>
  new Promise(resolve => setTimeout(() => resolve(`Completing ${i}`), 100 * i));

asyncSeriesExecuter([asyncTask(3), asyncTask(1), asyncTask(2)]);
// Logs (in order):
// "Completing 3"   ← 300ms
// "Completing 1"   ← 100ms after that
// "Completing 2"   ← 200ms after that
```

Compare to `Promise.all` which would log: `1`, `2`, `3` (by time).

---

## Approaches

### 1. async/await + for…of

```js
const asyncSeriesExecuter = async function (promises) {
  for (let promise of promises) {
    try {
      const result = await promise();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
};
```

`for…of` with `await` naturally blocks each iteration until the current promise settles.

---

### 2. Recursion

```js
const asyncSeriesExecuter = function (promises) {
  const promise = promises.shift();
  promise().then((data) => {
    console.log(data);
    if (promises.length > 0) asyncSeriesExecuter(promises);
  });
};
```

Mutates the input array — call `.slice()` first if you need to preserve it.

---

### 3. Array.reduce()

```js
const asyncSeriesExecuter = function (promises) {
  promises.reduce((acc, curr) => {
    return acc.then(() => curr().then(val => console.log(val)));
  }, Promise.resolve());
};
```

Chains each task onto the settled promise of the previous one.

---

### 4. Callback-based tasks (unwrapped)

If the tasks use callbacks instead of promises:

```js
const asyncSeriesExecuter = function (tasks) {
  tasks.reduce((acc, curr) => {
    return acc.then(() =>
      new Promise((resolve) => {
        curr(val => { console.log(val); resolve(); });
      })
    );
  }, Promise.resolve());
};
```

---

## Key Insight

The difference between series and parallel:

| Approach | How |
|---|---|
| `Promise.all(tasks.map(t => t()))` | Fires all at once — parallel |
| `for…of` with `await` | Awaits each before calling next — series |
| `reduce` chaining | Same effect via promise chaining |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — each task runs sequentially |
| Space | O(1) extra (beyond the promise chain itself) |
