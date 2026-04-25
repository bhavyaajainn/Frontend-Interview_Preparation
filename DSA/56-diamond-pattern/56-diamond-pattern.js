// Print the diamond pattern

function diamondPattern(rows) {
  let ans = "";
  for (let i = 1; i <= rows; i++) {
    ans = "";
    for (let j = 1; j <= rows - i; j++) {
      ans += " ";
    }
    for (let j = 0; j != 2 * i - 1; j++) {
      ans += "*";
    }
    for (let j = 1; j <= rows - i; j++) {
      ans += " ";
    }
    console.log(ans);
  }
  for (let i = rows - 1; i >= 1; i--) {
    let ans = "";
    for (let k = 1; k <= rows - i; k++) {
      ans += " ";
    }
    for (let j = 0; j != 2 * i - 1; j++) {
      ans += "*";
    }
    for (let k = 1; k <= rows - i; k++) {
      ans += " ";
    }
    console.log(ans);
  }
}

// Helper to capture console.log output
function capture(fn, ...args) {
  let result = [];
  const orig = console.log;
  console.log = (val) => result.push(val);
  fn(...args);
  console.log = orig;
  return result;
}

function testDiamondPattern() {
  const tests = [
    {
      label: "diamondPattern(5)",
      rows: 5,
      expected: [
        "    *    ",
        "   ***   ",
        "  *****  ",
        " ******* ",
        "*********",
        " ******* ",
        "  *****  ",
        "   ***   ",
        "    *    ",
      ],
    },
    {
      label: "diamondPattern(3)",
      rows: 3,
      expected: ["  *  ", " *** ", "*****", " *** ", "  *  "],
    },
    {
      label: "diamondPattern(1)",
      rows: 1,
      expected: ["*"],
    },
    {
      label: "diamondPattern(2)",
      rows: 2,
      expected: [" * ", "***", " * "],
    },
  ];

  for (let { label, rows, expected } of tests) {
    let result = capture(diamondPattern, rows);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${label}: ${pass ? "Success" : "Fail"}`);
    if (!pass) {
      console.log("  got:     ", result);
      console.log("  expected:", expected);
    }
  }
}
testDiamondPattern();

module.exports = { diamondPattern };
