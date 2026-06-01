// Compare Two Arrays or Objects
// compare(current, other) — deep equality check for arrays and objects
// Returns true if structurally equal (order-sensitive for arrays, order-insensitive for object keys)
// Handles: nested arrays, nested objects, functions, primitives

const compare = (current, other) => {
  // TODO: get the type of both inputs using Object.prototype.toString.call()
  // TODO: return false if either input is not an array or object
  // TODO: return false if types don't match (e.g. array vs object)
  // TODO: compare lengths (array.length / Object.keys().length)
  // TODO: define helper equal(item1, item2):
  //         - if both are array/object → recurse with compare()
  //         - else check types match, then compare values (functions: use toString())
  // TODO: iterate and call equal() on each element/key, return false on mismatch
  // TODO: return true if all checks pass

  const getType = (val) => Object.prototype.toString.call(val);
  const ARRAY = "[object Array]";
  const OBJECT = "[object Object]";

  const currentType = getType(current);
  const otherType = getType(other);

  if (currentType !== ARRAY && currentType !== OBJECT) {
    return false;
  }
  if (otherType !== ARRAY && currentType !== OBJECT) {
    return false;
  }
  if (currentType !== otherType) {
    return false;
  }

  const isArray = currentType === ARRAY;
  const currentKeys = isArray ? null : Object.keys(current);
  const otherKeys = isArray ? null : Object.keys(other);

  if (isArray && current.length != other.length) {
    return false;
  }

  if (!isArray && currentKeys.length != otherKeys.length) {
    return false;
  }
  const equal = (a, b) => {
    const ta = getType(a);
    const tb = getType(b);
    if ((ta === ARRAY || ta === OBJECT) && (tb === ARRAY || tb === OBJECT)) {
      return compare(a, b);
    }
    if (ta !== tb) return false;
    if (ta === "[object Function]") {
      return a.toString() === b.toString();
    } else {
      return a === b;
    }
  };

  if (isArray) {
    for (let i = 0; i < current.length; i++) {
      if (!equal(current[i], other[i])) {
        return false;
      }
    }
  } else {
    for (const key of currentKeys) {
      if (!(key in other)) return false;
      if (!equal(current[key], other[key])) return false;
    }
  }
  return true;
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

// --- Array comparisons ---

test(
  "ARR TC1: identical flat arrays",
  compare([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]),
  true,
);

test(
  "ARR TC2: same elements different order → false",
  compare([1, 2, 3, 4, 5], [1, 3, 2, 4, 5]),
  false,
);

test("ARR TC3: different lengths → false", compare([1, 2], [1, 2, 3]), false);

test(
  "ARR TC4: nested arrays equal",
  compare(
    [
      [1, 2],
      [3, 4, 5],
    ],
    [
      [1, 2],
      [3, 4, 5],
    ],
  ),
  true,
);

test(
  "ARR TC5: nested arrays different",
  compare(
    [
      [1, 2],
      [3, 4, 5],
    ],
    [
      [1, 2],
      [3, 4, 6],
    ],
  ),
  false,
);

// --- Object comparisons ---

test(
  "OBJ TC1: same keys/values",
  compare({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }),
  true,
);

test(
  "OBJ TC2: same keys/values different insertion order → true",
  compare({ a: 1, b: 2, c: 3 }, { b: 2, a: 1, c: 3 }),
  true,
);

test(
  "OBJ TC3: different values → false",
  compare({ a: 1, b: 2 }, { a: 1, b: 99 }),
  false,
);

test(
  "OBJ TC4: different number of keys → false",
  compare({ a: 1 }, { a: 1, b: 2 }),
  false,
);

// --- Mixed array + object ---

const arrObj1 = [
  1,
  2,
  {
    a: 1,
    b: 2,
    c: 3,
    d: function () {
      console.log("abcd");
    },
  },
  4,
  5,
];
const arrObj2 = [
  1,
  2,
  {
    c: 3,
    b: 2,
    a: 1,
    d: function () {
      console.log("abcd");
    },
  },
  4,
  5,
];
const arrObj3 = [
  1,
  2,
  {
    a: 1,
    b: 2,
    c: 3,
    d: function () {
      console.log("xyz");
    },
  },
  4,
  5,
];

test(
  "MIX TC1: array with nested object (key order differs) → true",
  compare(arrObj1, arrObj2),
  true,
);

test(
  "MIX TC2: array with nested object (function body differs) → false",
  compare(arrObj1, arrObj3),
  false,
);

// --- Edge cases ---

test("EDGE TC1: primitive input → false", compare(1, 1), false);

test(
  "EDGE TC2: array vs object → false",
  compare([1, 2, 3], { 0: 1, 1: 2, 2: 3 }),
  false,
);

test("EDGE TC3: empty arrays", compare([], []), true);

test("EDGE TC4: empty objects", compare({}, {}), true);

console.log("\nAll tests done");
