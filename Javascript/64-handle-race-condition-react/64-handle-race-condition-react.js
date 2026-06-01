// Handle Race Condition in React
//
// Two approaches:
//   1. Flag — set a boolean in the effect, flip it in the cleanup; skip setState if flag is false
//   2. AbortController — pass signal to fetch; call abort() in cleanup; catch the abort error
//
// The React components themselves are in the .md file.
// The tests below isolate and verify the core logic of each approach in plain JS.

// ─── Approach 1: Flag ────────────────────────────────────────────────────────

const fetchWithFlag = (fetchFn, onResult) => {
  // TODO: declare `let active = true`
  // TODO: call fetchFn(), then in .then() only call onResult if active is still true
  // TODO: return a cleanup function that sets active = false
  let active = true;
  fetchFn().then((result) => {
    if (active) {
      onResult(result);
    }
  });
  return () => {
    active = false;
  };
};

// ─── Approach 2: AbortController ─────────────────────────────────────────────

const fetchWithAbort = (url, onResult, onError) => {
  // TODO: create new AbortController
  // TODO: call fetch(url, { signal: controller.signal })
  // TODO: on success call onResult; on error call onError (pass through abort errors too)
  // TODO: return a cleanup function that calls controller.abort()
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => onResult(data))
    .catch((err) => onError(err));

  return () => {
    controller.abort();
  };
};

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const delay = (ms, value) =>
  new Promise((res) => setTimeout(() => res(value), ms));

// --- Flag approach ---

// TC1: result is delivered when cleanup has NOT been called
async function flagTC1() {
  let received = null;
  const cleanup = fetchWithFlag(
    () => delay(10, "data"),
    (v) => (received = v),
  );
  await delay(30);
  test("FLAG TC1: result delivered when still active", received, "data");
}

// TC2: result is suppressed when cleanup IS called before the fetch resolves
async function flagTC2() {
  let received = null;
  const cleanup = fetchWithFlag(
    () => delay(50, "stale"),
    (v) => (received = v),
  );
  cleanup(); // simulate component unmount before fetch completes
  await delay(80);
  test(
    "FLAG TC2: result suppressed after cleanup (stale update blocked)",
    received,
    null,
  );
}

// TC3: two sequential fetches — only the second result should be applied
async function flagTC3() {
  let received = null;

  // first fetch (slow) — will be cleaned up
  const cleanup1 = fetchWithFlag(
    () => delay(60, "first"),
    (v) => (received = v),
  );
  cleanup1();

  // second fetch (fast) — should win
  fetchWithFlag(
    () => delay(10, "second"),
    (v) => (received = v),
  );

  await delay(100);
  test(
    "FLAG TC3: second fetch result wins after first is cleaned up",
    received,
    "second",
  );
}

// TC4: cleanup called after result already arrived — value is kept (no phantom clear)
async function flagTC4() {
  let received = null;
  const cleanup = fetchWithFlag(
    () => delay(10, "ok"),
    (v) => (received = v),
  );
  await delay(30); // let it settle
  cleanup(); // late cleanup — value already set
  test(
    "FLAG TC4: late cleanup does not erase already-set value",
    received,
    "ok",
  );
}

// --- AbortController approach ---

// TC5: abort signal is passed to fetch (we verify via a mock)
async function abortTC5() {
  let signalPassed = false;
  const origFetch = globalThis.fetch;
  globalThis.fetch = (url, opts) => {
    signalPassed = !!(opts && opts.signal);
    return Promise.resolve({ json: () => Promise.resolve({}) });
  };

  fetchWithAbort(
    "https://example.com",
    () => {},
    () => {},
  );
  await delay(20);
  globalThis.fetch = origFetch;
  test("ABORT TC5: AbortSignal is passed to fetch", signalPassed, true);
}

// TC6: cleanup calls abort() — verified by checking signal.aborted
async function abortTC6() {
  let capturedSignal = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = (url, opts) => {
    capturedSignal = opts && opts.signal;
    return new Promise(() => {}); // never resolves
  };

  const cleanup = fetchWithAbort(
    "https://example.com",
    () => {},
    () => {},
  );
  await delay(10);
  cleanup();
  globalThis.fetch = origFetch;
  test(
    "ABORT TC6: signal.aborted is true after cleanup",
    capturedSignal && capturedSignal.aborted,
    true,
  );
}

// TC7: result delivered when NOT aborted
async function abortTC7() {
  let received = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = (url, opts) =>
    Promise.resolve({ json: () => Promise.resolve({ title: "hello" }) });

  fetchWithAbort(
    "https://example.com",
    (v) => (received = v),
    () => {},
  );
  await delay(30);
  globalThis.fetch = origFetch;
  test(
    "ABORT TC7: result delivered when fetch completes normally",
    received !== null,
    true,
  );
}

// TC8: onError called when fetch is aborted
async function abortTC8() {
  let errorCalled = false;
  const origFetch = globalThis.fetch;
  globalThis.fetch = (url, opts) =>
    new Promise((_, reject) =>
      setTimeout(() => {
        const err = new DOMException("Aborted", "AbortError");
        reject(err);
      }, 20),
    );

  const cleanup = fetchWithAbort(
    "https://example.com",
    () => {},
    () => (errorCalled = true),
  );
  cleanup();
  await delay(40);
  globalThis.fetch = origFetch;
  test(
    "ABORT TC8: onError is called when request is aborted",
    errorCalled,
    true,
  );
}

(async () => {
  await flagTC1();
  await flagTC2();
  await flagTC3();
  await flagTC4();
  await abortTC5();
  await abortTC6();
  await abortTC7();
  await abortTC8();
  console.log("\nAll tests done");
})();
