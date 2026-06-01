// Method Chaining – Part 2
// Implement ComputeAmount two ways:
//   1. Constructor function (used with `new`)
//   2. Closure function (called without `new`, returns a plain object)
// Both support: crore, lacs, thousand, hundred, ten, unit, value

// --- Method 1: Constructor ---
const ComputeAmountConstructor = function () {
  this.store = 0;

  this.crore = function (val) {
    this.store += val * Math.pow(10, 7);
    return this;
  };

  this.lacs = function (val) {
    this.store += val * Math.pow(10, 5);
    return this;
  };

  this.thousand = function (val) {
    this.store += val * Math.pow(10, 3);
    return this;
  };

  this.hundred = function (val) {
    this.store += val * Math.pow(10, 2);
    return this;
  };

  this.ten = function (val) {
    this.store += val * 10;
    return this;
  };

  this.unit = function (val) {
    this.store += val;
    return this;
  };

  this.value = function () {
    return this.store;
  };
};

// --- Method 2: Closure ---
const ComputeAmount = function () {
  return {
    store: 0,
    crore: function (val) {
      this.store += val * Math.pow(10, 7);
      return this;
    },

    lacs: function (val) {
      this.store += val * Math.pow(10, 5);
      return this;
    },

    thousand: function (val) {
      this.store += val * Math.pow(10, 3);
      return this;
    },

    hundred: function (val) {
      this.store += val * Math.pow(10, 2);
      return this;
    },

    ten: function (val) {
      this.store += val * 10;
      return this;
    },

    unit: function (val) {
      this.store += val;
      return this;
    },

    value: function () {
      return this.store;
    },
  };
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

// --- Constructor tests ---

const c1 = new ComputeAmountConstructor();
test(
  "CON TC1: lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7)",
  c1.lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value(),
  143545000,
);

const c2 = new ComputeAmountConstructor();
test(
  "CON TC2: lacs(9).lacs(1).thousand(10).ten(1).unit(1)",
  c2.lacs(9).lacs(1).thousand(10).ten(1).unit(1).value(),
  1010011,
);

const c3 = new ComputeAmountConstructor();
test("CON TC3: crore(1) = 10000000", c3.crore(1).value(), 10000000);

const c4 = new ComputeAmountConstructor();
test(
  "CON TC4: hundred(5).ten(3).unit(2) = 532",
  c4.hundred(5).ten(3).unit(2).value(),
  532,
);

// Instances are independent
const c5 = new ComputeAmountConstructor();
const c6 = new ComputeAmountConstructor();
c5.crore(1);
c6.lacs(1);
test("CON TC5: instances are independent — c5", c5.value(), 10000000);
test("CON TC6: instances are independent — c6", c6.value(), 100000);

// --- Closure tests ---

test(
  "CLO TC1: lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7)",
  ComputeAmount()
    .lacs(15)
    .crore(5)
    .crore(2)
    .lacs(20)
    .thousand(45)
    .crore(7)
    .value(),
  143545000,
);

test(
  "CLO TC2: lacs(9).lacs(1).thousand(10).ten(1).unit(1)",
  ComputeAmount().lacs(9).lacs(1).thousand(10).ten(1).unit(1).value(),
  1010011,
);

test(
  "CLO TC3: thousand(1).hundred(1).ten(1).unit(1) = 1111",
  ComputeAmount().thousand(1).hundred(1).ten(1).unit(1).value(),
  1111,
);

// Each call returns a fresh instance
const a = ComputeAmount().crore(2);
const b = ComputeAmount().lacs(1);
test("CLO TC4: each call is a fresh instance — a", a.value(), 20000000);
test("CLO TC5: each call is a fresh instance — b", b.value(), 100000);

console.log("\nAll tests done");
