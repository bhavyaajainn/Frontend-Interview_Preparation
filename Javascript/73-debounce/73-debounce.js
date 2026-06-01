// Implement Debouncing
//
// debounce(func, delay) — returns a debounced version of func.
//   The returned function delays invoking func until `delay` ms have elapsed
//   since the last time the debounced function was called.
//   If called again before the delay expires, the timer resets.
//
// func is called with the correct `this` context and all arguments.

const debounce = (func, delay) => {
  // TODO: declare timer variable (let timerId)
  // TODO: return function(...args) that:
  //         1. clears any pending timer
  //         2. sets a new timer: after `delay` ms call func.apply(this, args)
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
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
  // TC1: function is NOT called immediately
  let count = 0;
  const d1 = debounce(() => count++, 100);
  d1();
  test("TC1: not called immediately after invoke", count, 0);

  // TC2: function IS called after the delay
  await tick(150);
  test("TC2: called once after delay elapses", count, 1);

  // TC3: rapid calls → only the last one fires
  count = 0;
  const d2 = debounce(() => count++, 100);
  d2();
  d2();
  d2();
  await tick(50);
  test("TC3: not called mid-rapid-fire", count, 0);
  await tick(100);
  test("TC4: called exactly once after rapid-fire settles", count, 1);

  // TC5: timer resets on each call
  count = 0;
  const d3 = debounce(() => count++, 100);
  d3();
  await tick(60); // not yet elapsed
  d3(); // reset timer
  await tick(60); // still within new delay
  test("TC5: timer resets — not called yet after second invoke", count, 0);
  await tick(60); // now elapsed
  test("TC6: called once after reset timer elapses", count, 1);

  // TC6: arguments are passed correctly to the original function
  let received = null;
  const d4 = debounce((a, b) => {
    received = a + b;
  }, 50);
  d4(3, 4);
  await tick(80);
  test("TC7: arguments forwarded correctly", received, 7);

  // TC7: `this` context is preserved
  const obj = {
    value: 42,
    getValue: debounce(function () {
      return this.value;
    }, 50),
  };
  let ctxResult = null;
  const d5 = debounce(function () {
    ctxResult = this.value;
  }, 50);
  d5.call({ value: 99 });
  await tick(80);
  test("TC8: this context preserved", ctxResult, 99);

  // TC8: independent debounced instances don't interfere
  let a = 0,
    b = 0;
  const dA = debounce(() => a++, 100);
  const dB = debounce(() => b++, 100);
  dA();
  dA();
  dB();
  await tick(150);
  test("TC9: two independent instances don't interfere (a=1)", a, 1);
  test("TC10: two independent instances don't interfere (b=1)", b, 1);

  // TC9: multiple separate invocations each fire after their own delay
  count = 0;
  const d6 = debounce(() => count++, 100);
  d6();
  await tick(150);
  d6();
  await tick(150);
  test("TC11: two separate invocations both fire", count, 2);

  console.log("\nAll tests done");
})();
