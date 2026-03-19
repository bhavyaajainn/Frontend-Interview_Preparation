// Swap Two Numbers Without Using a Temporary Variable
function swapNumbers(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
}

// Sample test cases
function testSwapNumbers() {
  let tests = [
    { a: 1, b: 2, expected: [2, 1] },
    { a: 10, b: 15, expected: [15, 10] },
    { a: -5, b: 7, expected: [7, -5] },
    { a: 0, b: 0, expected: [0, 0] },
  ];
  for (let { a, b, expected } of tests) {
    let result = swapNumbers(a, b);
    let pass =
      Array.isArray(result) &&
      result.length === 2 &&
      result[0] === expected[0] &&
      result[1] === expected[1];
    console.log(`Test a=${a}, b=${b}: ${pass ? "Success" : "Fail"}`);
  }
}
testSwapNumbers();

module.exports = swapNumbers;
