// Execute Promises with Priority
// Run all promises in parallel; resolve with the value of the highest-priority (lowest number) resolved promise.
// If all reject, reject with a custom error.

function resolvePromisesWithPriority(promises) {
  // TODO
  promises.sort((a, b) => a.priority - b.priority);
  let rejected = {};
  let accepted = {};
  let mostPriorityIndex = 0;
  let taskCompleted = 0;
  return new Promise((resolve, reject) => {
    promises.forEach(({ task, priority }, i) => {
      task()
        .then((value) => (accepted[i] = value))
        .catch((err) => {
          rejected[i] = true;
          if (i == mostPriorityIndex) {
            mostPriorityIndex++;
          }
        })
        .finally(() => {
          if (!rejected[mostPriorityIndex] && accepted[mostPriorityIndex]) {
            resolve(accepted[mostPriorityIndex]);
          } else if (rejected[mostPriorityIndex]) {
            mostPriorityIndex++;
          }
          taskCompleted++;
          if (taskCompleted === promises.length) {
            reject(new Error("All Apis Failed"));
          }
        });
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

const task =
  (value, shouldResolve, delay = 50) =>
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => (shouldResolve ? resolve(value) : reject(value)), delay),
    );

const allTests = [];

// TC1 — highest-priority (priority=1) rejects; next (priority=2) resolves → returns its value
allTests.push(
  resolvePromisesWithPriority([
    { task: task("p1-val", false), priority: 1 },
    { task: task("p2-val", true), priority: 2 },
    { task: task("p3-val", true), priority: 3 },
  ])
    .then((val) =>
      test("TC1: falls back to next priority on reject", val, "p2-val"),
    )
    .catch(() =>
      test("TC1: falls back to next priority on reject", false, true),
    ),
);

// TC2 — all resolve → returns value of lowest priority number (highest priority)
allTests.push(
  resolvePromisesWithPriority([
    { task: task("p3-val", true), priority: 3 },
    { task: task("p1-val", true), priority: 1 },
    { task: task("p2-val", true), priority: 2 },
  ])
    .then((val) =>
      test("TC2: all resolve — returns highest-priority value", val, "p1-val"),
    )
    .catch(() =>
      test("TC2: all resolve — returns highest-priority value", false, true),
    ),
);

// TC3 — all reject → rejects with error
allTests.push(
  resolvePromisesWithPriority([
    { task: task("err1", false), priority: 1 },
    { task: task("err2", false), priority: 2 },
  ])
    .then(() => test("TC3: all reject — should reject", false, true))
    .catch((err) =>
      test("TC3: all reject — rejects with error", err instanceof Error, true),
    ),
);

// TC4 — single task resolves
allTests.push(
  resolvePromisesWithPriority([{ task: task("only", true), priority: 1 }])
    .then((val) => test("TC4: single resolve", val, "only"))
    .catch(() => test("TC4: single resolve", false, true)),
);

// TC5 — single task rejects
allTests.push(
  resolvePromisesWithPriority([{ task: task("fail", false), priority: 1 }])
    .then(() => test("TC5: single reject — should reject", false, true))
    .catch((err) =>
      test(
        "TC5: single reject — rejects with error",
        err instanceof Error,
        true,
      ),
    ),
);

// TC6 — lower-priority task resolves faster (parallel execution), but higher-priority reject → uses next
allTests.push(
  resolvePromisesWithPriority([
    { task: task("p1-slow", false, 200), priority: 1 },
    { task: task("p2-fast", true, 50), priority: 2 },
  ])
    .then((val) =>
      test(
        "TC6: resolves faster lower-priority when higher rejects",
        val,
        "p2-fast",
      ),
    )
    .catch(() =>
      test(
        "TC6: resolves faster lower-priority when higher rejects",
        false,
        true,
      ),
    ),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
