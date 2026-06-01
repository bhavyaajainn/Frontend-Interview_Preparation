// Fetch Request and Response Interceptor
// Override global fetch so every request goes through requestInterceptor
// and every response goes through responseInterceptor.

// TODO: store original fetch
// TODO: define window.requestInterceptor(args)  — mutate/return args
// TODO: define window.responseInterceptor(response) — transform/return response
// TODO: override window.fetch = async (...args) => { ... }

const originalFetch = globalThis.fetch;
globalThis.requestInterceptor = (args) => {
  return args;
};
globalThis.responseInterceptor = (args) => {
  return args;
};

globalThis.fetch = async (...args) => {
  args = globalThis.requestInterceptor(args);
  let response = await originalFetch(...args);
  response = globalThis.responseInterceptor(response);
  return response;
};

// --- Tests ---

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${expected}`);
    console.log(`  Got:      ${actual}`);
  }
}

// Mock original fetch — records what URL it was called with and returns a fake Response
function makeMockFetch(log) {
  return async (url, options) => {
    log.push({ url, options });
    return {
      _url: url,
      json: () => Promise.resolve({ url, parsed: true }),
      ok: true,
    };
  };
}

// Helper to reset interceptors to identity functions
function resetInterceptors() {
  globalThis.requestInterceptor = (args) => args;
  globalThis.responseInterceptor = (res) => res;
}

// --- Tests run sequentially to avoid race conditions on shared globalThis state ---
(async () => {

// --- TC1: request interceptor can mutate the URL ---
await (async () => {
  const log = [];
  const originalFetch = makeMockFetch(log);

  // TODO: after implementing, patch globalThis.fetch using originalFetch above
  // For now the test scaffolding patches it manually to verify interceptor wiring:
  globalThis.requestInterceptor = (args) => {
    args[0] = args[0] + "/modified";
    return args;
  };
  globalThis.responseInterceptor = (res) => res;

  globalThis.fetch = async (...args) => {
    args = globalThis.requestInterceptor(args);
    let response = await originalFetch(...args);
    response = globalThis.responseInterceptor(response);
    return response;
  };

  await globalThis.fetch("https://api.example.com/data");
  test(
    "TC1: request interceptor mutates URL",
    log[0].url,
    "https://api.example.com/data/modified",
  );
})();

// --- TC2: response interceptor transforms the response ---
await (async () => {
  const log = [];
  const originalFetch = makeMockFetch(log);

  globalThis.requestInterceptor = (args) => args;
  globalThis.responseInterceptor = (res) => res.json(); // auto-parse

  globalThis.fetch = async (...args) => {
    args = globalThis.requestInterceptor(args);
    let response = await originalFetch(...args);
    response = await globalThis.responseInterceptor(response);
    return response;
  };

  const result = await globalThis.fetch("https://api.example.com/todos");
  test("TC2: response interceptor parses JSON", result?.parsed, true);
})();

// --- TC3: identity interceptors pass values through unchanged ---
await (async () => {
  const log = [];
  const originalFetch = makeMockFetch(log);

  globalThis.requestInterceptor = (args) => args;
  globalThis.responseInterceptor = (res) => res;

  globalThis.fetch = async (...args) => {
    args = globalThis.requestInterceptor(args);
    let response = await originalFetch(...args);
    response = globalThis.responseInterceptor(response);
    return response;
  };

  await globalThis.fetch("https://api.example.com/items");
  test(
    "TC3: identity interceptors leave URL unchanged",
    log[0].url,
    "https://api.example.com/items",
  );
})();

// --- TC4: request interceptor receives the full args array (url + options) ---
await (async () => {
  const log = [];
  const originalFetch = makeMockFetch(log);
  let capturedArgs;

  globalThis.requestInterceptor = (args) => {
    capturedArgs = args;
    return args;
  };
  globalThis.responseInterceptor = (res) => res;

  globalThis.fetch = async (...args) => {
    args = globalThis.requestInterceptor(args);
    let response = await originalFetch(...args);
    response = globalThis.responseInterceptor(response);
    return response;
  };

  await globalThis.fetch("https://api.example.com/user", { method: "POST" });
  test(
    "TC4: interceptor receives options as second element",
    capturedArgs[1]?.method,
    "POST",
  );
})();

// --- TC5: request interceptor can add headers ---
await (async () => {
  const log = [];
  const originalFetch = makeMockFetch(log);

  globalThis.requestInterceptor = (args) => {
    args[1] = { ...args[1], headers: { Authorization: "Bearer token" } };
    return args;
  };
  globalThis.responseInterceptor = (res) => res;

  globalThis.fetch = async (...args) => {
    args = globalThis.requestInterceptor(args);
    let response = await originalFetch(...args);
    response = globalThis.responseInterceptor(response);
    return response;
  };

  await globalThis.fetch("https://api.example.com/secure");
  test(
    "TC5: request interceptor can inject Authorization header",
    log[0].options?.headers?.Authorization,
    "Bearer token",
  );
})();

console.log("\nAll tests done");
})();
