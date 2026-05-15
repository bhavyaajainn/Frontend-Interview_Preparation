// Implement Test() and expect() as in Jest
// Asked in Meta's frontend interview

// List of matcher methods
// Each matcher receives (expected, actual, matcherProperties)
const matchers = {
  toBe: function (expected, actual, matcherProperties) {
    // TODO
    const { isNot } = matcherProperties;
    if (isNot) {
      if (expected == actual) {
        throw error("not match");
        return;
      }
    }
    if (expected !== actual) {
      throw error("should match");
      return;
    }
  },
  toBeUndefined: function (expected, actual, matcherProperties) {
    // TODO
    const { isNot } = matcherProperties;

    if (isNot) {
      if (actual === undefined) {
        throw error("Should not match");
        return;
      }
    } else {
      if (actual !== undefined) {
        throw error("Should match");
      }
    }
  },
};

// Helper: returns a closure that calls the matcherFn when invoked with expected value
const helperMatcher = (actual, matcherFn, isNot = false) => {
  // TODO
  return function (expected) {
    matcherFn(expected, actual, { isNot });
  };
};

// The assertion function — returns an object with matcher methods and a .not namespace
const expect = function (actual) {
  // TODO
  const expectation = { not: {} };
  for (let key in matchers) {
    const matcherFn = matchers[key];
    expectation[key] = helperMatcher(actual, matcherFn, false);
    expectation.not[key] = helperMatcher(actual, matcherFn, true);
  }
  return expectation;
};

// Test function — runs callback and prints Pass/Fail
const test = async (title, callback) => {
  // TODO
  try {
    await callback;
    console.log("passed");
  } catch {
    console.error("failed");
  }
};

// --- Tests ---

// Test case 1 — toBeUndefined
test("To be undefined", () => {
  expect(undefined).toBeUndefined();
});
// "Pass To be undefined"

test("To not be undefined", () => {
  expect(undefined).not.toBeUndefined();
});
// "Fail To not be undefined"

test("To not be undefined", () => {
  expect(1).not.toBeUndefined();
});
// "Pass To not be undefined"

// Test case 2 — toBe
test("Learnersbucket is the best platform", () => {
  expect("system-design").toBe("system-design");
  expect("system-design").not.toBe("machine-coding");
});
// "Pass Learnersbucket is the best platform"

test("Learnersbucket is the best platform", () => {
  expect("system-design").not.toBe("system-design");
});
// "Fail Learnersbucket is the best platform"
