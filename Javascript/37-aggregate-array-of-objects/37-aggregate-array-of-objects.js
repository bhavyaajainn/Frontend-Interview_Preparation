// Aggregate Array of Objects on the Given Keys
// aggregate(arr, on, who) — group unique values of "on", collecting "who" values into an array

const aggregate = (arr, on, who) => {
  // TODO
  const map = new Map();
  for (let obj of arr) {
    const groupKey = obj[on];
    const value = obj[who];
    if (map.has(groupKey)) {
      map.get(groupKey)[who].push(value);
    } else {
      map.set(groupKey, { [on]: groupKey, [who]: [value] });
    }
  }
  return [...map.values()];
};

// --- Tests ---

function test(name, actual, expected) {
  // normalise: sort outer array by "on" value, sort inner "who" arrays
  const normalise = (arr) =>
    [...arr]
      .map((obj) => ({
        ...obj,
        [Object.keys(obj).find((k) => Array.isArray(obj[k]))]: [
          ...obj[Object.keys(obj).find((k) => Array.isArray(obj[k]))],
        ].sort(),
      }))
      .sort((a, b) => {
        const keyA = Object.values(a).find((v) => !Array.isArray(v));
        const keyB = Object.values(b).find((v) => !Array.isArray(v));
        return String(keyA).localeCompare(String(keyB));
      });

  const ok =
    JSON.stringify(normalise(actual)) === JSON.stringify(normalise(expected));
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(normalise(expected))}`);
    console.log(`  Got:      ${JSON.stringify(normalise(actual))}`);
  }
}

const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];

// TC1 — aggregate by skill: each skill → list of users
test("TC1: aggregate by skill", aggregate(endorsements, "skill", "user"), [
  { skill: "css", user: ["Bill", "Sue"] },
  { skill: "javascript", user: ["Chad", "Bill", "Sue"] },
  { skill: "html", user: ["Sue"] },
]);

// TC2 — aggregate by user: each user → list of skills
test("TC2: aggregate by user", aggregate(endorsements, "user", "skill"), [
  { user: "Bill", skill: ["css", "javascript"] },
  { user: "Chad", skill: ["javascript"] },
  { user: "Sue", skill: ["css", "javascript", "html"] },
]);

// TC3 — all items share the same "on" value → single group with all "who" values
test(
  'TC3: all same "on" key → one group',
  aggregate(
    [
      { k: "x", v: "a" },
      { k: "x", v: "b" },
      { k: "x", v: "c" },
    ],
    "k",
    "v",
  ),
  [{ k: "x", v: ["a", "b", "c"] }],
);

// TC4 — all unique "on" values → no merging, each group has one element
test(
  'TC4: all unique "on" keys → no merging',
  aggregate(
    [
      { k: "a", v: "1" },
      { k: "b", v: "2" },
      { k: "c", v: "3" },
    ],
    "k",
    "v",
  ),
  [
    { k: "a", v: ["1"] },
    { k: "b", v: ["2"] },
    { k: "c", v: ["3"] },
  ],
);

// TC5 — empty array → empty array
test("TC5: empty array returns []", aggregate([], "skill", "user"), []);

// TC6 — single element → one group with one item
test(
  "TC6: single element",
  aggregate([{ skill: "css", user: "Bill" }], "skill", "user"),
  [{ skill: "css", user: ["Bill"] }],
);

console.log("\nAll tests done");
