// Polyfill for ClassNames (classnames npm package)
// Compose CSS class strings from strings, numbers, objects, and arrays

function appendClass(existingClasses, newClass) {
  // TODO
  if (!newClass) {
    return existingClasses;
  }
  existingClasses = existingClasses + " " + newClass;
  return existingClasses;
}

function processArg(arg) {
  // TODO
  if (!arg) {
    return "";
  }
  if (typeof arg == "string") {
    return arg;
  } else if (Array.isArray(arg)) {
    return ClassNames(...arg);
  } else if (typeof arg == "object") {
    let objectAns = "";
    for (const [key, value] of Object.entries(arg)) {
      if (value && arg.hasOwnProperty(key)) {
        objectAns = objectAns + " " + key.toString();
      }
    }
    return objectAns.trim();
  } else {
    return arg.toString();
  }
}

function ClassNames(...args) {
  // TODO
  let ans = "";
  for (const ele of args) {
    let newClass = processArg(ele);

    ans = appendClass(ans, newClass);
  }
  return ans.trim();
}

// --- Tests ---

function test(label, result, expected) {
  console.log(
    `[ClassNames] ${label}: ${result === expected ? "Success" : `Fail (got "${result}", expected "${expected}")`}`,
  );
}

test("two strings", ClassNames("foo", "bar"), "foo bar");
test("string + truthy object", ClassNames("foo", { bar: true }), "foo bar");
test("truthy object key", ClassNames({ "foo-bar": true }), "foo-bar");
test("falsy object key", ClassNames({ "foo-bar": false }), "");
test("two objects", ClassNames({ foo: true }, { bar: true }), "foo bar");
test("mixed object keys", ClassNames({ foo: true, bar: true }), "foo bar");
test(
  "mixed types",
  ClassNames("foo", { bar: true, duck: false }, "baz", { quux: true }),
  "foo bar baz quux",
);
test(
  "falsy values ignored",
  ClassNames(null, false, "bar", undefined, 0, 1, { baz: null }, ""),
  "bar 1",
);
test("array argument", ClassNames("a", ["b", { c: true, d: false }]), "a b c");
test(
  "template literal key",
  ClassNames({ [`btn-primary`]: true }),
  "btn-primary",
);
test("empty call", ClassNames(), "");
test("only falsy values", ClassNames(null, false, undefined, 0, ""), "");
