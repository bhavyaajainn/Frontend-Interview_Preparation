// Make High Priority API Call
//
// Demonstrate two techniques:
//   1. fetch with { priority: 'high' | 'low' | 'auto' }  (browser-only hint)
//   2. queueMicrotask — runs the callback before the next setTimeout fires
//
// TODO: fill in the blanks so the execution order matches the expected output.

// --- Technique 1: fetch priority (browser-only, no runnable test) ---
// TODO: write two fetch calls — one with default priority, one with priority: 'low'
// const loadMain         = () => fetch('/data');
// const loadSuggestions  = () => fetch('/suggestions', { priority: ??? });

// --- Technique 2: queueMicrotask execution order ---
// TODO: implement scheduleCalls() so that:
//   - regularCall  is scheduled via setTimeout(fn, 0)    ← macrotask
//   - urgentCall   is scheduled via queueMicrotask(fn)   ← microtask
//   and urgentCall executes BEFORE regularCall

function scheduleCalls(regularCall, urgentCall) {
  // TODO
  queueMicrotask(urgentCall);
  setTimeout(regularCall, 0);
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

// TC1: microtask fires before macrotask (setTimeout 0)
const order1 = [];
scheduleCalls(
  () => order1.push("regular"),
  () => order1.push("urgent"),
);
// After both fire, urgent must appear before regular
setTimeout(() => {
  test(
    "TC1: microtask (urgentCall) fires before macrotask (regularCall)",
    order1,
    ["urgent", "regular"],
  );
}, 50);

// TC2: synchronous code runs before both
const order2 = [];
order2.push("sync");
scheduleCalls(
  () => order2.push("regular"),
  () => order2.push("urgent"),
);
order2.push("sync-end");
setTimeout(() => {
  test("TC2: sync runs first, then microtask, then macrotask", order2, [
    "sync",
    "sync-end",
    "urgent",
    "regular",
  ]);
}, 50);

// TC3: multiple queueMicrotask calls drain in order before any setTimeout
const order3 = [];
scheduleCalls(
  () => order3.push("macro"),
  () => order3.push("micro-1"),
);
queueMicrotask(() => order3.push("micro-2"));
setTimeout(() => {
  test("TC3: all microtasks drain before macro", order3, [
    "micro-1",
    "micro-2",
    "macro",
  ]);
}, 50);

// TC4: urgentCall return value is not used (scheduleCalls returns undefined)
const result = scheduleCalls(
  () => {},
  () => {},
);
setTimeout(() => {
  test("TC4: scheduleCalls returns undefined", result, undefined);
}, 50);

setTimeout(() => console.log("\nAll tests done"), 100);
