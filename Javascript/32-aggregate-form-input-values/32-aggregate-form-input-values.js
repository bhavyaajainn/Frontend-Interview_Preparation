// Aggregate the Input Values of the Form
// Given input elements with dot-notation names, build a nested object from their values.

// Core logic — accepts an array of { name, value } pairs.
// Used by aggregateValues() below and directly in tests.
const buildNested = (inputs) => {
  let ans = {};
  for (let input of inputs) {
    let name = input.name;
    let value = input.value;
    let temp = name.split(".");
    let current = ans;

    temp.forEach((val, index) => {
      if (index == temp.length - 1) {
        current[val] = value;
      } else {
        if (!current[val] || typeof current[val] !== "object") {
          current[val] = {};
        }
        current = current[val];
      }
    });
  }
  return ans;
};

// DOM wrapper — browser use only (not runnable in Node).
const aggregateValues = (id) => {
  const element = document.querySelector(`#${id}`);
  const inputs = element.querySelectorAll('input[type="text"]');
  return buildNested(Array.from(inputs));
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

// TC1 — example from the problem: 3 inputs, two share the "a" root
test(
  "TC1: nested aggregation from problem example",
  buildNested([
    { name: "a.c", value: "1" },
    { name: "a.b.d", value: "2" },
    { name: "a.b.e", value: "3" },
  ]),
  { a: { c: "1", b: { d: "2", e: "3" } } },
);

// TC2 — single flat key (no dots)
test(
  "TC2: flat key — no dot in name",
  buildNested([{ name: "username", value: "alice" }]),
  { username: "alice" },
);

// TC3 — deep nesting (4 levels)
test(
  "TC3: deeply nested key (4 levels)",
  buildNested([{ name: "a.b.c.d", value: "42" }]),
  { a: { b: { c: { d: "42" } } } },
);

// TC4 — multiple independent root keys
test(
  "TC4: multiple independent root keys",
  buildNested([
    { name: "x.y", value: "hello" },
    { name: "z", value: "world" },
  ]),
  { x: { y: "hello" }, z: "world" },
);

// TC5 — sibling keys at same level under same parent
test(
  "TC5: sibling keys under shared parent",
  buildNested([
    { name: "form.first", value: "John" },
    { name: "form.last", value: "Doe" },
    { name: "form.age", value: "30" },
  ]),
  { form: { first: "John", last: "Doe", age: "30" } },
);

// TC6 — empty array returns empty object
test("TC6: empty input list returns {}", buildNested([]), {});

// TC7 — later value overwrites an earlier one with the same path
test(
  "TC7: duplicate path — last value wins",
  buildNested([
    { name: "a.b", value: "first" },
    { name: "a.b", value: "second" },
  ]),
  { a: { b: "second" } },
);

console.log("\nAll tests done");
