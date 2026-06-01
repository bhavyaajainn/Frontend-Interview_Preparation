// Implement Map Data Structure with Event Listener
//
// StoreData class:
//   add(key, value)          — store value; if key existed and value changed, fire listeners
//   has(key)                 — return boolean
//   on(event, callback)      — register listener; event is either "key" or "change:key"
//   trigger(key, old, new)   — internal: invoke all matching listeners for both formats

class StoreData {
  constructor() {
    // TODO: this.data = {}
    // TODO: this.listeners = {}
    this.data = {};
    this.listeners = {};
  }

  add(key, value) {
    // TODO: capture oldValue = this.data[key]; hasOldValue = key in this.data
    // TODO: set this.data[key] = value
    // TODO: if hasOldValue && oldValue !== value → this.trigger(key, oldValue, value)
    const oldValue = this.data[key];
    const hasOldValue = key in this.data;
    this.data[key] = value;
    if (hasOldValue && oldValue != value) {
      this.trigger(key, oldValue, value);
    }
  }

  has(key) {
    // TODO: return key in this.data
    return key in this.data;
  }

  on(event, callback) {
    // TODO: if listeners[event] doesn't exist, init as []
    // TODO: push callback
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  trigger(key, oldValue, newValue) {
    // TODO: invoke all callbacks in listeners[`change:${key}`] with (oldValue, newValue, key)
    // TODO: invoke all callbacks in listeners[key] with (oldValue, newValue, key)
    const changeEvent = `change:${key}`;
    if (this.listeners[changeEvent]) {
      this.listeners[changeEvent].forEach((cb) => cb(oldValue, newValue, key));
    }
    if (this.listeners[key]) {
      this.listeners[key].forEach((cb) => cb(oldValue, newValue, key));
    }
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// ── has() ────────────────────────────────────────────────────────────────────

const store = new StoreData();
store.add("name", "joe");
store.add("age", 30);

test("TC1: has() returns true for existing key", store.has("age"), true);
test("TC2: has() returns false for missing key", store.has("animal"), false);

// ── add() updates value ───────────────────────────────────────────────────────

store.add("name", "emma");
test("TC3: add() overwrites existing value", store.has("name"), true);

// ── listener with 'change:key' format ────────────────────────────────────────

let changeLog = [];
store.on("change:name", (old, nw, k) => changeLog.push({ old, nw, k }));
store.add("name", "john");

test("TC4: change:key listener fires on value update", changeLog.length, 1);
test("TC5: old value passed correctly", changeLog[0].old, "emma");
test("TC6: new value passed correctly", changeLog[0].nw, "john");
test("TC7: key passed correctly to callback", changeLog[0].k, "name");

// ── no fire when value unchanged ─────────────────────────────────────────────

changeLog = [];
store.add("name", "john"); // same value
test(
  "TC8: listener does NOT fire when value is unchanged",
  changeLog.length,
  0,
);

// ── listener with 'key' shorthand format ──────────────────────────────────────

let ageLog = [];
store.on("age", (old, nw, k) => ageLog.push({ old, nw, k }));
store.add("age", 50);

test("TC9: key shorthand listener fires on value update", ageLog.length, 1);
test("TC10: old age value correct", ageLog[0].old, 30);
test("TC11: new age value correct", ageLog[0].nw, 50);

// ── multiple listeners on same key ────────────────────────────────────────────

let ageLog2 = [];
store.on("change:age", (old, nw, k) =>
  ageLog2.push(`${old > nw ? "older now" : "younger now"}`),
);
ageLog = [];
store.add("age", 28);

test(
  "TC12: change:age listener fires (age decreased)",
  ageLog2[0],
  "older now",
);
test(
  "TC13: key shorthand listener also fires (both registered)",
  ageLog.length,
  1,
);

// ── first add (no old value) does NOT trigger listeners ───────────────────────

let newKeyLog = [];
store.on("change:score", (old, nw) => newKeyLog.push(nw));
store.add("score", 100); // first insert — no old value
test("TC14: first add for a key does NOT fire listeners", newKeyLog.length, 0);

// ── subsequent update triggers listener ──────────────────────────────────────

store.add("score", 200);
test("TC15: update after first add fires listener", newKeyLog.length, 1);
test("TC16: new value passed correctly on second add", newKeyLog[0], 200);

// ── multiple listeners accumulate ────────────────────────────────────────────

const store2 = new StoreData();
store2.add("x", 1);
let calls = 0;
store2.on("x", () => calls++);
store2.on("x", () => calls++);
store2.add("x", 2);
test("TC17: multiple listeners on same event all fire", calls, 2);

console.log("\nAll tests done");
