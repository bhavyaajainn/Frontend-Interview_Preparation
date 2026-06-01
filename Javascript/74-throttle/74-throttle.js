// Implement Throttling
// throttle(func, limit) — returns a throttled version of func.
//   The first call fires immediately.
//   Subsequent calls within `limit` ms are queued; the last queued call fires
//   once the remaining time in the current window expires.
//   After that window, the next call fires immediately again.

const throttle = (func, limit) => {
  // TODO: declare lastFunc (pending timer) and lastRan (timestamp of last execution)
  // TODO: return function(...args) that:
  //         - if never ran: call func immediately, record lastRan = Date.now()
  //         - else: clearTimeout(lastFunc); set a new timeout for the remaining
  //           window (limit - (Date.now() - lastRan)); inside the timeout,
  //           if enough time has passed call func and update lastRan

  let lastFunc;
  let lastRun;

  return function () {
    const context = this;
    const args = arguments;

    if (!lastRun || Date.now() - lastRun >= limit) {
      func.apply(context, args);
      lastRun = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRun >= limit) {
            func.apply(context, args);
            lastRun = Date.now();
          }
        },
        limit - (Date.now() - lastRun),
      );
    }
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
  // TC1: first call fires immediately
  let count = 0;
  const t1 = throttle(() => count++, 200);
  t1();
  test("TC1: first call fires immediately", count, 1);

  // TC2: second call within limit does NOT fire immediately
  t1();
  test("TC2: second call within limit does not fire immediately", count, 1);

  // TC3: after limit elapses, queued call fires
  await tick(250);
  test("TC3: queued call fires after limit window", count, 2);

  // TC4: rapid calls during window → only one extra fires at the end
  count = 0;
  const t2 = throttle(() => count++, 200);
  t2(); // fires immediately → count = 1
  await tick(50);
  t2(); // queued
  await tick(50);
  t2(); // replaces queued (last wins)
  await tick(50);
  t2(); // replaces queued
  test("TC4: count is 1 immediately during rapid calls", count, 1);
  await tick(200);
  test("TC5: exactly one additional call fires after rapid burst", count, 2);

  // TC5: after window resets, next call fires immediately again
  count = 0;
  const t3 = throttle(() => count++, 100);
  t3(); // fires → count = 1
  await tick(150); // window fully elapsed
  t3(); // fires immediately → count = 2
  test("TC6: call after full window fires immediately", count, 2);

  // TC6: arguments forwarded correctly
  let received = null;
  const t4 = throttle((a, b) => {
    received = a + b;
  }, 100);
  t4(3, 4);
  test("TC7: arguments forwarded on first call", received, 7);

  // TC7: this context preserved
  let ctxResult = null;
  const t5 = throttle(function () {
    ctxResult = this.value;
  }, 100);
  t5.call({ value: 55 });
  test("TC8: this context preserved", ctxResult, 55);

  // TC8: independent instances don't interfere
  let a = 0,
    b = 0;
  const tA = throttle(() => a++, 100);
  const tB = throttle(() => b++, 100);
  tA();
  tA();
  tB();
  test("TC9: independent instances: tA fires immediately", a, 1);
  test("TC10: independent instances: tB fires immediately", b, 1);
  await tick(150);
  test("TC11: tA queued call fires, tB has no queued call", a, 2);
  test("TC12: tB no extra fire (only one call was made)", b, 1);

  console.log("\nAll tests done");
})();
