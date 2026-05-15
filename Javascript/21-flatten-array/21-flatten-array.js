// Flatten an array
// Asked in Meta's frontend interview

// --- Approach 1: Built-in flat() ---
// arr.flat(Infinity)

// --- Approach 3: Polyfill using iterative recursion ---
const flatten = function (arr, result = []) {
  // TODO
  for (let ele of arr) {
    if (Array.isArray(ele)) {
      flatten(ele, result);
    } else {
      result.push(ele);
    }
  }
  return result;
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

const deep = [
  [[1, [1.1]], 2, 3],
  [4, 5],
];
const simple = [1, [2, [3, [4]]]];
const already = [1, 2, 3];
const empty = [];

// flatten tests
test("flatten: deeply nested", flatten(deep), [1, 1.1, 2, 3, 4, 5]);
test("flatten: multiple nesting levels", flatten(simple), [1, 2, 3, 4]);
test("flatten: already flat", flatten(already), [1, 2, 3]);
test("flatten: empty array", flatten(empty), []);

// built-in for reference
test(
  "flat(Infinity): deeply nested",
  deep.flat(Infinity),
  [1, 1.1, 2, 3, 4, 5],
);

console.log(`\n${passed} passed, ${failed} failed`);
