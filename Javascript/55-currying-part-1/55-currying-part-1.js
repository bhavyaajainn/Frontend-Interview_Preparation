// Currying – Part 1
// curry() returns a function that accumulates all passed values and returns the running sum.
// Calling with no argument or 0 returns the current total without resetting.

const curry = () => {
  // TODO: store accumulated sum
  // TODO: return inner function(num = 0) that adds num to sum and returns sum
  let sum = 0;
  return function (num = 0) {
    sum = sum + num;
    return sum;
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

// TC1: problem's own sequence
const sum1 = curry();
test("TC1a: sum(5) = 5", sum1(5), 5);
test("TC1b: sum(3) = 8", sum1(3), 8);
test("TC1c: sum(4) = 12", sum1(4), 12);
test("TC1d: sum(0) = 12", sum1(0), 12);
test("TC1e: sum()  = 12", sum1(), 12);

// TC2: starts at 0
const sum2 = curry();
test("TC2: first call with no arg returns 0", sum2(), 0);

// TC3: single large value
const sum3 = curry();
test("TC3: single call sum(100) = 100", sum3(100), 100);

// TC4: negative numbers
const sum4 = curry();
sum4(10);
test("TC4: sum(10) then sum(-3) = 7", sum4(-3), 7);

// TC5: instances are independent
const a = curry();
const b = curry();
a(50);
b(5);
test("TC5: two instances are independent — a", a(), 50);
test("TC5: two instances are independent — b", b(), 5);

// TC6: calling with 0 multiple times does not reset
const sum6 = curry();
sum6(7);
sum6(0);
sum6(0);
test("TC6: repeated 0 calls do not reset sum", sum6(), 7);

// TC7: chained small increments
const sum7 = curry();
[1, 2, 3, 4, 5].forEach((n) => sum7(n));
test("TC7: sum of 1..5 = 15", sum7(), 15);

console.log("\nAll tests done");
