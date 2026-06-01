// Filter Multidimensional Array
//
// Array.prototype.multiFilter(callback) — recursively filters a nested array.
//   - Sub-arrays are always included in the output (preserving structure).
//   - Leaf (non-array) elements are included only if callback returns truthy.
//   - Original array is not mutated.

Array.prototype.multiFilter = function (callback) {
  // TODO: store this as originalArray
  // TODO: define inner recursive filter(arr, test):
  //         iterate each element:
  //           if Array.isArray(element) → recurse, push result
  //           else if test(element) → push element
  //         return result
  // TODO: return filter(originalArray, callback)
  const originalArray = this;
  const filter = (arr, test) => {
    const result = [];
    for (let a of arr) {
      if (Array.isArray(a)) {
        const output = filter(a, test);
        result.push(output);
      } else {
        if (test(a)) {
          result.push(a);
        }
      }
    }
    return result;
  };
  return filter(originalArray, callback);
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

// TC1: filter strings from nested array
const arr = [[1, [2, [3, "foo", { a: 1, b: 2 }]], "bar"]];
test(
  "TC1: filter strings preserves nesting",
  arr.multiFilter((e) => typeof e === "string"),
  [[[["foo"]], "bar"]],
);

// TC2: filter numbers from nested array
test(
  "TC2: filter numbers preserves nesting",
  [[1, [2, [3, "foo", { a: 1, b: 2 }]], "bar"]].multiFilter(
    (e) => typeof e === "number",
  ),
  [[1, [2, [3]]]],
);

// TC3: flat array (no nesting) — behaves like regular filter
test(
  "TC3: flat array filters correctly",
  [1, 2, 3, 4].multiFilter((e) => e % 2 === 0),
  [2, 4],
);

// TC4: empty array returns empty array
test(
  "TC4: empty array returns empty array",
  [].multiFilter(() => true),
  [],
);

// TC5: empty nested array preserved
test(
  "TC5: empty sub-array preserved in structure",
  [[], [1, 2]].multiFilter((e) => e > 1),
  [[], [2]],
);

// TC6: all leaf elements fail test — sub-arrays still in output (as empty arrays)
test(
  "TC6: all fail test — sub-arrays remain as empty shells",
  [[1, [2]], 3].multiFilter(() => false),
  [[[]]],
);

// TC7: all leaf elements pass test
test(
  "TC7: all pass — structure preserved with all elements",
  [[1, [2, 3]], 4].multiFilter(() => true),
  [[1, [2, 3]], 4],
);

// TC8: deeply nested (3 levels)
test(
  "TC8: 3-level nesting filtered correctly",
  [[[1, "a"], 2], "b"].multiFilter((e) => typeof e === "number"),
  [[[1], 2]],
);

// TC9: original array not mutated
const orig = [[1, 2], 3];
orig.multiFilter((e) => e > 1);
test("TC9: original array not mutated", orig, [[1, 2], 3]);

// TC10: returns a new array (not same reference)
const src = [1, 2, 3];
const res = src.multiFilter(() => true);
test("TC10: returns a new array reference", res === src, false);

// TC11: objects at leaf level — filtered out when test fails
test(
  "TC11: objects filtered out when test fails",
  [1, { x: 1 }, 2].multiFilter((e) => typeof e === "number"),
  [1, 2],
);

// TC12: objects at leaf level — included when test passes
test(
  "TC12: objects included when test passes",
  [{ x: 1 }, { x: 2 }].multiFilter((e) => e.x > 1),
  [{ x: 2 }],
);

console.log("\nAll tests done");
