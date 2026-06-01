// Currying with Placeholder
//
// curry(func) — returns a curried version of func.
// curry.placeholder (Symbol) — a unique sentinel; pass it to defer an argument.
//
// Placeholders are filled left-to-right by subsequent valid arguments.
// Once all `func.length` argument slots are filled (no remaining placeholders),
// func is invoked with those arguments.

// Helper: merge currentArgs with newArgs, replacing placeholders in order
function fillPlaceholders(currentArgs, newArgs, placeholder) {
  // TODO: iterate currentArgs; if element === placeholder and newArgs has remaining
  //         args → replace with next newArg; else keep element
  // TODO: append any leftover newArgs at the end
  // TODO: return merged array
  const result = [];
  let newArgIndex = 0;
  for (const arg of currentArgs) {
    if (arg === placeholder && newArgIndex < newArgs.length) {
      result.push(newArgs[newArgIndex++]);
    } else {
      result.push(arg);
    }
  }

  while (newArgIndex < newArgs.length) {
    result.push(newArgs[newArgIndex++]);
  }
  return result;
}

function curry(func, limit = func.length) {
  const placeholder = curry.placeholder;

  return function curried(...args) {
    const validArgs = args.filter((arg) => arg != placeholder);
    const hasPlaceholders = args.slice(0, limit).includes(placeholder);
    if (validArgs.length >= limit && !hasPlaceholders) {
      return func(...args.slice(0, limit));
    }
    return function (...nextArgs) {
      const mergeArgs = fillPlaceholders(args, nextArgs, placeholder);
      return curried(...mergeArgs);
    };
  };
}

// Assign a unique Symbol as the placeholder
curry.placeholder = Symbol("_");

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
const _ = curry.placeholder;

// ── Basic currying (no placeholders) ─────────────────────────────────────────

test("TC1:  curriedAdd(1)(2)(3) = 6", curriedAdd(1)(2)(3), 6);
test("TC2:  curriedAdd(1, 2)(3) = 6", curriedAdd(1, 2)(3), 6);
test("TC3:  curriedAdd(1)(2, 3) = 6", curriedAdd(1)(2, 3), 6);
test("TC4:  curriedAdd(1, 2, 3) = 6", curriedAdd(1, 2, 3), 6);

// ── Placeholder at position 0 ─────────────────────────────────────────────────

test("TC5:  curriedAdd(_, 2, 3)(1) = 6", curriedAdd(_, 2, 3)(1), 6);
test("TC6:  curriedAdd(_, 2)(3)(1) = 6", curriedAdd(_, 2)(3)(1), 6);

// ── Placeholder at position 1 ─────────────────────────────────────────────────

test("TC7:  curriedAdd(1, _, 3)(2) = 6", curriedAdd(1, _, 3)(2), 6);

// ── Multiple placeholders ─────────────────────────────────────────────────────

test("TC8:  curriedAdd(_, _, 3)(_, 1)(3) = 7", curriedAdd(_, _, 3)(_, 1)(3), 7);
test("TC9:  curriedAdd(_, _, _)(1)(2)(3) = 6", curriedAdd(_, _, _)(1)(2)(3), 6);
test("TC10: curriedAdd(_, _, _)(1, 2)(3) = 6", curriedAdd(_, _, _)(1, 2)(3), 6);

// ── Article testcase 2 ────────────────────────────────────────────────────────

const greet = (greeting, name, punctuation) =>
  `${greeting}, ${name}${punctuation}`;

const sayHello = curry(greet)("Hello");
test(
  "TC11: sayHello('Alice')('!') = 'Hello, Alice!'",
  sayHello("Alice")("!"),
  "Hello, Alice!",
);

const greetBob = curry(greet)(_, "Bob");
test("TC12: greetBob('Hi')('!') = 'Hi, Bob!'", greetBob("Hi")("!"), "Hi, Bob!");

const askBob = curry(greet)(_, "Bob", _);
test("TC13: askBob('You')('?') = 'You, Bob?'", askBob("You")("?"), "You, Bob?");

// ── Placeholder is unique Symbol ─────────────────────────────────────────────

test("TC14: curry.placeholder is a Symbol", typeof curry.placeholder, "symbol");
test("TC15: placeholder !== any primitive", curry.placeholder === "_", false);

// ── Two-arg function ──────────────────────────────────────────────────────────

const mul = (a, b) => a * b;
const curriedMul = curry(mul);

test("TC16: curriedMul(_, 3)(4) = 12", curriedMul(_, 3)(4), 12);
test("TC17: curriedMul(4)(3) = 12", curriedMul(4)(3), 12);

// ── fillPlaceholders helper ───────────────────────────────────────────────────

const ph = curry.placeholder;
test(
  "TC18: fillPlaceholders replaces first placeholder",
  JSON.stringify(fillPlaceholders([ph, 2, 3], [1], ph)),
  JSON.stringify([1, 2, 3]),
);

test(
  "TC19: fillPlaceholders replaces multiple placeholders in order",
  JSON.stringify(fillPlaceholders([ph, ph, 3], [1, 2], ph)),
  JSON.stringify([1, 2, 3]),
);

test(
  "TC20: fillPlaceholders appends leftover new args",
  JSON.stringify(fillPlaceholders([1, 2], [3], ph)),
  JSON.stringify([1, 2, 3]),
);

console.log("\nAll tests done");
