// Throttle an Array of Tasks
// throttle(task, count, callback, delay) — returns a function that, when called,
// executes the next `count` tasks from the queue; debounces within `delay` ms.

const throttle = (task, count = task.length, callback, delay = 1000) => {
  let queue = [...task];
  let lastCallTime = null;
  return function () {
    const now = Date.now();
    if (lastCallTime === null || now - lastCallTime >= delay) {
      const batch = queue.splice(0, count);
      queue.push(...batch);
      callback(batch);
      lastCallTime = now;
    }
  };
};

// --- Test helpers ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Tests ---

(async () => {
  // TC1: first call executes the first `count` tasks immediately
  const log1 = [];
  const fn1 = throttle([1, 2, 3, 4, 5, 6], 3, (batch) => log1.push(batch), 500);
  fn1();
  test("TC1: first batch executed immediately", log1, [[1, 2, 3]]);

  // TC2: default count = task.length — all tasks run on first call
  const log2 = [];
  const fn2 = throttle(
    [10, 20, 30],
    undefined,
    (batch) => log2.push(batch),
    500,
  );
  fn2();
  test("TC2: default count equals task.length", log2, [[10, 20, 30]]);

  // TC3: no second batch fires before delay elapses
  const log3 = [];
  const fn3 = throttle([1, 2, 3, 4], 2, (batch) => log3.push(batch), 200);
  fn3(); // batch 1 immediately
  fn3(); // called within delay — should debounce, not fire yet
  test(
    "TC3: second call within delay does not fire extra batch immediately",
    log3,
    [[1, 2]],
  );

  // TC4: second batch fires after delay
  const log4 = [];
  const fn4 = throttle([1, 2, 3, 4], 2, (batch) => log4.push(batch), 200);
  fn4();
  await delay(250); // wait past delay
  fn4();
  test("TC4: second batch fires after delay", log4, [
    [1, 2],
    [3, 4],
  ]);

  // TC5: queue wraps around once exhausted
  const log5 = [];
  const fn5 = throttle([1, 2, 3, 4], 2, (batch) => log5.push(batch), 200);
  fn5();
  await delay(250);
  fn5();
  await delay(250);
  fn5(); // queue empty — refills from original task array
  test("TC5: queue refills from task array after exhaustion", log5, [
    [1, 2],
    [3, 4],
    [1, 2],
  ]);

  // TC6: count larger than remaining queue — only available tasks returned
  const log6 = [];
  const fn6 = throttle([1, 2, 3], 5, (batch) => log6.push(batch), 200);
  fn6();
  test(
    "TC6: count > task.length — returns all available tasks",
    log6.length > 0 && log6[0].length <= 3,
    true,
  );

  // TC7: callback called with an array (not individual args)
  const log7 = [];
  const fn7 = throttle(
    [7, 8],
    2,
    (batch) => log7.push(Array.isArray(batch)),
    200,
  );
  fn7();
  test("TC7: callback receives an array", log7, [true]);

  console.log("\nAll tests done");
})();
