// Create a Throttle Function with Trailing and Leading Options
// Implement throttle(fn, wait, option) where option = { leading, trailing }

const throttle = (fn, wait, option = { leading: true, trailing: false }) => {
  let lastCallTime = null;
  let lastArgs = null;
  let timer = null;

  return function (...args) {
    const now = Date.now();
    const isFirstCall = lastCallTime === null;
    const coolDownOver = !isFirstCall && now - lastCallTime >= wait;
    lastArgs = args;
    if (isFirstCall || coolDownOver) {
      if (option.leading) {
        lastCallTime = now;
        fn(...args);
      } else {
        lastCallTime = now;
        timer = setTimeout(() => {
          fn(...args);
          lastCallTime = null;
          timer = null;
        }, wait);
      }
    } else {
      if (option.trailing) {
        clearTimeout(timer);
        const remaining = wait - (now - lastCallTime);
        timer = setTimeout(() => {
          fn(...lastArgs);
          lastCallTime = null;
          timer = null;
        }, remaining);
      }
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

const WAIT = 100; // ms — short enough for fast test runs
const allTests = [];

// TC1 — leading: fn fires immediately on first call
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push(Date.now());
    const t = throttle(fn, WAIT, { leading: true, trailing: false });
    t(); // should fire immediately
    setTimeout(() => {
      test("TC1: leading fires on first call", log.length >= 1, true);
      resolve();
    }, 10);
  }),
);

// TC2 — leading: calls during cooldown are suppressed
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push("call");
    const t = throttle(fn, WAIT, { leading: true, trailing: false });
    t();
    t();
    t(); // only first should fire; rest suppressed during cooldown
    setTimeout(() => {
      test("TC2: leading suppresses calls during cooldown", log.length, 1);
      resolve();
    }, 10);
  }),
);

// TC3 — leading: fires again after cooldown expires
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push("call");
    const t = throttle(fn, WAIT, { leading: true, trailing: false });
    t(); // fires immediately
    setTimeout(() => t(), WAIT + 20); // fires again after cooldown
    setTimeout(() => {
      test("TC3: leading fires again after cooldown", log.length, 2);
      resolve();
    }, WAIT + 50);
  }),
);

// TC4 — trailing: fn does NOT fire immediately on first call
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push("call");
    const t = throttle(fn, WAIT, { leading: false, trailing: true });
    t();
    setTimeout(() => {
      test("TC4: trailing does not fire immediately", log.length, 0);
      resolve();
    }, 10);
  }),
);

// TC5 — trailing: fn fires after wait even if called only once
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push("call");
    const t = throttle(fn, WAIT, { leading: false, trailing: true });
    t();
    setTimeout(() => {
      test("TC5: trailing fires after wait", log.length, 1);
      resolve();
    }, WAIT + 50);
  }),
);

// TC6 — trailing: multiple calls during window → only one trailing invocation
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push("call");
    const t = throttle(fn, WAIT, { leading: false, trailing: true });
    t();
    t();
    t(); // spam calls
    setTimeout(() => {
      test("TC6: trailing collapses multiple calls to one", log.length, 1);
      resolve();
    }, WAIT + 50);
  }),
);

// TC7 — both leading + trailing: fires immediately AND once after last call in window
allTests.push(
  new Promise((resolve) => {
    const log = [];
    const fn = () => log.push("call");
    const t = throttle(fn, WAIT, { leading: true, trailing: true });
    t();
    t();
    t(); // leading fires first, trailing fires once after
    setTimeout(() => {
      test(
        "TC7: leading+trailing fires at start and end of burst",
        log.length,
        2,
      );
      resolve();
    }, WAIT + 50);
  }),
);

// TC8 — arguments are forwarded correctly
allTests.push(
  new Promise((resolve) => {
    let received;
    const fn = (a, b) => {
      received = [a, b];
    };
    const t = throttle(fn, WAIT, { leading: true, trailing: false });
    t(1, 2);
    setTimeout(() => {
      test("TC8: arguments forwarded correctly", received, [1, 2]);
      resolve();
    }, 10);
  }),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
