# Handle Race Condition in React

## Problem Statement

A **race condition** occurs when multiple async operations (e.g., rapid prop changes triggering `useEffect`) can resolve out of order, causing stale data to overwrite fresh data in state.

Fix the component below using **both** approaches:

```jsx
// Buggy — race condition possible
useEffect(() => {
  const fetchData = async () => {
    let resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${props.id}`);
    resp = await resp.json();
    setData(resp);          // could be stale if id changed before this resolved
  };
  fetchData();
}, [props.id]);
```

---

## Approach 1 — Boolean Flag

```jsx
useEffect(() => {
  let active = true;

  const fetchData = async () => {
    let resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${props.id}`);
    resp = await resp.json();
    if (active) setData(resp);   // only update if still relevant
  };

  fetchData();

  return () => { active = false; };   // cleanup flips the flag
}, [props.id]);
```

---

## Approach 2 — AbortController

```jsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      let resp = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${props.id}`,
        { signal: controller.signal }
      );
      resp = await resp.json();
      setData(resp);
    } catch (err) {
      // AbortError is expected on cleanup — handle or ignore
    }
  };

  fetchData();

  return () => { controller.abort(); };  // cancels in-flight request
}, [props.id]);
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `useEffect` cleanup | The function returned from `useEffect` runs before the next effect fires (on dep change) and on unmount — the correct place to cancel stale work |
| Flag approach | Works for **any** async operation (timeouts, custom promises, WebSockets) not just `fetch` |
| `AbortController` | Only works with `fetch`; the signal is forwarded to the network layer and the in-flight request is actually cancelled, saving bandwidth |
| Error handling | `fetch` with an aborted signal throws a `DOMException` with `name === 'AbortError'`; must be caught or it becomes an unhandled rejection |
| Strict Mode (React 18) | In dev, React intentionally mounts → unmounts → remounts to surface missing cleanups — both approaches handle this correctly |
| Flag vs Abort | Prefer `AbortController` for HTTP fetches (cancels the request); use flag for everything else |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Flag | O(1) — one boolean per effect instance |
| AbortController | O(1) — one controller per effect instance |
| Both | Zero overhead at runtime once the effect is cleaned up |
