// Debouncing with Leading and Trailing Options
//
// debounce(fn, delay, options) — returns a debounced function with configurable edges:
//   options.leading  (default true)  — invoke immediately on the FIRST call
//   options.trailing (default true)  — invoke after `delay` ms of inactivity (last call)
//
// Behaviours:
//   { leading: true,  trailing: false } → fires on first call only; subsequent calls within delay ignored
//   { leading: false, trailing: true  } → classic debounce (fires after quiet period)
//   { leading: true,  trailing: true  } → fires immediately AND again after quiet period
//   { leading: false, trailing: false } → never fires (degenerate case)

const debounce = (fn, delay, options = { leading: true, trailing: true }) => {
  // TODO: declare timeout and isLeadingInvoked
  // TODO: return function(...args) that:
  //   1. if there's an existing timeout → clearTimeout
  //   2. if leading && no current timeout → call fn immediately, mark isLeadingInvoked=true
  //      else → isLeadingInvoked = false
  //   3. set timeout: after delay, if trailing && !isLeadingInvoked → call fn; then timeout=null
  let timeout;
  let isLeadingInvoked;

  return function (...args) {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }

    if (options.leading && !timeout) {
      fn.apply(context, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    timeout = setTimeout(() => {
      if (options.trailing && !isLeadingInvoked) {
        fn.apply(context, args);
      }
      timeout = null;
    }, delay);
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

const tick = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  // ── { leading: true, trailing: true } (default) ──────────────────────────

  let count = 0;
  const d1 = debounce(() => count++, 100, { leading: true, trailing: true });

  d1();
  test("LT TC1: leading=true fires immediately on first call", count, 1);

  d1();
  d1(); // within window — should not fire leading again
  await tick(50);
  test(
    "LT TC2: subsequent calls within delay don't fire leading again",
    count,
    1,
  );

  await tick(80); // delay elapsed after last call
  test("LT TC3: trailing fires once after quiet period", count, 2);

  // second burst — leading fires again (timeout was cleared after first burst)
  d1();
  test("LT TC4: leading fires again after full window reset", count, 3);
  await tick(150);
  test("LT TC5: trailing fires again after second burst", count, 4);

  // ── { leading: true, trailing: false } ───────────────────────────────────

  count = 0;
  const d2 = debounce(() => count++, 100, { leading: true, trailing: false });

  d2();
  test("LF TC1: leading-only fires immediately", count, 1);

  d2();
  d2();
  await tick(150);
  test("LF TC2: no trailing fire after quiet period", count, 1);

  // leading fires again on next call after window
  d2();
  test("LF TC3: leading fires again after window reset", count, 2);
  await tick(150);
  test("LF TC4: still no trailing fire", count, 2);

  // ── { leading: false, trailing: true } ───────────────────────────────────

  count = 0;
  const d3 = debounce(() => count++, 100, { leading: false, trailing: true });

  d3();
  test("TL TC1: trailing-only does NOT fire immediately", count, 0);

  d3();
  d3();
  await tick(150);
  test("TL TC2: fires exactly once after quiet period", count, 1);

  d3();
  await tick(50);
  test("TL TC3: not fired yet within delay", count, 1);
  await tick(80);
  test("TL TC4: fires after delay elapses", count, 2);

  // ── { leading: false, trailing: false } ──────────────────────────────────

  count = 0;
  const d4 = debounce(() => count++, 100, { leading: false, trailing: false });

  d4();
  d4();
  await tick(150);
  test("NONE TC1: never fires when both options false", count, 0);

  // ── argument forwarding ───────────────────────────────────────────────────

  let received = null;
  const d5 = debounce(
    (a, b) => {
      received = a + b;
    },
    50,
    { leading: true, trailing: false },
  );
  d5(10, 5);
  test("ARG TC1: arguments forwarded on leading call", received, 15);

  received = null;
  const d6 = debounce(
    (a, b) => {
      received = a + b;
    },
    50,
    { leading: false, trailing: true },
  );
  d6(3, 7);
  await tick(80);
  test("ARG TC2: arguments forwarded on trailing call", received, 10);

  console.log("\nAll tests done");
})();
