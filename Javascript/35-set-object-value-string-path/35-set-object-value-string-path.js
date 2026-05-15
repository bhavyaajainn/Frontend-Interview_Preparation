// Set Object Value at String Path
// Polyfill for lodash _.set(object, path, value)
// Mutates the object in-place. Creates missing intermediate nodes.
// Accepts dot-notation strings, bracket notation, or array paths.

const set = (obj, path, value) => {
  const root = obj;
  let tempArr;
  if (Array.isArray(path)) {
    tempArr = path;
  } else {
    tempArr = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  }

  for (let i = 0; i < tempArr.length; i++) {
    const key = tempArr[i];
    if (i === tempArr.length - 1) {
      obj[key] = value;
    } else {
      if (obj[key] === undefined || obj[key] === null || typeof obj[key] !== "object") {
        obj[key] = isNaN(tempArr[i + 1]) ? {} : [];
      }
      obj = obj[key];
    }
  }

  return root;
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

const base = {
  a: {
    b: {
      c: [1, 2, 3],
    },
    d: { e: "hello" },
  },
};
const clone = () => JSON.parse(JSON.stringify(base));

// TC1 — dot-notation: overwrite a nested value
const o1 = clone();
console.log(set(o1, "a.b.c", "replaced"));
test("TC1: dot-notation overwrites value", o1.a.b.c, "replaced");

//TC2 — dot-notation with numeric index: set array element by index
const o2 = clone();
set(o2, "a.b.c.0", 99);
test("TC2: dot-notation array index", o2.a.b.c[0], 99);

// TC3 — bracket notation
const o3 = clone();
set(o3, "a.b.c[1]", 99);
test("TC3: bracket notation array index", o3.a.b.c[1], 99);

// TC4 — array-of-strings path
const o4 = clone();
set(o4, ["a", "b", "c", "2"], 99);
test("TC4: array path", o4.a.b.c[2], 99);

// TC5 — out-of-bounds index: creates new slot
const o5 = clone();
set(o5, "a.b.c[3]", "new");
test("TC5: out-of-bounds array index creates slot", o5.a.b.c[3], "new");

// TC6 — path creates new intermediate object nodes
const o6 = clone();
set(o6, "a.x.y", 42);
test("TC6: creates missing intermediate object nodes", o6.a.x.y, 42);

// TC7 — path creates new intermediate array when next key is numeric
const o7 = clone();
set(o7, "a.c.d[0]", "arr");
test("TC7: creates array for numeric next key", o7.a.c.d[0], "arr");

// TC8 — overwrites a primitive mid-path with an object
const o8 = clone();
set(o8, "a.d.e.f", "deep");
test("TC8: overwrites primitive mid-path", o8.a.d.e.f, "deep");

// TC9 — set on a completely new root-level path
const o9 = {};
set(o9, "x.y.z", true);
test("TC9: builds path on empty object", o9.x.y.z, true);

// TC10 — falsy value (0) is stored correctly
const o10 = clone();
set(o10, "a.b.c[0]", 0);
test("TC10: falsy value 0 stored correctly", o10.a.b.c[0], 0);

console.log("\nAll tests done");
