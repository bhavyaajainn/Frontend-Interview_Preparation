// Promise.finally() polyfill
// Runs callback after promise settles (resolve OR reject); propagates original value/error

Promise.prototype.myFinally = function (callback) {
  // TODO
  if (typeof callback !== "function") {
    return this.then(callback, callback);
  }
  const P = this.constructor || Promise;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (error) =>
      P.resolve(callback()).then(() => {
        throw error;
      }),
  );
};

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const allTests = [];

// Test 1 — original resolve value propagates through myFinally
allTests.push(
  Promise.resolve(42)
    .myFinally(() => {})
    .then((val) => test("TC1: resolve value propagated", val, 42))
    .catch(() => test("TC1: resolve - unexpected reject", false, true)),
);

// Test 2 — original rejection propagates through myFinally
allTests.push(
  Promise.reject(99)
    .myFinally(() => {})
    .then(() => test("TC2: rejection - unexpected resolve", false, true))
    .catch((val) => test("TC2: rejection propagated", val, 99)),
);

// Test 3 — throw inside myFinally overrides original rejection
allTests.push(
  Promise.reject("original")
    .myFinally(() => {
      throw "from finally";
    })
    .then(() => test("TC3: finally throw - unexpected resolve", false, true))
    .catch((val) =>
      test("TC3: finally throw overrides rejection", val, "from finally"),
    ),
);

// Test 4 — callback runs on resolve (side effect check)
let ranOnResolve = false;
allTests.push(
  Promise.resolve("ok")
    .myFinally(() => {
      ranOnResolve = true;
    })
    .then(() => test("TC4: callback ran on resolve", ranOnResolve, true)),
);

// Test 5 — callback runs on reject (side effect check)
let ranOnReject = false;
allTests.push(
  Promise.reject("err")
    .myFinally(() => {
      ranOnReject = true;
    })
    .catch(() => test("TC5: callback ran on reject", ranOnReject, true)),
);

Promise.all(allTests).then(() => console.log("\nAll async tests done"));
