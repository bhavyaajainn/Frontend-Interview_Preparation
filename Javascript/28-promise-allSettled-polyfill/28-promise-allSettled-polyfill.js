// Promise.allSettled() Polyfill
// Waits for ALL promises to settle (resolve or reject) and returns an array of outcome objects

const allSettled = function (promises) {
  // TODO
  const mappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ status: "fulfilled", value: val }),
      (error) => ({ status: "rejected", reason: error }),
    ),
  );
  return Promise.all(mappedPromises);
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

// TC1 — mix of resolved and rejected promises
allTests.push(
  Promise.resolve(
    allSettled([Promise.resolve(3), Promise.reject(9), Promise.resolve(5)]),
  ).then((result) => {
    test("TC1: mix of resolve and reject", result, [
      { status: "fulfilled", value: 3 },
      { status: "rejected", reason: 9 },
      { status: "fulfilled", value: 5 },
    ]);
  }),
);

// TC2 — all resolved
allTests.push(
  Promise.resolve(allSettled([Promise.resolve(1), Promise.resolve(2)])).then(
    (result) => {
      test("TC2: all resolved", result, [
        { status: "fulfilled", value: 1 },
        { status: "fulfilled", value: 2 },
      ]);
    },
  ),
);

// TC3 — all rejected
allTests.push(
  Promise.resolve(
    allSettled([Promise.reject("err1"), Promise.reject("err2")]),
  ).then((result) => {
    test("TC3: all rejected", result, [
      { status: "rejected", reason: "err1" },
      { status: "rejected", reason: "err2" },
    ]);
  }),
);

// TC4 — empty array resolves to empty array
allTests.push(
  Promise.resolve(allSettled([]))
    .then((result) => {
      test("TC4: empty array resolves to []", result, []);
    })
    .catch(() => test("TC4: empty array resolves to []", false, true)),
);

// TC5 — order is preserved regardless of resolution time
allTests.push(
  Promise.resolve(
    allSettled([
      new Promise((resolve) => setTimeout(() => resolve("slow"), 200)),
      Promise.resolve("fast"),
      Promise.reject("rejected"),
    ]),
  ).then((result) => {
    test("TC5: result order matches input order", result, [
      { status: "fulfilled", value: "slow" },
      { status: "fulfilled", value: "fast" },
      { status: "rejected", reason: "rejected" },
    ]);
  }),
);

// TC6 — non-promise values are treated as resolved
allTests.push(
  Promise.resolve(allSettled([42, "hello"])).then((result) => {
    test("TC6: non-promise values treated as resolved", result, [
      { status: "fulfilled", value: 42 },
      { status: "fulfilled", value: "hello" },
    ]);
  }),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
