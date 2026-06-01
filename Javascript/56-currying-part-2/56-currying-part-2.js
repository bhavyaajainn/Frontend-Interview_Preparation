// Currying – Part 2
//
// sumFixed(...args) — collects args; returns the sum once exactly 4 have been gathered.
// sumFree(...args)  — collects args; returns the sum when called with no arguments ().
//                     sumFree() with no args at all returns 0.

const sumFixed = (...args) => {
  let sum = 0;
  const storage = [...args];
  if (storage.length == 4) {
    for (let ele of storage) {
      sum += ele;
    }
    return sum;
  } else {
    const temp = function (...args2) {
      storage.push(...args2);
      if (storage.length == 4) {
        return storage.reduce((a, b) => a + b, 0);
      } else {
        return temp;
      }
    };
    return temp;
  }
  // TODO: if storage.length === 4 return sum
  // TODO: else return inner function temp that merges args, checks limit, returns temp or sum
};

const sumFree = (...args) => {
  let sum = 0;
  const storage = [...args];
  // TODO: if no args passed return 0
  // TODO: else return inner function temp that merges args2,
  //       if args2.length === 0 return sum, else return temp
  if (storage.length == 0) {
    return 0;
  } else {
    const temp = function (...args2) {
      if (args2.length === 0) {
        return storage.reduce((a, b) => a + b, 0);
      }
      storage.push(...args2);
      return temp;
    };
    return temp;
  }
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

// --- sumFixed (4-arg limit) ---

test("FIXED TC1: sum(1,2,3,4)", sumFixed(1, 2, 3, 4), 10);
test("FIXED TC2: sum(1)(2)(3)(4)", sumFixed(1)(2)(3)(4), 10);
test("FIXED TC3: sum(1,2)(3,4)", sumFixed(1, 2)(3, 4), 10);
test("FIXED TC4: sum(1,2,3)(4)", sumFixed(1, 2, 3)(4), 10);
test("FIXED TC5: sum(1)(2,3,4)", sumFixed(1)(2, 3, 4), 10);
test("FIXED TC6: different values", sumFixed(2)(3)(4)(1), 10);
test("FIXED TC7: includes zero", sumFixed(0, 0)(0, 4), 4);

// --- sumFree (empty-call terminator) ---

test("FREE TC1: sum(1,2,3,4)()", sumFree(1, 2, 3, 4)(), 10);
test("FREE TC2: sum(1)(2)(3)(4)()", sumFree(1)(2)(3)(4)(), 10);
test("FREE TC3: sum(1,2)(3,4)()", sumFree(1, 2)(3, 4)(), 10);
test("FREE TC4: sum(1,2,3)(4)()", sumFree(1, 2, 3)(4)(), 10);
test("FREE TC5: sum(1)(2,3,4)()", sumFree(1)(2, 3, 4)(), 10);
test("FREE TC6: sum() returns 0", sumFree(), 0);
test("FREE TC7: more than 4 args", sumFree(1)(2)(3)(4)(5)(), 15);
test("FREE TC8: single arg", sumFree(7)(), 7);

console.log("\nAll tests done");
