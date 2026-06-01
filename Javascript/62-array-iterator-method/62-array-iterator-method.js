// Array Iterator Method
// helper(array) — returns an iterator object with two methods:
//   next() → returns the next element in the array, or null when exhausted
//   done() → returns true if all elements have been consumed, false otherwise

const helper = (array) => {
  // TODO: track current index with a closure variable
  // TODO: return object with:
  //         next() — return array[index] and advance, or null if exhausted
  //         done() — return true if index >= array.length
  let index = 0;
  return {
    next() {
      return index <= array.length - 1 ? array[index++] : null;
    },
    done() {
      return index >= array.length;
    },
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

// --- Basic iteration ---

const it1 = helper([1, 2, "hello"]);

test("BASIC TC1: first next() returns first element", it1.next(), 1);
test("BASIC TC2: second next() returns second element", it1.next(), 2);
test(
  "BASIC TC3: done() is false before last element consumed",
  it1.done(),
  false,
);
test("BASIC TC4: third next() returns third element", it1.next(), "hello");
test("BASIC TC5: done() is true after all elements consumed", it1.done(), true);
test("BASIC TC6: next() returns null when exhausted", it1.next(), null);

// --- Single element array ---

const it2 = helper([42]);

test("SINGLE TC1: done() is false before consuming", it2.done(), false);
test("SINGLE TC2: next() returns the only element", it2.next(), 42);
test("SINGLE TC3: done() is true after consuming", it2.done(), true);
test("SINGLE TC4: next() returns null after exhaustion", it2.next(), null);

// --- Empty array ---

const it3 = helper([]);

test("EMPTY TC1: done() is true immediately", it3.done(), true);
test("EMPTY TC2: next() returns null immediately", it3.next(), null);

// --- Multiple iterators are independent ---

const it4 = helper([10, 20]);
const it5 = helper([10, 20]);

it4.next(); // advance it4 once
test("INDEP TC1: it5.next() is unaffected by it4 advancement", it5.next(), 10);
test("INDEP TC2: it4 continues from its own position", it4.next(), 20);

// --- Mixed types ---

const it6 = helper([null, false, 0, ""]);

test("MIXED TC1: null value returned correctly", it6.next(), null);
test("MIXED TC2: false value returned correctly", it6.next(), false);
test("MIXED TC3: 0 value returned correctly", it6.next(), 0);
test("MIXED TC4: empty string returned correctly", it6.next(), "");
test("MIXED TC5: done() after all mixed values consumed", it6.done(), true);

console.log("\nAll tests done");
