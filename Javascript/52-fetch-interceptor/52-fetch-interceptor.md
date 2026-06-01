# Fetch Request and Response Interceptor

## Problem Statement

Override the global `fetch` so that every request passes through a **request interceptor** (runs before the call) and every response passes through a **response interceptor** (runs after the call).

```js
window.requestInterceptor = (args) => {
  args[0] = args[0] + '?v=2';   // mutate URL
  return args;
};

window.responseInterceptor = (response) => {
  return response.json();        // auto-parse JSON
};

fetch('https://api.example.com/data')
  .then(json => console.log(json));  // already parsed
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Save original `fetch` | Store `window.fetch` before overriding — needed to make the actual network call |
| Spread args | Override with `async (...args)` to forward any number of arguments to original fetch |
| Request interceptor | Receives the args array, can mutate URL/headers/options, must return args |
| Response interceptor | Receives the raw `Response` object, can transform it (e.g. `response.json()`), must return a value |
| Chain integrity | The return value of `responseInterceptor` becomes the resolution value of the patched `fetch` |
| Abstraction note | Prefer a custom wrapper object over mutating `window.fetch` directly in production |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(1) overhead per call (interceptors are synchronous wrappers) |
| Space | O(1) |
