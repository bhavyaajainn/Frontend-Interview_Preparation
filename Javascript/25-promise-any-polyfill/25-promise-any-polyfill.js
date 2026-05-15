// Promise.any() polyfill
// Resolves with the FIRST fulfilled promise; rejects with all errors if ALL reject

const any = function (promisesArray) {
  // TODO
  const promiseErrors = new Array(promisesArray.length);
  let counter = 0;
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          promiseErrors[index] = error;
          counter++;
          if (counter == promisesArray.length) {
            reject(promiseErrors);
          }
        });
    });
  });
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

// Test 1 — first fulfilled wins even if others reject earlier
allTests.push(
  Promise.resolve()
    .then(() =>
      any([
        new Promise((_, reject) => setTimeout(reject, 100, "one")),
        new Promise((resolve) => setTimeout(resolve, 200, "two")),
        new Promise((_, reject) => setTimeout(reject, 50, "three")),
      ]),
    )
    .then((value) => test("TC1: first fulfilled wins", value, "two"))
    .catch((err) =>
      test("TC1: first fulfilled wins - unexpected reject", err, null),
    ),
);

// Test 2 — all reject: rejects with array of all errors (in input order)
allTests.push(
  Promise.resolve()
    .then(() =>
      any([
        new Promise((_, reject) => setTimeout(reject, 200, "one")),
        new Promise((_, reject) => setTimeout(reject, 300, "two")),
        new Promise((_, reject) => setTimeout(reject, 100, "three")),
      ]),
    )
    .then((value) => test("TC2: all reject - unexpected resolve", value, null))
    .catch((err) =>
      test("TC2: all reject - errors in input order", err, [
        "one",
        "two",
        "three",
      ]),
    ),
);

// Test 3 — single resolving promise
allTests.push(
  Promise.resolve()
    .then(() =>
      any([new Promise((resolve) => setTimeout(resolve, 50, "only"))]),
    )
    .then((value) => test("TC3: single resolve", value, "only"))
    .catch(() => test("TC3: single resolve - unexpected reject", false, true)),
);

Promise.all(allTests).then(() => console.log("\nAll async tests done"));
