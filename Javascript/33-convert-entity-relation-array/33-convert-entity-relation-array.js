// Convert Entity Relation Array to Object
// Given [child, parent] pairs, return all ancestry path strings: "root -> ... -> leaf"

const ancestry = (arr) => {
  // TODO: aggregate [child, parent] pairs into a map, then build path strings
  const aggregate = (arr) => {
    return arr.reduce((a, b) => {
      let [child, parent] = b;
      a[child] = parent;
      return a;
    }, {});
  };

  const convert = (obj) => {
    return Object.keys(obj).reduce((a, b) => {
      a.push(getKey(obj, b));
      return a;
    }, []);
  };

  const getKey = (obj, key) => {
    const val = obj[key];
    if (val in obj) {
      return getKey(obj, val) + " -> " + key;
    } else {
      return val + " -> " + key;
    }
  };

  const aggregatedMap = aggregate(arr);
  return convert(aggregatedMap);
};

// --- Tests ---

function test(name, actual, expected) {
  const a = [...actual].sort();
  const e = [...expected].sort();
  const ok = JSON.stringify(a) === JSON.stringify(e);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(e)}`);
    console.log(`  Got:      ${JSON.stringify(a)}`);
  }
}

// TC1 — example from the problem
test(
  "TC1: full example",
  ancestry([
    ["lion", "cat"],
    ["cat", "mammal"],
    ["dog", "mammal"],
    ["mammal", "animal"],
    ["fish", "animal"],
    ["shark", "fish"],
  ]),
  [
    "animal -> mammal -> cat -> lion",
    "animal -> mammal -> cat",
    "animal -> mammal -> dog",
    "animal -> mammal",
    "animal -> fish",
    "animal -> fish -> shark",
  ],
);

// TC2 — single pair
test("TC2: single pair", ancestry([["child", "parent"]]), ["parent -> child"]);

// TC3 — linear chain: a -> b -> c -> d
test(
  "TC3: linear chain of 4",
  ancestry([
    ["b", "a"],
    ["c", "b"],
    ["d", "c"],
  ]),
  ["a -> b", "a -> b -> c", "a -> b -> c -> d"],
);

// TC4 — two independent roots
test(
  "TC4: two independent trees",
  ancestry([
    ["cat", "animal"],
    ["dog", "animal"],
    ["oak", "tree"],
    ["pine", "tree"],
  ]),
  ["animal -> cat", "animal -> dog", "tree -> oak", "tree -> pine"],
);

// TC5 — root has only one direct child (no grandchildren)
test("TC5: root with one child only", ancestry([["child", "root"]]), [
  "root -> child",
]);

console.log("\nAll tests done");
