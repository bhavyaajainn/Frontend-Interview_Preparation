// Implement clearAllTimeout
// Asked in Meta's frontend interview

// --- Approach 1: Override window.setTimeout (browser only) ---

// window.timeoutIds = [];
// const originalTimeoutFn = window.setTimeout;
//
// window.setTimeout = function (fn, delay) {
//   // TODO
// };
//
// window.clearAllTimeout = function () {
//   // TODO
// };

// --- Approach 2: Encapsulated in an object (avoids global pollution) ---

const MY_TIMERS = {
  timeoutIds: [],

  setTimeout: function (fn, delay) {
    // TODO
    let id = setTimeout(fn, delay);
    this.timeoutIds.push(id);
    return id;
  },

  clearAllTimeout: function () {
    // TODO
    while (this.timeoutIds.length) {
      clearTimeout(this.timeoutIds.pop());
    }
  },
};

// --- Tests ---

let passed = 0,
  failed = 0;
function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
  ok ? passed++ : failed++;
}

// Test 1 — setTimeout registers IDs
MY_TIMERS.setTimeout(() => {}, 1000);
MY_TIMERS.setTimeout(() => {}, 2000);
MY_TIMERS.setTimeout(() => {}, 3000);
test("TC1: 3 IDs registered", MY_TIMERS.timeoutIds.length, 3);

// Test 2 — clearAllTimeout empties the ID list
MY_TIMERS.clearAllTimeout();
test(
  "TC2: timeoutIds cleared after clearAllTimeout",
  MY_TIMERS.timeoutIds.length,
  0,
);

// Test 3 — timer does not fire after clearAllTimeout
let fired = false;
MY_TIMERS.setTimeout(() => {
  fired = true;
}, 100);
MY_TIMERS.clearAllTimeout();
setTimeout(() => {
  test("TC3: timer does not fire after clearAllTimeout", fired, false);
  console.log(`\n${passed} passed, ${failed} failed (sync); TC3 is async`);
}, 300);

console.log(`\n${passed} passed, ${failed} failed (sync tests only)`);
