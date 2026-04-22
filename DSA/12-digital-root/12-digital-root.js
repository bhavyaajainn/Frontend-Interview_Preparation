// Find digital root of a given number
function digitalRoot(n) {
  let sum = 0;
  while (parseInt(n) > 0) {
    let temp = n % 10;
    sum = sum + temp;
    n = parseInt(n / 10);
  }
  if (sum < 10) {
    return sum;
  }
  return digitalRoot(sum);
}

// Sample test cases
function testDigitalRoot() {
  let tests = [
    { n: 257520643, expected: 7 },
    { n: 5674, expected: 4 },
    { n: 493193, expected: 2 },
    { n: 34758, expected: 9 },
  ];
  for (let { n, expected } of tests) {
    let result = digitalRoot(n);
    let pass = result === expected;
    console.log(`Test n=${n}: ${pass ? "Success" : "Fail"}`);
  }
}
testDigitalRoot();

module.exports = digitalRoot;
