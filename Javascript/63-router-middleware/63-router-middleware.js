// Implement a Router Middleware
// RouterMiddleWare() — constructor that creates a router instance with:
//   addRoute(path, value)  — register a path → value mapping (supports wildcard *)
//   callRoute(path)        — return value for path; exact match takes priority over wildcard
//   wildcardMatch(text, pattern) — returns true if text matches pattern (* = any segment)

const RouterMiddleWare = function () {
  // TODO: create a Map store to hold path → value mappings
  this.map = {};

  this.addRoute = function (path, value) {
    // TODO: store the path → value in the map
    this.map[path] = value;
  };

  this.callRoute = function (path) {
    // TODO: check for an exact match first, return it if found
    // TODO: iterate over stored keys and use wildcardMatch to find first match
    // TODO: return null if nothing matches
    const keys = Object.keys(this.map);
    for (let key of keys) {
      if (key === path || this.wildcardMatch(path, key)) {
        return this.map[key];
      }
    }
    return null;
  };

  this.wildcardMatch = function (text, pattern) {
    // TODO: build a RegExp from pattern:
    //         escape forward slashes, replace ? with ., replace * with .*
    //         anchor with ^ and $
    // TODO: return whether the regex matches text
    const regexPattern = new RegExp(
      "^" + pattern.replace(/\?/g, ".").replace(/\*/g, ".*") + "$",
    );
    return regexPattern.test(text);
  };
};

// --- Tests ---

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// --- Exact match ---

const r1 = new RouterMiddleWare();
r1.addRoute("/bar", "result");

test("EXACT TC1: known path returns value", r1.callRoute("/bar"), "result");
test("EXACT TC2: unknown path returns null", r1.callRoute("/baz"), null);

// --- Multiple exact routes ---

const r2 = new RouterMiddleWare();
r2.addRoute("/foo", "foo-result");
r2.addRoute("/bar", "bar-result");

test("EXACT TC3: first route", r2.callRoute("/foo"), "foo-result");
test("EXACT TC4: second route", r2.callRoute("/bar"), "bar-result");

// --- Wildcard * ---

const r3 = new RouterMiddleWare();
r3.addRoute("/bar/*/baz", "bar");

test(
  "WILD TC1: wildcard matches single segment",
  r3.callRoute("/bar/a/baz"),
  "bar",
);
test(
  "WILD TC2: wildcard matches another single segment",
  r3.callRoute("/bar/xyz/baz"),
  "bar",
);
test(
  "WILD TC3: non-matching path returns null",
  r3.callRoute("/bar/a/qux"),
  null,
);

// --- Exact takes priority over wildcard ---

const r4 = new RouterMiddleWare();
r4.addRoute("/foo/baz", "foo");
r4.addRoute("/foo/*", "bar");

test("PRIO TC1: exact match beats wildcard", r4.callRoute("/foo/baz"), "foo");
test(
  "PRIO TC2: wildcard fires when no exact match",
  r4.callRoute("/foo/bar"),
  "bar",
);

// --- Wildcard-first order (no exact priority) ---

const r5 = new RouterMiddleWare();
r5.addRoute("/foo/*", "bar");
r5.addRoute("/foo/baz", "foo");

test(
  "ORDER TC1: first-added wildcard wins when it matches",
  r5.callRoute("/foo/baz"),
  "bar",
);
test(
  "ORDER TC2: wildcard still matches other paths",
  r5.callRoute("/foo/qux"),
  "bar",
);

// --- Deeper wildcard ---

const r6 = new RouterMiddleWare();
r6.addRoute("/api/*/users/*", "users");

test(
  "DEEP TC1: two wildcard segments match",
  r6.callRoute("/api/v1/users/42"),
  "users",
);
test(
  "DEEP TC2: mismatched depth returns null",
  r6.callRoute("/api/v1/users"),
  null,
);

// --- Edge cases ---

const r7 = new RouterMiddleWare();
r7.addRoute("/*", "catch-all");

test(
  "EDGE TC1: root wildcard matches any single segment",
  r7.callRoute("/anything"),
  "catch-all",
);

const r8 = new RouterMiddleWare();
test("EDGE TC2: empty router returns null", r8.callRoute("/foo"), null);

console.log("\nAll tests done");
