// Deep Flatten Object
//
// flatten(obj, prefix?) — recursively flattens a nested object using dot notation
//   - Nested objects → keys joined with "."
//   - Arrays → index used as key segment (e.g. "C.Q.0", "C.Q.1")
//   - Primitive values → stored as-is
//
// Two approaches shown below; implement either (or both):
//   Approach 1 — Object.prototype.toString.call() to distinguish object vs array
//   Approach 2 — typeof + Array.isArray(); convert array to object via spread

// Approach 1
const flatten = (obj, prefix) => {
  // TODO: iterate keys of obj with for...in
  // TODO: build newKey = prefix ? prefix + "." + k : k
  // TODO: use Object.prototype.toString.call(val) to detect type:
  //         "[object Object]" → recurse with flatten(val, newKey), merge into output
  //         "[object Array]"  → iterate with index, store each as newKey + "." + i
  //         else              → store val at newKey
  // TODO: return output
  let output = {};
  for (let k in obj) {
    let val = obj[k];

    const type = Object.prototype.toString.call(val);
    if (type === "[object Object]") {
      const newKey = prefix ? prefix + "." + k : k;
      const newObj = flatten(val, newKey);
      output = { ...output, ...newObj };
    } else if (type === "[object Array]") {
      for (let i = 0; i < val.length; i++) {
        const newKey = prefix ? prefix + "." + k + "." + i : k + "." + i;
        output = { ...output, [newKey]: val[i] };
      }
    } else {
      const newKey = prefix ? prefix + "." + k : k;
      output = { ...output, [newKey]: val };
    }
  }
  return output;
};

// Approach 2 (alternative — convert array to object via spread)
const flatten2 = (obj, prefix) => {
  // TODO: for each key compute newKey
  // TODO: if typeof val === "object":
  //         if Array.isArray(val) → convert to object with { ...val }, recurse
  //         else → recurse directly
  // TODO: else store primitive
  // TODO: return output
  let output = {};
  for (let k in obj) {
    let val = obj[k];
    const newKey = prefix ? prefix + "." + k : k;
    if (typeof val === "object") {
      if (Array.isArray(val)) {
        const { ...arrToObj } = val;
        const newObj = flatten(arrToObj, newKey);
        output = { ...output, ...newObj };
      } else {
        const newObj = flatten(val, newKey);
        output = { ...output, ...newObj };
      }
    } else {
      output = { ...output, [newKey]: val };
    }
  }
  return output;
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

// ── Fixtures ──────────────────────────────────────────────────────────────────

const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: { L: 56 },
    Q: [1, 2],
  },
};

const expected = {
  A: "12",
  B: 23,
  "C.P": 23,
  "C.O.L": 56,
  "C.Q.0": 1,
  "C.Q.1": 2,
};

// ── Core test cases ───────────────────────────────────────────────────────────

test("FLAT TC1: flat primitive string key preserved", flatten(nested).A, "12");
test("FLAT TC2: flat primitive number key preserved", flatten(nested).B, 23);
test("FLAT TC3: nested object key joined with dot", flatten(nested)["C.P"], 23);
test(
  "FLAT TC4: doubly-nested object key joined with dots",
  flatten(nested)["C.O.L"],
  56,
);
test("FLAT TC5: array element key uses index", flatten(nested)["C.Q.0"], 1);
test("FLAT TC6: second array element key", flatten(nested)["C.Q.1"], 2);
test(
  "FLAT TC7: no original nested keys leak into output",
  flatten(nested).C,
  undefined,
);
test("FLAT TC8: full output matches expected shape", flatten(nested), expected);

// ── Edge cases ────────────────────────────────────────────────────────────────

test("EDGE TC1: already flat object unchanged", flatten({ x: 1, y: 2 }), {
  x: 1,
  y: 2,
});

test("EDGE TC2: empty object returns empty object", flatten({}), {});

test("EDGE TC3: deeply nested (3 levels)", flatten({ a: { b: { c: 42 } } }), {
  "a.b.c": 42,
});

test(
  "EDGE TC4: array at top-level nested key with multiple elements",
  flatten({ arr: [10, 20, 30] }),
  { "arr.0": 10, "arr.1": 20, "arr.2": 30 },
);

test(
  "EDGE TC5: multiple sibling nested objects",
  flatten({ x: { a: 1 }, y: { b: 2 } }),
  { "x.a": 1, "y.b": 2 },
);

test(
  "EDGE TC6: boolean and null primitives preserved",
  flatten({ a: true, b: null }),
  { a: true, b: null },
);

test("EDGE TC7: numeric string key value preserved", flatten({ n: "0" }), {
  n: "0",
});

// ── Approach 2 passes same tests ─────────────────────────────────────────────

test("A2 TC1: approach 2 core result matches", flatten2(nested), expected);
test("A2 TC2: approach 2 deep nesting", flatten2({ a: { b: { c: 1 } } }), {
  "a.b.c": 1,
});
test("A2 TC3: approach 2 array flattening", flatten2({ q: [5, 6] }), {
  "q.0": 5,
  "q.1": 6,
});

console.log("\nAll tests done");
