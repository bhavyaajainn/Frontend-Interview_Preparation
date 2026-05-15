// HTML Encoding of a String
// Given a string and style ranges [start, end, tag], return the HTML-encoded string
// Ranges use exclusive end: [start, end) covers chars at indices start..end-1

function parse(str, markups) {
  const n = str.length;
  const opens = Array.from({ length: n + 1 }, () => []);
  const closes = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < markups.length; i++) {
    const [start, end, tag] = markups[i];
    opens[start].push({ tag, id: i });
    closes[end].push({ tag, id: i });
  }

  let result = "";
  const stack = []; // { tag, id }

  for (let i = 0; i <= n; i++) {
    // Close tags whose range ends here
    if (closes[i].length > 0) {
      const toCloseIds = new Set(closes[i].map((c) => c.id));

      const reopened = [];

      // Pop until all required tags are closed
      while (stack.length) {
        const top = stack.pop();

        result += `</${top.tag}>`;

        // If this tag should continue later, remember it
        if (!toCloseIds.has(top.id)) {
          reopened.unshift(top);
        }

        // Stop once we've closed one of the target tags
        else if (
          ![...toCloseIds].some((id) => stack.some((s) => s.id === id))
        ) {
          break;
        }
      }

      // Reopen surviving tags
      for (const tag of reopened) {
        result += `<${tag.tag}>`;
        stack.push(tag);
      }
    }

    // Open tags whose range starts here (preserve markups array order)
    for (const o of opens[i]) {
      result += `<${o.tag}>`;
      stack.push(o);
    }

    if (i < n) result += str[i];
  }

  return result;
}

// --- Tests ---

let passed = 0;
let failed = 0;

function test(label, actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${label}`);
    passed++;
  } else {
    console.log(`FAIL: ${label}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual:   ${actual}`);
    failed++;
  }
}

// Basic overlapping tags
test(
  "overlapping i, b, u tags",
  parse("Hello, World", [
    [0, 2, "i"],
    [7, 10, "u"],
    [4, 9, "b"],
    [2, 7, "i"],
    [7, 9, "u"],
  ]),
  "<i>He</i><i>ll<b>o, </b></i><b><u><u>Wo</u></u></b><u>r</u>ld",
);

// No markups — plain string returned as-is
test("no markups", parse("Hello", []), "Hello");

// Single tag wrapping full string
test("single tag full string", parse("Hello", [[0, 5, "b"]]), "<b>Hello</b>");

// Single tag wrapping part of string
test(
  "single tag partial",
  parse("Hello World", [[6, 11, "b"]]),
  "Hello <b>World</b>",
);

// Nested identical tags
test(
  "nested same tag",
  parse("abcde", [
    [0, 5, "i"],
    [1, 4, "i"],
  ]),
  "<i>a<i>bcd</i>e</i>",
);

// Adjacent non-overlapping tags
test(
  "adjacent non-overlapping tags",
  parse("abcdef", [
    [0, 3, "b"],
    [3, 6, "i"],
  ]),
  "<b>abc</b><i>def</i>",
);

// Tag on single character
test("single character tag", parse("abc", [[1, 2, "u"]]), "a<u>b</u>c");

// Empty string
test("empty string no markups", parse("", []), "");

// Tag spanning entire single-char string
test("single char string fully tagged", parse("x", [[0, 1, "b"]]), "<b>x</b>");

// Multiple tags starting at same index
test(
  "multiple tags same start",
  parse("Hello", [
    [0, 3, "b"],
    [0, 5, "i"],
  ]),
  "<b><i>Hel</i></b><i>lo</i>",
);

// Multiple tags ending at same index
test(
  "multiple tags same end",
  parse("Hello", [
    [0, 5, "b"],
    [2, 5, "i"],
  ]),
  "<b>He<i>llo</i></b>",
);

console.log(`\n${passed} passed, ${failed} failed`);
