// groupBy() Polyfill
//
// groupBy(collection, iteratee) — groups collection values by the key derived
// from iteratee.
//   - If iteratee is a function → key = iteratee(element)
//   - If iteratee is a string   → key = element[iteratee]
// Returns a plain object: { key: [elements...] }

const groupBy = (values, keyFinder) => {
  // TODO: use values.reduce() with an empty object as accumulator
  // TODO: derive key: typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder]
  // TODO: if acc[key] doesn't exist → create acc[key] = [element]
  //        else → push/spread element into acc[key]
  // TODO: return accumulator
  const ans = {};
  values.reduce((a, b) => {
    const key = typeof keyFinder === "function" ? keyFinder(b) : b[keyFinder];
    if (!a[key]) {
      a[key] = [b];
    } else {
      a[key] = [...a[key], b];
    }
    return a;
  }, ans);
  return ans;
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

// TC1: function iteratee — Math.floor
test(
  "TC1: function iteratee (Math.floor)",
  groupBy([6.1, 4.2, 6.3], Math.floor),
  { 4: [4.2], 6: [6.1, 6.3] },
);

// TC2: string iteratee — property access
test(
  "TC2: string iteratee (length)",
  groupBy(["one", "two", "three"], "length"),
  { 3: ["one", "two"], 5: ["three"] },
);

// TC3: single group
test(
  "TC3: all elements share the same key",
  groupBy([1.1, 1.2, 1.9], Math.floor),
  { 1: [1.1, 1.2, 1.9] },
);

// TC4: each element gets its own group
test(
  "TC4: all elements map to unique keys",
  groupBy([1.1, 2.2, 3.3], Math.floor),
  { 1: [1.1], 2: [2.2], 3: [3.3] },
);

// TC5: empty array returns empty object
test("TC5: empty array returns {}", groupBy([], Math.floor), {});

// TC6: boolean iteratee function
test(
  "TC6: boolean function iteratee",
  groupBy([1, 2, 3, 4, 5], (n) => n % 2 === 0),
  { false: [1, 3, 5], true: [2, 4] },
);

// TC7: string iteratee on array of objects
test(
  "TC7: string iteratee on objects",
  groupBy(
    [
      { type: "fruit", name: "apple" },
      { type: "veg", name: "carrot" },
      { type: "fruit", name: "banana" },
    ],
    "type",
  ),
  {
    fruit: [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
    ],
    veg: [{ type: "veg", name: "carrot" }],
  },
);

// TC8: function iteratee on objects
test(
  "TC8: function iteratee on objects",
  groupBy([{ age: 20 }, { age: 25 }, { age: 20 }], (o) => o.age),
  { 20: [{ age: 20 }, { age: 20 }], 25: [{ age: 25 }] },
);

// TC9: string values grouped by first character
test(
  "TC9: function iteratee — first character of string",
  groupBy(["apple", "avocado", "banana", "blueberry"], (s) => s[0]),
  { a: ["apple", "avocado"], b: ["banana", "blueberry"] },
);

// TC10: single element
test("TC10: single element array", groupBy([42], Math.floor), { 42: [42] });

// TC11: numeric string property
test(
  "TC11: numeric string property access",
  groupBy(["hi", "hey", "hello", "ok"], "length"),
  { 2: ["hi", "ok"], 3: ["hey"], 5: ["hello"] },
);

console.log("\nAll tests done");
