// Share Data Between Two Browser Windows
// Shared script loaded by both home.html and login.html.

let loginWindow;

// Called from home.html — opens login.html in a new tab
const openLogin = () => {
  // TODO: open login.html in a new tab, store the reference in loginWindow
  loginWindow = globalThis.open("login.html", "_blank");
};

// Called from home.html — sends a message to the login window
const sendMsgToLogin = () => {
  // TODO: use loginWindow.postMessage to send { login: 'Hello from Home' }
  // targetOrigin: '*' (dev only — use a specific origin in production)
  loginWindow.postMessage({ login: "Hello from Home" }, "*");
};

// Called from login.html — sends a message back to the opener, then closes itself
const sendMsgToHome = () => {
  // TODO: use window.opener.postMessage to send { home: 'Hello from Login' }
  // TODO: close this window after 2000 ms
  window.opener.postMessage({ home: "Hello from login" }, "*");
  setTimeout(() => {
    window.close();
  }, 2000);
};

// Listen for incoming messages on both windows
window.addEventListener("message", (event) => {
  // TODO: if event.data.home exists, log "Home page received a message" + event.data.home
  // TODO: if event.data.login exists, log "Login page received a message" + event.data.login
  if (event.data?.home) {
    console.log("Home page received a message", event.data?.home);
  }
  if (event.data?.login) {
    console.log("Login page received a message", event.data?.login);
  }
});
