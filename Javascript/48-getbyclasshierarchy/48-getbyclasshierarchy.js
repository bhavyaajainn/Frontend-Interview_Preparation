// Implement getByClassNameHierarchy()
// getByClassNameHierarchy(element, classPath) — returns all elements that satisfy
// the full "a>b>c" class hierarchy, starting from `element`.

function getByClassNameHierarchy(element, classPath) {
  const classList = classPath.split(">");
  const result = [];
  // TODO: implement traverseDOM helper (element, classList, index, result)
  //       - base case: element is null → return
  //       - if index === classList.length - 1 and element has the class → push + return
  //       - for each child: if child has classList[index], recurse with index+1
  //                         else recurse with index 0
  traverseDOM(element, classList, 0, result);
  return result;
}

function traverseDOM(element, classNames, index, result) {
  // TODO
  if (!element) {
    return;
  }
  const currentClass = classNames[index];

  if (
    index == classNames.length - 1 &&
    element.classList.contains(currentClass)
  ) {
    result.push(element);
    for (const ele of element.children) {
      traverseDOM(ele, classNames, 0, result);
    }
    return;
  }
  for (const ele of element.children) {
    if (element.classList.contains(currentClass)) {
      traverseDOM(ele, classNames, index + 1, result);
    } else {
      traverseDOM(ele, classNames, 0, result);
    }
  }
}

// --- Test helpers ---

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
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

function ids(nodes) {
  return nodes.map((n) => n.id);
}

// --- Tests ---

// TC1: standard path — a>b>c across two b branches
//
// root.a
//  ├─ b-1.b
//  │    ├─ c-1.c
//  │    └─ c-2.c
//  └─ b-2.b
//       └─ c-3.c

const c1 = node("c-1", ["c"]);
const c2 = node("c-2", ["c"]);
const c3 = node("c-3", ["c"]);
const b1 = node("b-1", ["b"], [c1, c2]);
const b2 = node("b-2", ["b"], [c3]);
const root = node("root", ["a"], [b1, b2]);

test(
  "TC1: a>b>c finds all c nodes under a>b",
  ids(getByClassNameHierarchy(root, "a>b>c")),
  ["c-1", "c-2", "c-3"],
);

// TC2: element with class "c" not under "b" is excluded
//
// root.a
//  ├─ b-1.b  →  c-1.c
//  └─ c-X.c       ← direct child of a, not under b — should NOT match
const cX = node("c-X", ["c"]);
const root2 = node(
  "root2",
  ["a"],
  [node("b-1", ["b"], [node("c-1", ["c"])]), cX],
);

test(
  "TC2: c-node directly under a (skipping b) is excluded",
  ids(getByClassNameHierarchy(root2, "a>b>c")),
  ["c-1"],
);

// TC3: no elements match the full path
const root3 = node("root3", ["x"], [node("y-1", ["y"], [node("z-1", ["z"])])]);
test(
  "TC3: no match returns []",
  ids(getByClassNameHierarchy(root3, "a>b>c")),
  [],
);

// TC4: single-class path — behaves like findByClass from root
const root4 = node("root4", ["a"], [node("a-1", ["a"]), node("b-1", ["b"])]);
test(
  "TC4: single-class path matches root and nested node",
  ids(getByClassNameHierarchy(root4, "a")),
  ["root4", "a-1"],
);

// TC5: two-level path
//
// root5.a
//  ├─ b-1.b  ← match
//  └─ c-1.c  ← not b, no match
const root5 = node("root5", ["a"], [node("b-1", ["b"]), node("c-1", ["c"])]);
test(
  "TC5: two-level a>b returns only b children",
  ids(getByClassNameHierarchy(root5, "a>b")),
  ["b-1"],
);

// TC6: deeply nested path a>b>c>d
const d1 = node("d-1", ["d"]);
const root6 = node(
  "root6",
  ["a"],
  [node("b-1", ["b"], [node("c-1", ["c"], [d1])])],
);
test(
  "TC6: three-level deep path a>b>c>d",
  ids(getByClassNameHierarchy(root6, "a>b>c>d")),
  ["d-1"],
);

// TC7: root element itself does not match the first class — returns []
const root7 = node("root7", ["x"], [node("b-1", ["b"], [node("c-1", ["c"])])]);
test(
  "TC7: root missing first class in path returns []",
  ids(getByClassNameHierarchy(root7, "a>b>c")),
  [],
);

console.log("\nAll tests done");
