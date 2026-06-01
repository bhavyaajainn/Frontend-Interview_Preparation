// Piping Function – Part 1
// pipe(obj) — returns a function that, when called with args,
// replaces every function value in obj (at any depth) with its computed result.
// Non-function, non-object values are left unchanged.

const pipe = (obj) => {
  return function (...args) {
    // TODO: iterate keys of obj
    // TODO: if value is a function → call with args, store result
    // TODO: if value is a plain object (not null, not array) → recurse
    // TODO: otherwise leave as-is
    // TODO: return obj
    for (let key in obj) {
      if (typeof obj[key] == "function") {
        let ans = obj[key](...args);
        obj[key] = ans;
      } else if (typeof obj[key] == "object") {
        obj[key] = pipe(obj[key])(...args);
      }
    }
    return obj;
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

// TC1: problem's own example
test(
  "TC1: nested functions + primitives",
  pipe({
    a: { b: (a, b, c) => a + b + c, c: (a, b, c) => a + b - c },
    d: (a, b, c) => a - b - c,
    e: 1,
    f: true,
  })(1, 1, 1),
  { a: { b: 3, c: 1 }, d: -1, e: 1, f: true },
);

// TC2: flat object, single function
test("TC2: flat single function", pipe({ sum: (x, y) => x + y })(3, 4), {
  sum: 7,
});

// TC3: all primitives — no functions, object unchanged
test(
  "TC3: no functions — primitives pass through",
  pipe({ x: 10, y: "hello", z: false })(99),
  { x: 10, y: "hello", z: false },
);

// TC4: deeply nested function
test("TC4: three levels deep", pipe({ a: { b: { c: (n) => n * 2 } } })(5), {
  a: { b: { c: 10 } },
});

// TC5: null value must not cause a stack overflow / error
test(
  "TC5: null value is left unchanged",
  pipe({ a: null, b: (x) => x + 1 })(4),
  { a: null, b: 5 },
);

// TC6: array value is left unchanged (not recursed into)
test(
  "TC6: array value is left unchanged",
  pipe({ a: [1, 2, 3], b: (x) => x * 3 })(2),
  { a: [1, 2, 3], b: 6 },
);

// TC7: empty object
test("TC7: empty object returns empty object", pipe({})(1, 2, 3), {});

// TC8: multiple args passed correctly to each function
test(
  "TC8: multiple args forwarded to every function",
  pipe({ mul: (a, b) => a * b, div: (a, b) => a / b })(10, 2),
  { mul: 20, div: 5 },
);

console.log("\nAll tests done");
