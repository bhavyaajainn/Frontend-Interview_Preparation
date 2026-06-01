// Aggregate Array of Objects - Part 2
//
// processRecords(activities) — groups activity records by userId with:
//   1. Durations summed across records with the same user
//   2. Equipment arrays merged, deduplicated, and sorted lexicographically
//   3. First-appearance order of users preserved in the output array
//
// Two approaches:
//   Approach 1 — Array accumulator (article): use reduce with [] and Array.find
//   Approach 2 — Object accumulator (optimised): use reduce with {} keyed by user,
//                then convert to array with Object.values()

// Approach 1 — Array accumulator
const processRecords = (activities) => {
  // TODO: activities.reduce((outputObj, { user, equipment, duration }) => {
  //         check if user already in outputObj with .find()
  //         if not: push new entry with deduped+sorted equipment
  //         if yes: create newObj summing duration and merging+deduping+sorting equipment
  //                 filter out old entry, spread in newObj
  //       }, [])
  return activities.reduce((outputObj, currentArrayElement) => {
    const { user, equipment, duration } = currentArrayElement;
    const userInOutput = outputObj.find((e) => e.user == user);
    if (!userInOutput) {
      return [
        ...outputObj,
        {
          user,
          duration,
          equipment: equipment
            .filter((value, index, self) => self.indexOf(value) == index)
            .sort(),
        },
      ];
    }
    const newObj = {
      user,
      duration: duration + userInOutput.duration,
      equipment: [...equipment, ...userInOutput.equipment]
        .filter((value, index, self) => self.indexOf(value) == index)
        .sort(),
    };

    return outputObj.map((e) => (e.user === user ? newObj : e));
  }, []);
};

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const activities = [
  { user: 8, duration: 50, equipment: ["study"] },
  { user: 7, duration: 150, equipment: ["running", "running"] },
  { user: 1, duration: 10, equipment: ["eating", "eating"] },
  { user: 7, duration: 100, equipment: ["gyming", "coding"] },
  { user: 7, duration: 200, equipment: ["biking", "gyming", "coding"] },
  { user: 2, duration: 200, equipment: ["cocking"] },
  { user: 2, duration: 200, equipment: ["biking"] },
];

// Article expected output (order: 8, 7, 1, 2 — first-appearance)
const expected = [
  { user: 8, duration: 50, equipment: ["study"] },
  {
    user: 7,
    duration: 450,
    equipment: ["biking", "coding", "gyming", "running"],
  },
  { user: 1, duration: 10, equipment: ["eating"] },
  { user: 2, duration: 400, equipment: ["biking", "cocking"] },
];

// ── Approach 1 ───────────────────────────────────────────────────────────────

const r1 = processRecords(activities);

test("A1 TC1: full output matches expected", r1, expected);
test(
  "A1 TC2: user 7 duration summed (450)",
  r1.find((e) => e.user === 7)?.duration,
  450,
);
test(
  "A1 TC3: user 7 equipment deduped and sorted",
  r1.find((e) => e.user === 7)?.equipment,
  ["biking", "coding", "gyming", "running"],
);
test(
  "A1 TC4: user 2 duration summed (400)",
  r1.find((e) => e.user === 2)?.duration,
  400,
);
test(
  "A1 TC5: user 2 equipment deduped and sorted",
  r1.find((e) => e.user === 2)?.equipment,
  ["biking", "cocking"],
);
test(
  "A1 TC6: user 1 duplicate equipment deduped",
  r1.find((e) => e.user === 1)?.equipment,
  ["eating"],
);
test(
  "A1 TC7: user 7 intra-record duplicate deduped (running)",
  r1.find((e) => e.user === 7)?.equipment.filter((e) => e === "running").length,
  1,
);
test("A1 TC8: correct number of grouped users (4)", r1.length, 4);

// ── Approach 2 ───────────────────────────────────────────────────────────────

// ── Edge cases ────────────────────────────────────────────────────────────────

test("EDGE TC1: empty array returns empty array", processRecords([]), []);

test(
  "EDGE TC2: single record returned as-is (with deduped equipment)",
  processRecords([{ user: 1, duration: 10, equipment: ["a", "a", "b"] }]),
  [{ user: 1, duration: 10, equipment: ["a", "b"] }],
);

test(
  "EDGE TC3: no duplicates — equipment still sorted",
  processRecords([{ user: 1, duration: 5, equipment: ["z", "a", "m"] }]),
  [{ user: 1, duration: 5, equipment: ["a", "m", "z"] }],
);

console.log("\nAll tests done");
