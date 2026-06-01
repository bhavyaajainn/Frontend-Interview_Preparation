// Memoize a Function - Part 2
//
// memoize(fn) — trie-based memoization that correctly handles:
//   - Primitive arguments (cached by value via Map)
//   - Object/array arguments (cached by REFERENCE via WeakMap)
//   - Mixed argument types
//   - Multiple arguments (one trie level per argument)
//   - No arguments
//
// Unlike JSON.stringify approach:
//   - Objects are compared by identity, not value
//   - Functions work as arguments (no stringify errors)
//   - WeakMap allows garbage collection of unused cache entries

function memoize(fn) {
  // Root cache node shape:
  // { primitives: Map, objects: WeakMap, hasResult: bool, result: any }
  // TODO: create root cache node
  // TODO: return function(...args):
  //         let node = cache (root)
  //         for each arg:
  //           if typeof arg === 'object' && arg !== null:
  //             use node.objects (WeakMap); create child node if missing
  //           else:
  //             use node.primitives (Map); create child node if missing
  //           node = child node
  //         if node.hasResult → return node.result (cache hit)
  //         else → compute fn(...args), set node.hasResult=true, node.result=result, return result
  const cache = {
    primitives: new Map(),
    objects: new WeakMap(),
    hasResult: false,
    result: undefined,
  };
  return function (...args) {
    let node = cache;
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const isObject = typeof arg == "object" && arg != null;
      if (isObject) {
        if (!node.objects.has(arg)) {
          node.objects.set(arg, {
            primitives: new Map(),
            objects: new WeakMap(),
            hasResult: false,
            result: undefined,
          });
        }
        node = node.objects.get(arg);
      } else {
        if (!node.primitives.has(arg)) {
          node.primitives.set(arg, {
            primitives: new Map(),
            objects: new WeakMap(),
            hasResult: false,
            result: undefined,
          });
        }
        node = node.primitives.get(arg);
      }
    }
    if (node.hasResult) {
      return node.result;
    }
    const result = fn.apply(this, args);
    node.hasResult = true;
    node.result = result;
    return result;
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// ── Primitive arguments ───────────────────────────────────────────────────────

let callCount = 0;
const add = memoize((a, b, c) => {
  callCount++;
  return a + b + c;
});

test("PRIM TC1: correct result on first call", add(1, 2, 3), 6);
test("PRIM TC2: correct result on second call", add(1, 2, 3), 6);
callCount = 0;
add(1, 2, 3);
test("PRIM TC3: fn not called on cache hit", callCount, 0);

callCount = 0;
add(1, 2, 4);
test("PRIM TC4: different args → cache miss", callCount, 1);
test("PRIM TC5: different args → different result", add(1, 2, 4), 7);

// ── Object arguments — identity-based ────────────────────────────────────────

callCount = 0;
const obj1 = { id: 1 };
const obj2 = { id: 1 }; // same content, different reference

const procObj = memoize((obj, mult) => {
  callCount++;
  return obj.id * mult;
});

test("OBJ TC1: first call is cache miss", procObj(obj1, 5), 5);
callCount = 0;
procObj(obj1, 5);
test("OBJ TC2: same reference → cache hit (fn not called)", callCount, 0);

callCount = 0;
procObj(obj2, 5);
test("OBJ TC3: different reference (same content) → cache miss", callCount, 1);

callCount = 0;
procObj(obj1, 10);
test("OBJ TC4: same ref, different primitive arg → cache miss", callCount, 1);
test(
  "OBJ TC5: correct result with different multiplier",
  procObj(obj1, 10),
  10,
);

// ── Mixed args ────────────────────────────────────────────────────────────────

callCount = 0;
const person1 = { name: "Alice" };
const person2 = { name: "Bob" };
const mixedFn = memoize((num, str, obj, bool) => {
  callCount++;
  return `${num}-${str}-${obj.name}-${bool}`;
});

test(
  "MIX TC1: first call result correct",
  mixedFn(1, "test", person1, true),
  "1-test-Alice-true",
);
callCount = 0;
mixedFn(1, "test", person1, true);
test("MIX TC2: same args → cache hit", callCount, 0);

callCount = 0;
mixedFn(1, "test", person2, true);
test("MIX TC3: different object reference → cache miss", callCount, 1);

callCount = 0;
mixedFn(1, "test", person1, false);
test("MIX TC4: different boolean → cache miss", callCount, 1);

// ── No arguments ──────────────────────────────────────────────────────────────

let noArgCount = 0;
const noArgFn = memoize(() => {
  noArgCount++;
  return 42;
});
noArgFn();
noArgCount = 0;
noArgFn();
test("NOARG TC1: no-arg function is cached", noArgCount, 0);
test("NOARG TC2: no-arg returns correct value", noArgFn(), 42);

// ── Object identity vs JSON stringify ─────────────────────────────────────────

callCount = 0;
const identityFn = memoize((o) => {
  callCount++;
  return o.x;
});
const a = { x: 1 };
const b = { x: 1 }; // same structure, different reference

identityFn(a);
callCount = 0;
identityFn(b);
test(
  "IDENT TC1: same content, different ref → cache miss (identity semantics)",
  callCount,
  1,
);
callCount = 0;
identityFn(a);
test("IDENT TC2: same reference → cache hit", callCount, 0);

// ── Fibonacci (recursive memoization) ─────────────────────────────────────────

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

test("FIB TC1: fibonacci(10) = 55", fibonacci(10), 55);
callCount = 0;
const fibTracked = memoize((n) => {
  callCount++;
  return n <= 1 ? n : fibTracked(n - 1) + fibTracked(n - 2);
});
fibTracked(5);
const firstCallCount = callCount;
callCount = 0;
fibTracked(5);
test("FIB TC2: second call to fib(5) is fully cached (0 calls)", callCount, 0);

console.log("\nAll tests done");
