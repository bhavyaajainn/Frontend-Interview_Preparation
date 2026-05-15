// Create a Basic Throttle Function
// throttle(fn, wait) — fn fires at most once per `wait` ms; leading call fires immediately

const throttle = (fn, wait) => {
  // TODO
  let lastCallTime = 0;
  return function (...args) {
    if (Date.now() - lastCallTime >= wait) {
      lastCallTime = Date.now();
      fn.apply(this, args);
    }
  };
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

const WAIT = 100;
const allTests = [];

// TC1 — fires immediately on first call
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const t = throttle(() => log.push("call"), WAIT);
    t();
    setTimeout(() => {
      test("TC1: fires immediately on first call", log.length, 1);
      resolve();
    }, 10);
  }),
);

// TC2 — calls during cooldown are suppressed
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const t = throttle(() => log.push("call"), WAIT);
    t();
    t();
    t();
    setTimeout(() => {
      test("TC2: suppresses calls during cooldown", log.length, 1);
      resolve();
    }, 10);
  }),
);

// TC3 — fires again after cooldown expires
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const t = throttle(() => log.push("call"), WAIT);
    t();
    setTimeout(() => t(), WAIT + 20);
    setTimeout(() => {
      test("TC3: fires again after cooldown", log.length, 2);
      resolve();
    }, WAIT + 50);
  }),
);

// TC4 — arguments are forwarded correctly
allTests.push(
  new Promise((resolve) => {
    let received;
    const t = throttle((a, b) => {
      received = [a, b];
    }, WAIT);
    t(3, 7);
    setTimeout(() => {
      test("TC4: arguments forwarded correctly", received, [3, 7]);
      resolve();
    }, 10);
  }),
);

// TC5 — rapid burst results in exactly one call
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const t = throttle(() => log.push("call"), WAIT);
    for (let i = 0; i < 10; i++) t();
    setTimeout(() => {
      test("TC5: rapid burst results in exactly one call", log.length, 1);
      resolve();
    }, 10);
  }),
);

// TC6 — two separate bursts each fire once
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const t = throttle(() => log.push("call"), WAIT);
    t();
    t(); // burst 1 — fires once immediately
    setTimeout(() => {
      t();
      t();
    }, WAIT + 20); // burst 2 — fires once after cooldown
    setTimeout(
      () => {
        test(
          "TC6: two bursts separated by cooldown each fire once",
          log.length,
          2,
        );
        resolve();
      },
      WAIT * 2 + 50,
    );
  }),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
