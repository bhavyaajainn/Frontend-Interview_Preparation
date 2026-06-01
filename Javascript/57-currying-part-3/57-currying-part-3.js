// Currying – Part 3
// add(...args) — infinite currying with valueOf override.
// Each call returns a new function that accumulates args.
// .value() or primitive coercion (+, ==) returns the sum.

function add(...x) {
  // TODO: store args in a sum array
  // TODO: define inner resultFn(...y) that merges y into sum and returns resultFn
  // TODO: override resultFn.valueOf to return sum.reduce(...)
  // TODO: set resultFn.value = resultFn.valueOf
  // TODO: return resultFn
  const sum = [...x];
  function resultFn(...y) {
    sum.push(...y);
    return resultFn;
  }
  resultFn.valueOf = () => sum.reduce((a, b) => a + b, 0);
  resultFn.value = resultFn.valueOf;
  return resultFn;
}

// --- Tests ---

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${expected}`);
    console.log(`  Got:      ${actual}`);
  }
}

// TC1: add(1)(2).value() = 3
test("TC1: add(1)(2).value()", add(1)(2).value(), 3);

// TC2: add(1, 2)(3).value() = 6
test("TC2: add(1,2)(3).value()", add(1, 2)(3).value(), 6);

// TC3: add(1)(2)(3).value() = 6
test("TC3: add(1)(2)(3).value()", add(1)(2)(3).value(), 6);

// TC4: primitive coercion via + operator
test("TC4: add(1)(2) + 3", add(1)(2) + 3, 6);

// TC5: single call
test("TC5: add(5).value()", add(5).value(), 5);

// TC6: all args in one call
test("TC6: add(1,2,3,4).value()", add(1, 2, 3, 4).value(), 10);

// TC7: deeply chained
test("TC7: add(1)(1)(1)(1)(1).value()", add(1)(1)(1)(1)(1).value(), 5);

// TC8: == coercion (valueOf called automatically)
test("TC8: add(3)(4) == 7", add(3)(4) == 7, true); // eslint-disable-line eqeqeq

// TC9: multiple args across calls
test("TC9: add(2,3)(4,5).value()", add(2, 3)(4, 5).value(), 14);

// TC10: zero value
test("TC10: add(0)(0).value()", add(0)(0).value(), 0);

console.log("\nAll tests done");
