// Polyfill for getElementsByClassName()
// findByClass(className) — returns all elements in the DOM (from document.body)
// whose classList contains `className`, in DFS (depth-first) order.

function findByClass(className) {
  const root = document.body;
  // TODO: implement DFS traversal from root
  // TODO: use node.classList.contains(className) to check each node
  // TODO: recurse into node.children for each element
  function search(node) {
    let result = [];
    if (node.classList.contains(className)) {
      result.push(node);
    }
    for (const ele of node.children) {
      const res = search(ele);
      result = result.concat(res);
    }
    return result;
  }
  return search(root);
}

// --- Test helpers ---
// Mock DOM nodes for Node.js (no real browser DOM available)

function node(id, classes, children = []) {
  return {
    id,
    classList: { contains: (cls) => classes.includes(cls) },
    children,
  };
}

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected ids: ${JSON.stringify(expected)}`);
    console.log(`  Got ids:      ${JSON.stringify(actual)}`);
  }
}

function ids(nodes) {
  return nodes.map((n) => n.id);
}

// --- Tests ---

// TC1: basic DFS — root + nested nodes with class 'a'
//
// body
//  └─ root.a
//      └─ b-1.b
//          ├─ a-2.a
//          │    └─ d-1.d
//          └─ c-1.c
//               └─ a-3.a
//                    └─ d-2.d

const d1 = node("d-1", ["d"]);
const d2 = node("d-2", ["d"]);
const a2 = node("a-2", ["a"], [d1]);
const a3 = node("a-3", ["a"], [d2]);
const c1 = node("c-1", ["c"], [a3]);
const b1 = node("b-1", ["b"], [a2, c1]);
const root = node("root", ["a"], [b1]);
const body = node("body", [], [root]);

// Patch document.body for the tests
globalThis.document = { body };

test(
  'TC1: finds all nodes with class "a" in DFS order',
  ids(findByClass("a")),
  ["root", "a-2", "a-3"],
);

// TC2: no nodes match — returns empty array
test(
  "TC2: returns [] when no element has the class",
  ids(findByClass("z")),
  [],
);

// TC3: class present only on leaf nodes
test('TC3: finds only leaf nodes with class "d"', ids(findByClass("d")), [
  "d-1",
  "d-2",
]);

// TC4: class present on a single node
test('TC4: finds exactly one node with class "c"', ids(findByClass("c")), [
  "c-1",
]);

// TC5: element with multiple classes matches on any class
const multi = node("m-1", ["foo", "bar", "baz"]);
const bodyMulti = node("body", [], [multi]);
globalThis.document = { body: bodyMulti };

test(
  "TC5: multi-class element matched by any of its classes",
  ids(findByClass("bar")),
  ["m-1"],
);

// TC6: deeply nested single match
const deep = node("deep", ["x"], [node("mid", ["y"], [node("leaf", ["x"])])]);
globalThis.document = { body: node("body", [], [deep]) };

test(
  "TC6: DFS order — parent before child when both match",
  ids(findByClass("x")),
  ["deep", "leaf"],
);

// TC7: empty body — returns []
globalThis.document = { body: node("body", [], []) };
test("TC7: empty body returns []", ids(findByClass("a")), []);

console.log("\nAll tests done");
