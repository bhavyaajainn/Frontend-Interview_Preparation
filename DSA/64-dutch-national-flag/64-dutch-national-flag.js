// Dutch National Flag Problem

function dutchNatFlag(arr) {
  // Write your solution here
}

// Sample test cases
function testDutchNatFlag() {
  let tests = [
    { arr: [2, 0, 1, 0, 2],      expected: [0, 0, 1, 2, 2] },
    { arr: [2, 2, 2, 0, 0, 0, 1, 1], expected: [0, 0, 0, 1, 1, 2, 2, 2] },
    { arr: [0, 1, 2, 0, 1, 2],   expected: [0, 0, 1, 1, 2, 2] },
    { arr: [1],                   expected: [1] },             // single element
    { arr: [0],                   expected: [0] },
    { arr: [2],                   expected: [2] },
    { arr: [0, 0, 0],             expected: [0, 0, 0] },       // all same
    { arr: [2, 1, 0],             expected: [0, 1, 2] },       // reverse sorted
    { arr: [1, 1, 1],             expected: [1, 1, 1] },       // all 1s
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    let result = dutchNatFlag(input);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `dutchNatFlag([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`
    );
  }
}
testDutchNatFlag();

module.exports = { dutchNatFlag };
