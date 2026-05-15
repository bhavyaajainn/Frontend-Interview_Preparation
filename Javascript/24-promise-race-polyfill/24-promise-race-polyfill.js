// Promise.race() polyfill
// Resolves/rejects as soon as the FIRST promise in the array settles

const race = function (promisesArray) {
  // TODO
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject).catch(reject);
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

// Test 1 — fastest resolve wins
allTests.push(
  Promise.resolve()
    .then(() =>
      race([
        new Promise((resolve) => setTimeout(resolve, 500, "one")),
        new Promise((resolve) => setTimeout(resolve, 100, "two")),
        new Promise((_, reject) => setTimeout(reject, 200, "three")),
      ]),
    )
    .then((value) => test("TC1: fastest resolve wins", value, "two"))
    .catch((err) =>
      test("TC1: fastest resolve wins - unexpected reject", err, null),
    ),
);

// Test 2 — fastest reject wins
allTests.push(
  Promise.resolve()
    .then(() =>
      race([
        new Promise((resolve) => setTimeout(resolve, 500, "one")),
        new Promise((resolve) => setTimeout(resolve, 100, "two")),
        new Promise((_, reject) => setTimeout(reject, 40, "three")),
      ]),
    )
    .then((value) =>
      test("TC2: fastest reject wins - unexpected resolve", value, null),
    )
    .catch((err) => test("TC2: fastest reject wins", err, "three")),
);

// Test 3 — single promise resolves
allTests.push(
  Promise.resolve()
    .then(() =>
      race([new Promise((resolve) => setTimeout(resolve, 50, "only"))]),
    )
    .then((value) => test("TC3: single promise resolves", value, "only"))
    .catch(() => test("TC3: single promise - unexpected reject", false, true)),
);

Promise.all(allTests).then(() => console.log("\nAll async tests done"));
