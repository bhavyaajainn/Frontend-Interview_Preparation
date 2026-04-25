// Print the Floyd Triangle

function floydTriangle(rows) {
  let ans = "";
  let count = 1;
  for (let i = 1; i <= rows; i++) {
    ans = "";
    for (let j = 1; j <= i; j++) {
      ans += count.toString() + " ";
      count++;
    }
    console.log(ans.trim());
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

function testFloydTriangle() {
  const tests = [
    {
      label: "floydTriangle(5)",
      rows: 5,
      expected: ["1", "2 3", "4 5 6", "7 8 9 10", "11 12 13 14 15"],
    },
    {
      label: "floydTriangle(3)",
      rows: 3,
      expected: ["1", "2 3", "4 5 6"],
    },
    {
      label: "floydTriangle(1)",
      rows: 1,
      expected: ["1"],
    },
    {
      label: "floydTriangle(4)",
      rows: 4,
      expected: ["1", "2 3", "4 5 6", "7 8 9 10"],
    },
    {
      label: "floydTriangle(2)",
      rows: 2,
      expected: ["1", "2 3"],
    },
  ];

  for (let { label, rows, expected } of tests) {
    let result = capture(floydTriangle, rows);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${label}: ${pass ? "Success" : "Fail"}`);
    if (!pass) {
      console.log("  got:     ", result);
      console.log("  expected:", expected);
    }
  }
}
testFloydTriangle();

module.exports = { floydTriangle };
