// Filter Nested Object
// Mutate a nested object in-place, removing all leaf values that fail the filter
// and then pruning any intermediate objects that become empty.

const deepFilter = (obj, filter) => {
  // TODO
  for (let key in obj) {
    let val = obj[key];
    if (typeof val == "object") {
      deepFilter(val, filter);
    } else {
      if (filter(val) == false) {
        delete obj[key];
      }
    }
    if (JSON.stringify(val) === "{}") {
      delete obj[key];
    }
  }
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

const clone = (o) => JSON.parse(JSON.stringify(o));

const base = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

// TC1 — keep only strings (example from the problem)
const o1 = clone(base);
deepFilter(o1, (s) => typeof s === "string");
test("TC1: keep strings only", o1, {
  b: { c: "Hello World", h: "Good Night Moon" },
});

// TC2 — keep only positive numbers
const o2 = clone(base);
deepFilter(o2, (v) => typeof v === "number" && v > 0);
test("TC2: keep positive numbers only", o2, { a: 1, b: { d: 2 } });

// TC3 — keep all values (filter always true) — object unchanged
const o3 = clone(base);
deepFilter(o3, () => true);
test("TC3: filter always true — object unchanged", o3, base);

// TC4 — filter always false — object fully emptied
const o4 = clone(base);
deepFilter(o4, () => false);
test("TC4: filter always false — object becomes {}", o4, {});

// TC5 — deeply nested: pruning propagates up (only surviving leaf is deep)
const o5 = { x: { y: { z: "keep" }, w: 42 } };
deepFilter(o5, (v) => typeof v === "string");
test("TC5: empty branches pruned up the tree", o5, { x: { y: { z: "keep" } } });

// TC6 — flat object: some keys pass, some fail
const o6 = { name: "Alice", age: 30, active: true };
deepFilter(o6, (v) => typeof v !== "boolean");
test("TC6: flat object — boolean removed", o6, { name: "Alice", age: 30 });

// TC7 — already-empty object stays empty
const o7 = {};
deepFilter(o7, () => true);
test("TC7: empty object remains empty", o7, {});

// TC8 — in-place mutation: original reference must be updated (not replaced)
const o8 = { a: "keep", b: 99 };
const ref = o8;
deepFilter(o8, (v) => typeof v === "string");
test("TC8: mutation is in-place (same reference)", ref, { a: "keep" });

console.log("\nAll tests done");
