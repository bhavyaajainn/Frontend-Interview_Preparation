// Polyfill for Array.filter
//
// Array.prototype.myFilter(callback) — returns a new array containing all
// elements for which callback returns truthy.
//
// callback(element, index, array) — same signature as native Array.filter
// The original array must NOT be mutated.

Array.prototype.myFilter = function (callback) {
  // TODO: create empty result array
  // TODO: iterate this with a for loop
  // TODO: call callback(this[i], i, this); if truthy → push this[i] to result
  // TODO: return result
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// TC1: basic even filter
test(
  "TC1: filters even numbers",
  [1, 2, 3, 4, 5, 6].myFilter((e) => e % 2 === 0),
  [2, 4, 6],
);

// TC2: all pass
test(
  "TC2: all elements pass the test",
  [1, 2, 3].myFilter(() => true),
  [1, 2, 3],
);

// TC3: none pass
test(
  "TC3: no elements pass the test",
  [1, 2, 3].myFilter(() => false),
  [],
);

// TC4: empty array
test(
  "TC4: empty array returns empty array",
  [].myFilter((e) => e > 0),
  [],
);

// TC5: callback receives correct index
const indices = [];
[10, 20, 30].myFilter((e, i) => {
  indices.push(i);
  return true;
});
test("TC5: callback receives correct indices", indices, [0, 1, 2]);

// TC6: callback receives original array reference
let receivedArray = null;
const src = [1, 2, 3];
src.myFilter((e, i, arr) => {
  receivedArray = arr;
  return true;
});
test("TC6: callback receives original array", receivedArray, src);

// TC7: original array not mutated
const original = [1, 2, 3, 4];
original.myFilter((e) => e > 2);
test("TC7: original array not mutated", original, [1, 2, 3, 4]);

// TC8: filters strings
test(
  "TC8: filters strings by length",
  ["a", "bb", "ccc", "d"].myFilter((s) => s.length > 1),
  ["bb", "ccc"],
);

// TC9: filters objects
test(
  "TC9: filters objects by property",
  [{ v: 1 }, { v: 2 }, { v: 3 }].myFilter((o) => o.v > 1),
  [{ v: 2 }, { v: 3 }],
);

// TC10: single element — passes
test(
  "TC10: single element passes",
  [5].myFilter((e) => e > 0),
  [5],
);

// TC11: single element — fails
test(
  "TC11: single element fails",
  [5].myFilter((e) => e > 10),
  [],
);

// TC12: returns a new array, not the original
const arr = [1, 2, 3];
const result = arr.myFilter(() => true);
test("TC12: returns a new array (not same reference)", result === arr, false);

// TC13: parity with native Array.filter
const native = [1, 2, 3, 4, 5].filter((e) => e % 2 !== 0);
const custom = [1, 2, 3, 4, 5].myFilter((e) => e % 2 !== 0);
test("TC13: result matches native Array.filter", custom, native);

console.log("\nAll tests done");
