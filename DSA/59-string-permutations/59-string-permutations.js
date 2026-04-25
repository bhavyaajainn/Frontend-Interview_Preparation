// Print all permutations of a string

function permute(str, left = 0, right = str.length - 1) {
  if (left == right) {
    console.log(str);
  } else {
    for (let i = left; i <= right; i++) {
      str = swap(str, left, i);
      permute(str, left + 1, right);
      str = swap(str, left, i);
    }
  }
}

let swap = (str, left, right) => {
  let arr = str.split("");
  [arr[left], arr[right]] = [arr[right], arr[left]];
  return arr.join("");
};

// Helper to capture console.log output
function capture(fn, ...args) {
  let result = [];
  const orig = console.log;
  console.log = (val) => result.push(val);
  fn(...args);
  console.log = orig;
  return result;
}

function testPermute() {
  const tests = [
    {
      label: 'permute("A")',
      str: "A",
      expected: ["A"],
    },
    {
      label: 'permute("AB")',
      str: "AB",
      expected: ["AB", "BA"],
    },
    {
      label: 'permute("ABC")',
      str: "ABC",
      expected: ["ABC", "ACB", "BAC", "BCA", "CBA", "CAB"],
    },
    {
      label: 'permute("AB") — count check',
      str: "AB",
      expectedCount: 2, // 2! = 2
    },
    {
      label: 'permute("ABC") — count check',
      str: "ABC",
      expectedCount: 6, // 3! = 6
    },
    {
      label: 'permute("ABCD") — count check',
      str: "ABCD",
      expectedCount: 24, // 4! = 24
    },
  ];

  for (let { label, str, expected, expectedCount } of tests) {
    let result = capture(permute, str);

    if (expectedCount !== undefined) {
      let pass = result.length === expectedCount;
      console.log(
        `${label}: ${pass ? "Success" : "Fail"} (got ${result.length} permutations, expected ${expectedCount})`,
      );
    } else {
      let pass = JSON.stringify(result) === JSON.stringify(expected);
      console.log(`${label}: ${pass ? "Success" : "Fail"}`);
      if (!pass) {
        console.log("  got:     ", result);
        console.log("  expected:", expected);
      }
    }
  }
}
testPermute();

module.exports = { permute };
