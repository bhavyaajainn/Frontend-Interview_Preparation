// Print the pyramid pattern (left, right, complete)

function pyramidLeft(rows) {
  let ans = "";
  for (let i = 1; i <= rows; i++) {
    ans = "";
    for (let j = 1; j <= i; j++) {
      ans += "*";
    }
    console.log(ans);
  }
}

function pyramidRight(rows) {
  let ans = "";
  for (let i = 1; i <= rows; i++) {
    ans = "";
    let j = rows - i;
    for (let k = 1; k <= j; k++) {
      ans += " ";
    }
    for (let k = j + 1; k <= rows; k++) {
      ans += "*";
    }
    console.log(ans);
  }
}

function pyramidComplete(rows) {
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

function testPyramids() {
  const tests = [
    {
      label: "pyramidLeft(5)",
      fn: () => capture(pyramidLeft, 5),
      expected: ["*", "**", "***", "****", "*****"],
    },
    {
      label: "pyramidLeft(1)",
      fn: () => capture(pyramidLeft, 1),
      expected: ["*"],
    },
    {
      label: "pyramidRight(5)",
      fn: () => capture(pyramidRight, 5),
      expected: ["    *", "   **", "  ***", " ****", "*****"],
    },
    {
      label: "pyramidRight(1)",
      fn: () => capture(pyramidRight, 1),
      expected: ["*"],
    },
    {
      label: "pyramidComplete(5)",
      fn: () => capture(pyramidComplete, 5),
      expected: [
        "    *    ",
        "   ***   ",
        "  *****  ",
        " ******* ",
        "*********",
      ],
    },
    {
      label: "pyramidComplete(1)",
      fn: () => capture(pyramidComplete, 1),
      expected: ["*"],
    },
    {
      label: "pyramidComplete(3)",
      fn: () => capture(pyramidComplete, 3),
      expected: ["  *  ", " *** ", "*****"],
    },
  ];

  for (let { label, fn, expected } of tests) {
    let result = fn();
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${label}: ${pass ? "Success" : "Fail"}`);
    if (!pass) {
      console.log("  got:     ", result);
      console.log("  expected:", expected);
    }
  }
}
testPyramids();

module.exports = { pyramidLeft, pyramidRight, pyramidComplete };
