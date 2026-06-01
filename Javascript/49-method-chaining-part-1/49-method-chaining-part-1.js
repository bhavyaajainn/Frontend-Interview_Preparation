// Method Chaining - Part 1
// Implement a calculator object and CALC constructor that support method chaining.
// Each method (add, subtract, multiply, divide) mutates `this.total` and returns `this`.

// --- Object approach ---
const calculator = {
  total: 0,
  // TODO: implement add, subtract, multiply, divide — each returns `this`
  add: function (val) {
    this.total += val;
    return this;
  },
  subtract: function (val) {
    this.total -= val;
    return this;
  },
  multiply: function (val) {
    this.total *= val;
    return this;
  },
  divide: function (val) {
    this.total /= val;
    return this;
  },
};

// --- Tests ---

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${expected}`);
    console.log(`  Got:      ${actual}`);
  }
}

// --- Object: calculator ---

// Reset total before each test group
calculator.total = 0;
calculator.add(10).subtract(2).divide(2).multiply(5);
test(
  "OBJ TC1: add(10).subtract(2).divide(2).multiply(5) = 20",
  calculator.total,
  20,
);

calculator.total = 0;
calculator.add(100).divide(4);
test("OBJ TC2: add(100).divide(4) = 25", calculator.total, 25);

calculator.total = 0;
calculator.multiply(5);
test("OBJ TC3: multiply on 0 total = 0", calculator.total, 0);

calculator.total = 0;
calculator.add(3).add(3).add(3);
test("OBJ TC4: chained adds", calculator.total, 9);

calculator.total = 0;
calculator.add(50).subtract(50);
test("OBJ TC5: result can be zero", calculator.total, 0);

console.log("\nAll tests done");
