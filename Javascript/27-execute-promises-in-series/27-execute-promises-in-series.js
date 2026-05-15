// Execute Promises in Series
// Executes an array of async functions one at a time; each starts only after the previous resolves

const asyncSeriesExecuter = async function (promises) {
  // TODO
  for (let promise of promises) {
    try {
      res = await promise();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
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

// TC1 — results arrive in input order, not by resolution time
// asyncTask(3) takes 300ms, asyncTask(1) takes 100ms — parallel would give [1,2,3], series gives [3,1,2]
const order1 = [];
const tasks1 = [
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        order1.push(3);
        resolve(3);
      }, 300),
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        order1.push(1);
        resolve(1);
      }, 100),
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        order1.push(2);
        resolve(2);
      }, 200),
    ),
];
allTests.push(
  Promise.resolve(asyncSeriesExecuter(tasks1)).then(() =>
    test("TC1: executes in input order, not by time", order1, [3, 1, 2]),
  ),
);

// TC2 — all tasks complete and none is skipped
const completed2 = [];
const tasks2 = [1, 2, 3].map(
  (i) => () =>
    new Promise((resolve) =>
      setTimeout(() => {
        completed2.push(i);
        resolve(i);
      }, 50),
    ),
);
allTests.push(
  Promise.resolve(asyncSeriesExecuter(tasks2)).then(() =>
    test("TC2: all tasks complete", completed2.length, 3),
  ),
);

// TC3 — single task works
const log3 = [];
const tasks3 = [
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        log3.push(42);
        resolve(42);
      }, 50),
    ),
];
allTests.push(
  Promise.resolve(asyncSeriesExecuter(tasks3)).then(() =>
    test("TC3: single task executes", log3, [42]),
  ),
);

// TC4 — empty array completes without error
allTests.push(
  Promise.resolve(asyncSeriesExecuter([]))
    .then(() => test("TC4: empty array resolves without error", true, true))
    .catch(() => test("TC4: empty array resolves without error", false, true)),
);

// TC5 — strict serialization: next task must not start until previous resolves
// If parallel: total ~300ms. If series: total ~300+100 = 400ms. Check elapsed >= 400ms.
const start5 = Date.now();
const tasks5 = [
  () => new Promise((resolve) => setTimeout(resolve, 300)),
  () => new Promise((resolve) => setTimeout(resolve, 100)),
];
allTests.push(
  Promise.resolve(asyncSeriesExecuter(tasks5)).then(() => {
    const elapsed = Date.now() - start5;
    test(
      "TC5: tasks are strictly serialized (elapsed >= 400ms)",
      elapsed >= 400,
      true,
    );
  }),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
