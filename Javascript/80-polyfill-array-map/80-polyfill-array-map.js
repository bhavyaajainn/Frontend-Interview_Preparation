// Polyfill for Array.map
//
// Array.prototype.myMap(callback) — returns a new array where each element is
// the result of calling callback on the corresponding element of the original.
//
// callback(element, index, array) — same signature as native Array.map
// The original array must NOT be mutated.
// The returned array has the same length as the original.

Array.prototype.myMap = function (callback) {
  // TODO: create result array of same length (or push to empty array)
  // TODO: iterate this with a for loop
  // TODO: call callback(this[i], i, this) and store at result[i]
  // TODO: return result
  const result = [];
  for (let i = 0; i < this.length; i++) {
    const ans = callback(this[i], i, this);
    result.push(ans);
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

// TC1: basic doubling
test(
  "TC1: doubles each element",
  [1, 2, 3].myMap((e) => e * 2),
  [2, 4, 6],
);

// TC2: string transformation
test(
  "TC2: transforms strings to uppercase",
  ["a", "b", "c"].myMap((s) => s.toUpperCase()),
  ["A", "B", "C"],
);

// TC3: returns new array of same length
test(
  "TC3: output has same length as input",
  [1, 2, 3, 4].myMap((e) => e),
  [1, 2, 3, 4],
);

// TC4: empty array
test(
  "TC4: empty array returns empty array",
  [].myMap((e) => e * 2),
  [],
);

// TC5: callback receives correct index
const indices = [];
[10, 20, 30].myMap((e, i) => {
  indices.push(i);
  return e;
});
test("TC5: callback receives correct indices", indices, [0, 1, 2]);

// TC6: callback receives original array reference
let receivedArray = null;
const src = [1, 2, 3];
src.myMap((e, i, arr) => {
  receivedArray = arr;
  return e;
});
test("TC6: callback receives original array reference", receivedArray, src);

// TC7: original array not mutated
const original = [1, 2, 3];
original.myMap((e) => e * 10);
test("TC7: original array not mutated", original, [1, 2, 3]);

// TC8: returns a new array (not the same reference)
const arr = [1, 2, 3];
const result = arr.myMap((e) => e);
test("TC8: returns a new array reference", result === arr, false);

// TC9: maps to objects
test(
  "TC9: maps numbers to objects",
  [1, 2, 3].myMap((e) => ({ value: e })),
  [{ value: 1 }, { value: 2 }, { value: 3 }],
);

// TC10: uses index in transformation
test(
  "TC10: uses index in transformation",
  ["a", "b", "c"].myMap((e, i) => `${i}:${e}`),
  ["0:a", "1:b", "2:c"],
);

// TC11: single element
test(
  "TC11: single element array",
  [5].myMap((e) => e + 1),
  [6],
);

// TC12: maps falsy values correctly
test(
  "TC12: maps 0 correctly (falsy value)",
  [0, 1, 2].myMap((e) => e * 3),
  [0, 3, 6],
);

// TC13: parity with native Array.map
const native = [1, 2, 3, 4].map((e) => e * e);
const custom = [1, 2, 3, 4].myMap((e) => e * e);
test("TC13: result matches native Array.map", custom, native);

console.log("\nAll tests done");
