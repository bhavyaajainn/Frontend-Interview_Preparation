// Create a Function to Truncate String
//
// truncate(str, maxLength) — if str.length > maxLength, slice str to maxLength
// characters and append "..." at the end. Otherwise return str as-is.
//
// Note: the final string is str.slice(0, maxLength) + "..." — it does NOT fit
// within maxLength; maxLength is the number of original characters to keep.

const truncate = (str, maxLength = 0) => {
  // TODO: if !maxLength or str.length <= maxLength → return str unchanged
  // TODO: return str.slice(0, maxLength) + "..."
  if (!maxLength || str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// TC1: article example
test(
  "TC1: truncates long string and appends ellipsis",
  truncate("What I'd like to tell on this topic is:", 20),
  "What I'd like to tel...",
);

// TC2: string shorter than maxLength — returned unchanged
test(
  "TC2: string shorter than maxLength returned as-is",
  truncate("Hello", 20),
  "Hello",
);

// TC3: string exactly equal to maxLength — returned unchanged
test(
  "TC3: string length === maxLength returned as-is",
  truncate("Hello", 5),
  "Hello",
);

// TC4: maxLength = 0 — return string as-is (no truncation)
test(
  "TC4: maxLength=0 returns string unchanged",
  truncate("Hello", 0),
  "Hello",
);

// TC5: maxLength = 1
test("TC5: maxLength=1 keeps first character", truncate("Hello", 1), "H...");

// TC6: empty string
test("TC6: empty string returned as-is", truncate("", 5), "");

// TC7: string with spaces
test(
  "TC7: truncates preserving spaces",
  truncate("one two three", 7),
  "one two...",
);

// TC8: exact ellipsis boundary — maxLength = string.length - 1
test(
  "TC8: maxLength one less than string length",
  truncate("Hello!", 5),
  "Hello...",
);

// TC9: maxLength larger than string — no ellipsis
test(
  "TC9: maxLength much larger than string — no ellipsis",
  truncate("Hi", 100),
  "Hi",
);

// TC10: unicode-safe (ASCII only — slice works by character index)
test(
  "TC10: truncates at correct character boundary",
  truncate("abcdefghij", 4),
  "abcd...",
);

console.log("\nAll tests done");
