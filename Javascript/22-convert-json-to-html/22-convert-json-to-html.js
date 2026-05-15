// Convert JSON to HTML
// Asked in Meta's frontend interview
// Run in browser — uses document.createElement / createDocumentFragment

const JSONtoHTML = (json) => {
  // TODO
  const fragment = document.createDocumentFragment();
  if (Array.isArray(json)) {
    for (let entry of json) {
      const element = document.createElement(entry.type);
      if (entry.props) {
        for (let key of entry.props) {
          element.setAttributes(key, entry.props[key]);
        }
      }
      if (Array.isArray(entry.children)) {
        for (let child of entry.child) {
          element.appendChild(JSONtoHTML(child));
        }
      } else {
        element.innerText = entry.children;
      }
      fragment.appendChild(element);
    }
  } else {
    JSONtoHTML([json]);
  }
  return fragment;
};

// --- Tests (browser only) ---
// Run this file in browser devtools or an HTML script tag

if (typeof document === "undefined") {
  console.log("SKIP: JSONtoHTML tests require a browser environment");
} else {
  let passed = 0,
    failed = 0;
  function test(name, actual, expected) {
    const ok = actual === expected;
    console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
    if (!ok) {
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${actual}`);
    }
    ok ? passed++ : failed++;
  }

  // Test 1 — single object produces correct outerHTML
  const jsonSingle = {
    type: "div",
    props: { id: "hello", class: "foo" },
    children: [
      { type: "h1", children: "HELLO" },
      {
        type: "p",
        children: [
          { type: "span", props: { class: "bar" }, children: "World" },
        ],
      },
    ],
  };
  const el1 = JSONtoHTML(jsonSingle);
  test("TC1: root tag is div", el1.tagName.toLowerCase(), "div");
  test("TC1: id attribute set", el1.getAttribute("id"), "hello");
  test("TC1: class attribute set", el1.getAttribute("class"), "foo");
  test(
    "TC1: first child is h1 with text HELLO",
    el1.children[0].outerHTML,
    "<h1>HELLO</h1>",
  );
  test(
    "TC1: second child p contains span",
    el1.children[1].querySelector("span").textContent,
    "World",
  );

  // Test 2 — array input returns a fragment with multiple children
  const jsonArray = [
    {
      type: "div",
      props: { id: "d1" },
      children: [{ type: "span", children: "A" }],
    },
    {
      type: "section",
      props: { id: "s1" },
      children: [{ type: "span", children: "B" }],
    },
  ];
  const frag = JSONtoHTML(jsonArray);
  const wrapper = document.createElement("div");
  wrapper.appendChild(frag.cloneNode(true));
  test("TC2: fragment has 2 top-level children", wrapper.children.length, 2);
  test("TC2: first child is div#d1", wrapper.children[0].id, "d1");
  test("TC2: second child is section#s1", wrapper.children[1].id, "s1");

  // Test 3 — string children become text content
  const jsonText = { type: "p", children: "Hello World" };
  const el3 = JSONtoHTML(jsonText);
  test(
    "TC3: string children set as text content",
    el3.textContent,
    "Hello World",
  );

  console.log(`\n${passed} passed, ${failed} failed`);
}
