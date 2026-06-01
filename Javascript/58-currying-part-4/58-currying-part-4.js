// Currying – Part 4
// curry(fn) — returns a curried version of fn.
// Keeps collecting args until args.length >= fn.length, then calls fn.

const curry = (fn) => {
  // TODO: define helper(...args)
  //   - if args.length >= fn.length → return fn(...args)
  //   - else → return a new function(...args2) that calls helper(...args, ...args2)
  // TODO: return helper
  let helper = function (...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      let temp = function (...args2) {
        return helper(...args, ...args2);
      };
      return temp;
    }
  };
  return helper;
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

function sum(a, b, c, d) {
  return a + b + c + d;
}
function multiply(a, b) {
  return a * b;
}
function identity(x) {
  return x;
}

const curriedSum = curry(sum);
const curriedMultiply = curry(multiply);
const curriedIdentity = curry(identity);

// TC1–4: all call patterns for 4-arg function
test("TC1: all args at once", curriedSum(1, 2, 3, 4), 10);
test("TC2: one-by-one", curriedSum(1)(2)(3)(4), 10);
test("TC3: mixed grouping (1,2)(3,4)", curriedSum(1, 2)(3, 4), 10);
test("TC4: mixed grouping (1)(2,3)(4)", curriedSum(1)(2, 3)(4), 10);

// TC5: extra args are forwarded and ignored by fn
test("TC5: extra args ignored", curriedSum(1, 2, 3, 4, 99), 10);

// TC6: 2-arg function
test("TC6: curry(multiply)(3)(4)", curriedMultiply(3)(4), 12);
test("TC7: curry(multiply)(3, 4)", curriedMultiply(3, 4), 12);

// TC8: 1-arg function
test("TC8: curry(identity)(7)", curriedIdentity(7), 7);

// TC9: different values
test("TC9: sum(2)(3)(4)(5)", curriedSum(2)(3)(4)(5), 14);

// TC10: partial application reuse
const addOne = curriedSum(1);
const addOneTwo = addOne(2);
test("TC10: partial application — addOne(2)(3)(4)", addOneTwo(3)(4), 10);

console.log("\nAll tests done");
