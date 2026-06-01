// Merge Two or More Objects
// merge(...objects)        — shallow merge
// merge(true, ...objects)  — deep merge (nested objects recursively merged)

const merge = (...args) => {
  let target = {};
  let deep = false;
  let i = 0;

  // TODO: if first arg is boolean, set deep flag and advance i
  // TODO: define merger(obj) that iterates own props:
  //         - if deep and value is a plain object → target[prop] = merge(true, target[prop] ?? {}, obj[prop])
  //         - else → target[prop] = obj[prop]
  // TODO: loop from i to args.length, calling merger on each
  // TODO: return target
  if (typeof args[0] === "boolean") {
    deep = args[0];
    i++;
  }

  let merger = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[key]) === "[object Object]"
        ) {
          target[key] = merge(true, target[key] ?? {}, obj[key]);
        } else {
          target[key] = obj[key];
        }
      }
    }
  };
  for (; i < args.length; i++) {
    merger(args[i]);
  }
  return target;
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

const obj1 = {
  name: "prashant",
  age: 23,
  nature: { helping: true, shy: false },
};
const obj2 = {
  qualification: "BSC CS",
  loves: "Javascript",
  nature: { angry: false, shy: true },
};

// --- Shallow merge ---

test("SHALLOW TC1: flat keys merged", merge({ a: 1 }, { b: 2 }), {
  a: 1,
  b: 2,
});

test(
  "SHALLOW TC2: later object overwrites conflicting key",
  merge({ x: 1 }, { x: 99 }),
  { x: 99 },
);

test(
  "SHALLOW TC3: nested object replaced entirely (not deep-merged)",
  merge(obj1, obj2).nature,
  { angry: false, shy: true },
);

test("SHALLOW TC4: three objects", merge({ a: 1 }, { b: 2 }, { c: 3 }), {
  a: 1,
  b: 2,
  c: 3,
});

test(
  "SHALLOW TC5: source objects not mutated",
  (() => {
    const o = { a: 1 };
    merge(o, { b: 2 });
    return o;
  })(),
  { a: 1 },
);

// --- Deep merge ---

const deep1 = merge(true, obj1, obj2);

test(
  "DEEP TC1: top-level keys from both objects present",
  "name" in deep1 && "qualification" in deep1,
  true,
);

test("DEEP TC2: nested object keys merged (not replaced)", deep1.nature, {
  helping: true,
  shy: true,
  angry: false,
});

test(
  "DEEP TC3: primitive conflict resolved by last writer",
  merge(true, { n: { a: 1 } }, { n: { a: 2 } }).n.a,
  2,
);

test(
  "DEEP TC4: deep flag preserved through nested recursion",
  merge(true, { a: { b: { c: 1 } } }, { a: { b: { d: 2 } } }).a.b,
  { c: 1, d: 2 },
);

test(
  "DEEP TC5: three objects deep merged",
  merge(true, { n: { x: 1 } }, { n: { y: 2 } }, { n: { z: 3 } }).n,
  { x: 1, y: 2, z: 3 },
);

// --- Edge cases ---

test("EDGE TC1: merging empty objects returns {}", merge({}, {}), {});

test("EDGE TC2: single object returns shallow copy", merge({ a: 1, b: 2 }), {
  a: 1,
  b: 2,
});

console.log("\nAll tests done");
