// Currying – Part 5
//
// generateSum(limit) — returns a curried function that collects arguments
// across successive calls until at least `limit` arguments are received,
// then returns the sum of the first `limit` arguments.
//
// Each call can pass any number of arguments; they accumulate until the
// limit is reached.
//
// generateSum(4)(1)(2)(3)(4)   → 10
// generateSum(2)(5)(2)         → 7
// generateSum(2)(5)(2, 3, 4)   → 7  (only first 2 args counted)

let generateSum = (limit) => {
  // TODO: define helper(...args):
  //         if args.length >= limit:
  //           return args.slice(0, limit).reduce((a, b) => a + b, 0)
  //         else:
  //           return (...args2) => helper(...args, ...args2)
  // TODO: return helper
  let helper = (...args) => {
    if (args.length >= limit) {
      let allowedargs = args.slice(0, limit);
      return allowedargs.reduce((a, b) => a + b, 0);
    } else {
      let temp = (...args2) => {
        return helper(...args, ...args2);
      };
      return temp;
    }
  };
  return helper;
};

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// TC1: article example — limit 4, one arg per call
test("TC1: generateSum(4)(1)(2)(3)(4) = 10", generateSum(4)(1)(2)(3)(4), 10);

// TC2: article example — limit 2
test("TC2: generateSum(2)(5)(2) = 7", generateSum(2)(5)(2), 7);

// TC3: extra args beyond limit are ignored
test(
  "TC3: generateSum(2)(5)(2, 3, 4) = 7 (only first 2 counted)",
  generateSum(2)(5)(2, 3, 4),
  7,
);

// TC4: limit 1 — first call returns sum immediately
test("TC4: generateSum(1)(9) = 9", generateSum(1)(9), 9);

// TC5: limit 3 with all args in one call
test("TC5: generateSum(3)(1, 2, 3) = 6", generateSum(3)(1, 2, 3), 6);

// TC6: limit 3 with 2 args then 1
test("TC6: generateSum(3)(1, 2)(3) = 6", generateSum(3)(1, 2)(3), 6);

// TC7: limit 3 with 1 arg per call
test("TC7: generateSum(3)(1)(2)(3) = 6", generateSum(3)(1)(2)(3), 6);

// TC8: sum with zeros
test("TC8: generateSum(3)(0)(0)(0) = 0", generateSum(3)(0)(0)(0), 0);

// TC9: sum with negative numbers
test("TC9: generateSum(3)(-1)(2)(-3) = -2", generateSum(3)(-1)(2)(-3), -2);

// TC10: each generateSum call creates an independent instance
const s1 = generateSum(2);
const s2 = generateSum(3);
test("TC10: independent instances — s1(5)(5) = 10", s1(5)(5), 10);
test("TC11: independent instances — s2(1)(2)(3) = 6", s2(1)(2)(3), 6);

// TC12: intermediate return is a function (not a number yet)
const partial = generateSum(3)(1)(2);
test(
  "TC12: partial application returns a function",
  typeof partial,
  "function",
);

// TC13: complete the partial application
test("TC13: completing partial application gives correct sum", partial(3), 6);

// TC14: limit satisfied with more args than needed in final call
test(
  "TC14: generateSum(2)(1)(2, 99, 99) = 3 (extra ignored)",
  generateSum(2)(1)(2, 99, 99),
  3,
);

console.log("\nAll tests done");
