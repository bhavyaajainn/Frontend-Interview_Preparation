// Get Object Value from String Path
// Polyfill for lodash _.get(object, path, defaultValue?)
// Accepts dot-notation strings ("a.b.c"), bracket notation ("a.b[0]"), or array paths (["a","b","c"])

const get = (obj, path, defaultValue = undefined) => {
  // TODO
  // if path is not a string or array of string
  if (path === "" || path.length == 0) return undefined;

  // if path is an array, concatenate it and form a string
  // to handle a single case of string
  if (Array.isArray(path)) path = path.join(".");

  // filter out the brackets and dot
  let exactPath = [];
  for (let i = 0; i < path.length; i++) {
    if (path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
      exactPath.push(path[i]);
    }
  }

  // get the value of the path in the sequence
  const value = exactPath.reduce((source, path) => source[path], obj);

  // if not found return undefined
  return value ? value : undefined;
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

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

// TC1 — dot-notation: returns a nested object
test("TC1: dot-notation returning array", get(obj, "a.b.c"), [1, 2, 3]);

// TC2 — dot-notation index access on array
test("TC2: dot-notation array index", get(obj, "a.b.c.0"), 1);

// TC3 — bracket notation
test("TC3: bracket notation index", get(obj, "a.b.c[1]"), 2);
// TC4 — mixed bracket + dot
test("TC4: mixed bracket and dot", get(obj, "a.b.c[2]"), 3);

// TC5 — array of strings as path
test("TC5: array path", get(obj, ["a", "b", "c", "2"]), 3);

// TC6 — path that doesn't exist returns undefined
test("TC6: missing path → undefined", get(obj, "a.b.z"), undefined);

// TC7 — out-of-bounds array index returns undefined
test("TC7: out-of-bounds index → undefined", get(obj, "a.b.c[3]"), undefined);

// TC8 — empty path returns undefined
test("TC8: empty string path → undefined", get(obj, ""), undefined);

console.log("\nAll tests done");
