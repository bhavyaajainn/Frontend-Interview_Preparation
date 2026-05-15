// Highlight words in a string
// Given a string and keywords array, wrap matching words/subwords in <strong> tags
// Adjacent/overlapping keyword matches are combined into one <strong> block

function highlight(str, keywords) {
  // TODO
  if (!str.length) {
    return str;
  }
  const arr = str.split(" ");
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (keywords.includes(arr[i])) {
      ans.push(`<strong>${arr[i]}</strong>`);
    } else {
      let matched = false;
      let output = "";
      for (let j = 0; j < arr[i].length; j++) {
        const prefix = arr[i].slice(0, j + 1);
        const suffix = arr[i].slice(j + 1);
        if (keywords.includes(suffix) && keywords.includes(prefix)) {
          output = `<strong>${prefix}${suffix}</strong>`;
          matched = true;
          break;
        } else if (!keywords.includes(suffix) && keywords.includes(prefix)) {
          output = `<strong>${prefix}</strong>${suffix}`;
          matched = true;
        } else if (keywords.includes(suffix) && !keywords.includes(prefix)) {
          output = `${prefix}<strong>${suffix}</strong>`;
          matched = true;
        }
      }
      if (!matched) ans.push(arr[i]);
      else {
        ans.push(output);
      }
    }
  }
  return ans.join(" ");
}

// --- Tests ---

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

test(
  "adjacent keywords merge into one block",
  highlight("Ultimate JavaScript / FrontEnd Guide", [
    "Front",
    "End",
    "JavaScript",
  ]),
  "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide",
);
test(
  "no match returns original string",
  highlight("hello world", ["foo"]),
  "hello world",
);
test(
  "full string match",
  highlight("hello", ["hello"]),
  "<strong>hello</strong>",
);
test(
  "multiple separate matches",
  highlight("foo bar baz", ["foo", "baz"]),
  "<strong>foo</strong> bar <strong>baz</strong>",
);
test(
  "match at end of string",
  highlight("say hello world", ["world"]),
  "say hello <strong>world</strong>",
);
test("empty keywords array", highlight("hello world", []), "hello world");

console.log(`\n${passed} passed, ${failed} failed`);
