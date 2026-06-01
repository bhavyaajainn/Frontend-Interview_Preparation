# Share Data Between Two Browser Windows

## Problem Statement

Implement cross-window communication between `home.html` and `login.html` (same origin) using `postMessage`:

1. `home.html` opens `login.html` in a new tab and can send messages to it.
2. `login.html` sends a message back to its opener on submit, then closes itself after 2 seconds.
3. Both pages listen for incoming messages via the `"message"` event.

```js
// home → login
loginWindow.postMessage({ login: 'Hello from Home' }, '*');

// login → home (opener)
window.opener.postMessage({ home: 'Hello from Login' }, '*');
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| `window.open()` | Opens a new tab/window; returns a reference used to send messages to it |
| `window.opener` | Reference from the child window back to the parent that opened it |
| `postMessage(data, targetOrigin)` | Sends a structured-clone-able message; use `'*'` in dev, a specific origin in production |
| `"message"` event | Fires on any window that receives a `postMessage`; `event.data` holds the payload |
| Target origin security | Always validate `event.origin` in production to prevent cross-origin data leaks |
| `window.close()` | Child window closes itself; only works if the window was opened by script |

---

## How to Test

1. Serve the folder with a local server (e.g. `npx serve .` or VS Code Live Server).
2. Open `home.html` in a browser.
3. Click **Open Login** — a new tab opens with `login.html`.
4. In `home.html` click **Send message to Login** — check the login tab's console.
5. In `login.html` click **Submit** — check the home tab's console; login tab closes after 2 s.
