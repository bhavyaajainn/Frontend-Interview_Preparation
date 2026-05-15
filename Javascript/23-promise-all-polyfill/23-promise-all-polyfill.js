// Promise.all() polyfill
// Asked in Thoughtspot and MakeMyTrip frontend interviews

function myPromiseAll(taskList) {
  // TODO
  const results = [];
  let tracker = 0;
  return new Promise((resolve, reject) => {
    if (taskList.length === 0) return resolve([]);
    taskList.forEach((task, index) => {
      Promise.resolve(task)
        .then((res) => {
          results[index] = res;
          tracker += 1;
          if (tracker == taskList.length) {
            resolve(results);
          }
        })
        .catch((error) => reject(error));
    });
  });
}

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

function task(time) {
  return new Promise((resolve) => setTimeout(() => resolve(time), time));
}

function taskWithReject(time) {
  return new Promise((resolve, reject) =>
    setTimeout(() => (time < 300 ? reject("Rejected") : resolve(time)), time),
  );
}

const allTests = [];

// Test 1 — all resolve: results preserve input order
allTests.push(
  Promise.resolve()
    .then(() => myPromiseAll([task(100), task(300), task(200)]))
    .then((results) =>
      test("TC1: all resolve - results in order", results, [100, 300, 200]),
    )
    .catch(() => test("TC1: all resolve - should not reject", false, true)),
);

// Test 2 — one rejects: whole promise rejects immediately
allTests.push(
  Promise.resolve()
    .then(() =>
      myPromiseAll([
        taskWithReject(100),
        taskWithReject(400),
        taskWithReject(300),
      ]),
    )
    .then(() => test("TC2: one rejects - should not resolve", false, true))
    .catch((err) => test("TC2: one rejects - caught error", err, "Rejected")),
);

// Test 3 — empty array resolves to []
allTests.push(
  Promise.resolve()
    .then(() => myPromiseAll([]))
    .then((results) => test("TC3: empty array resolves to []", results, []))
    .catch(() => test("TC3: empty array - should not reject", false, true)),
);

// Test 4 — non-promise values are wrapped
allTests.push(
  Promise.resolve()
    .then(() => myPromiseAll([1, task(100), "hello"]))
    .then((results) =>
      test("TC4: non-promise values included in results", results, [
        1,
        100,
        "hello",
      ]),
    )
    .catch(() =>
      test("TC4: non-promise values - should not reject", false, true),
    ),
);

Promise.all(allTests).then(() => console.log("\nAll async tests done"));
