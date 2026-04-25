// Print the Pascal Triangle Pattern

function pascalTriangle(rows) {
  for (let i = 0; i < rows; i++) {
    let ans = "";
    let number = 1;
    for (let j = 0; j < rows - i; j++) {
      ans += " ";
    }

    for (let j = 0; j <= i; j++) {
      ans += number + " ";
      number = (number * (i - j)) / (1 + j);
    }
    for (let j = 0; j < rows - i; j++) {
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

function testPascalTriangle() {
  const tests = [
    {
      label: "pascalTriangle(5)",
      rows: 5,
      expected: [
        "     1      ",
        "    1 1     ",
        "   1 2 1    ",
        "  1 3 3 1   ",
        " 1 4 6 4 1  ",
      ],
    },
    {
      label: "pascalTriangle(3)",
      rows: 3,
      expected: ["   1    ", "  1 1   ", " 1 2 1  "],
    },
    {
      label: "pascalTriangle(1)",
      rows: 1,
      expected: [" 1  "],
    },
    {
      label: "pascalTriangle(4)",
      rows: 4,
      expected: ["    1     ", "   1 1    ", "  1 2 1   ", " 1 3 3 1  "],
    },
  ];

  for (let { label, rows, expected } of tests) {
    let result = capture(pascalTriangle, rows);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${label}: ${pass ? "Success" : "Fail"}`);
    if (!pass) {
      console.log("  got:     ", result);
      console.log("  expected:", expected);
    }
  }
}
testPascalTriangle();

module.exports = { pascalTriangle };
