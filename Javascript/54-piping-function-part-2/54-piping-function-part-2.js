// Piping Function – Part 2
// pipe(...fns) — returns a function that passes a value through each fn left-to-right.

const pipe = function (...fns) {
  return function (val) {
    // TODO: iterate fns, passing val through each one in order
    // TODO: return the final result
    for (let f of fns) {
      val = f(val);
    }
    return val;
  };
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

// Reusable helpers
const getSalary = (person) => person.salary;
const addBonus = (net) => net + 1000;
const deductTax = (gross) => gross - gross * 0.3;
const double = (n) => n * 2;
const addTen = (n) => n + 10;
const toString = (n) => String(n);

// TC1: problem's own example
test(
  "TC1: getSalary → addBonus → deductTax",
  pipe(getSalary, addBonus, deductTax)({ salary: 10000 }),
  7700,
);

// TC2: single function — behaves like calling f directly
test("TC2: single function pipe", pipe(double)(5), 10);

// TC3: no functions — value passes through unchanged
test("TC3: no functions returns value as-is", pipe()(42), 42);

// TC4: order matters — left to right
test(
  "TC4: addTen then double ≠ double then addTen",
  pipe(addTen, double)(5),
  30,
); // (5+10)*2 = 30

test("TC4b: double then addTen", pipe(double, addTen)(5), 20); // 5*2+10 = 20

// TC5: type transformation along the chain
test("TC5: number → string via toString", pipe(double, toString)(7), "14");

// TC6: object → number → number (realistic use case)
test(
  "TC6: extract + transform chain",
  pipe(getSalary, addBonus)({ salary: 5000 }),
  6000,
);

// TC7: many functions chained
test(
  "TC7: five functions in sequence",
  pipe(
    (x) => x + 1,
    (x) => x * 2,
    (x) => x - 3,
    (x) => x / 2,
    (x) => x + 10,
  )(4),
  13.5,
); // ((4+1)*2-3)/2+10 = 12.5

console.log("\nAll tests done");
