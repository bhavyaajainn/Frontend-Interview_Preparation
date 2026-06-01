// Convert Time in 24 Hours Format
//
// formatTime(time) — converts a 12-hour time string to 24-hour format.
//   Input:  "12:10AM", "3:05PM", "12:33PM"
//   Output: "00:10",   "15:05",  "12:33"
//
// Rules:
//   12:xxAM → 00:xx  (midnight hour)
//   h:xxAM  → h:xx   (1–11 AM unchanged)
//   12:xxPM → 12:xx  (noon, unchanged)
//   h:xxPM  → h+12   (1–11 PM)
//
// Output always zero-pads hours and minutes to 2 digits.

const formatTime = (time) => {
  // TODO: lowercase the input
  // TODO: split on ":" to get hours and mins (mins still has "am"/"pm" suffix)
  // TODO: if ends with "am":
  //         hours = (hours == 12) ? "0" : hours
  // TODO: if ends with "pm":
  //         hours = (hours == 12) ? hours : String(+hours + 12)
  // TODO: return `${hours.padStart(2, '0')}:${mins.slice(0, -2).padStart(2, '0')}`
  const timeToLowerCased = time.toLowerCase();
  let [hours, mins] = timeToLowerCased.split(":");
  if (timeToLowerCased.endsWith("am")) {
    hours = hours == 12 ? "0" : hours;
  } else if (timeToLowerCased.endsWith("pm")) {
    hours = hours == 12 ? hours : String(+hours + 12);
  }
  return `${hours.padStart(2, 0)}:${mins.slice(0, -2).padStart(2, 0)}`;
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

// ── AM cases ──────────────────────────────────────────────────────────────────

test("TC1:  12:10AM → 00:10 (midnight hour)", formatTime("12:10AM"), "00:10");
test("TC2:  12:00AM → 00:00 (midnight)", formatTime("12:00AM"), "00:00");
test("TC3:   1:05AM → 01:05", formatTime("1:05AM"), "01:05");
test("TC4:   9:30AM → 09:30", formatTime("9:30AM"), "09:30");
test("TC5:  11:59AM → 11:59", formatTime("11:59AM"), "11:59");

// ── PM cases ──────────────────────────────────────────────────────────────────

test("TC6:  12:33PM → 12:33 (noon hour)", formatTime("12:33PM"), "12:33");
test("TC7:  12:00PM → 12:00 (noon)", formatTime("12:00PM"), "12:00");
test("TC8:   1:00PM → 13:00", formatTime("1:00PM"), "13:00");
test("TC9:   3:05PM → 15:05", formatTime("3:05PM"), "15:05");
test("TC10: 11:59PM → 23:59", formatTime("11:59PM"), "23:59");

// ── Padding ───────────────────────────────────────────────────────────────────

test(
  "TC11:  1:01AM → 01:01 (zero-pad hours and mins)",
  formatTime("1:01AM"),
  "01:01",
);
test("TC12:  2:09PM → 14:09 (zero-pad mins)", formatTime("2:09PM"), "14:09");

// ── Case insensitivity ────────────────────────────────────────────────────────

test("TC13: lowercase am — 9:15am → 09:15", formatTime("9:15am"), "09:15");
test("TC14: lowercase pm — 6:45pm → 18:45", formatTime("6:45pm"), "18:45");

console.log("\nAll tests done");
