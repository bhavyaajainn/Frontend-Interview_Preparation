// Memoize a Function
//
// memoize(fn) — returns a memoized version of fn.
//   On the first call with a given set of arguments, fn is executed and the
//   result is cached. Subsequent calls with the same arguments return the
//   cached value without re-executing fn.
//
// Key: JSON.stringify(arguments) — works for primitives and serialisable values.

const memoize = function (fn) {
  // TODO: create a cache object (or Map)
  // TODO: return function(...args) that:
  //         1. builds a cache key from the arguments (JSON.stringify)
  //         2. if key is in cache → return cached value
  //         3. else → call fn(...args), store result, return it
  const cache = {};
  return function () {
    const key = JSON.stringify(arguments);
    if (key in cache) {
      return cache[key];
    }
    const evaluateVal = fn(...arguments);
    cache[key] = evaluateVal;
    return evaluateVal;
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

// ── Correctness ───────────────────────────────────────────────────────────────

// TC1: basic single-arg function
const double = memoize((n) => n * 2);
test("TC1: returns correct value on first call", double(5), 10);
test("TC2: returns same value on second call", double(5), 10);

// TC2: multi-arg function
const add = memoize((a, b) => a + b);
test("TC3: multi-arg first call", add(3, 4), 7);
test("TC4: multi-arg cached call", add(3, 4), 7);
test("TC5: different args produce different result", add(1, 2), 3);

// TC3: fn is only called once for repeated input
let callCount = 0;
const tracked = memoize((n) => {
  callCount++;
  return n * n;
});
tracked(6);
tracked(6);
tracked(6);
test("TC6: underlying fn called only once for repeated input", callCount, 1);

// TC4: different args each invoke fn
callCount = 0;
const tracked2 = memoize((n) => {
  callCount++;
  return n;
});
tracked2(1);
tracked2(2);
tracked2(3);
test("TC7: fn called once per unique input", callCount, 3);

// TC5: works with string args
const greet = memoize((name) => `Hello, ${name}!`);
test("TC8: string argument", greet("Alice"), "Hello, Alice!");
test("TC9: string argument cached", greet("Alice"), "Hello, Alice!");

// TC6: works with object args (JSON.stringify key)
callCount = 0;
const objFn = memoize((obj) => {
  callCount++;
  return obj.x + obj.y;
});
objFn({ x: 1, y: 2 });
objFn({ x: 1, y: 2 });
test("TC10: object args — fn called once for same structure", callCount, 1);

// TC7: zero arguments
const noArgs = memoize(() => 42);
test("TC11: no-arg function returns correct value", noArgs(), 42);
callCount = 0;
const trackedNoArg = memoize(() => {
  callCount++;
  return 1;
});
trackedNoArg();
trackedNoArg();
test("TC12: no-arg function called only once", callCount, 1);

// TC8: caches falsy values correctly (0, false, "")
const returnsZero = memoize(() => 0);
returnsZero(); // caches 0
callCount = 0;
const trackFalsy = memoize((n) => {
  callCount++;
  return 0;
});
trackFalsy(1);
trackFalsy(1);
test("TC13: falsy return value (0) is cached, not recomputed", callCount, 1);

// TC9: each memoize() call has its own independent cache
callCount = 0;
const m1 = memoize((n) => {
  callCount++;
  return n;
});
const m2 = memoize((n) => {
  callCount++;
  return n;
});
m1(5);
m2(5);
test(
  "TC14: two memoized instances have independent caches (each called once)",
  callCount,
  2,
);

// TC10: factorial (recursive — wraps outer reference)
function factorial(n) {
  if (n <= 1) return 1;
  return factorial(n - 1) * n;
}
const memoFactorial = memoize(factorial);
test("TC15: factorial(5) = 120", memoFactorial(5), 120);
test("TC16: factorial(5) cached", memoFactorial(5), 120);

console.log("\nAll tests done");
