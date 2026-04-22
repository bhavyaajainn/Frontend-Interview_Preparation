// Buggy Calculator: Sum of two numbers without carrying

function reverseNum(num) {
  let val = 0;
  while (num !== 0) {
    let rem = num % 10;
    val = val * 10 + rem;
    num = Math.trunc(num / 10);
  }
  return val;
}
function buggyCalculator(n1, n2) {
  let max = n1 > n2 ? n1 : n2;
  let sum = "";
  while (parseInt(max) > 0) {
    let num1 = n1 % 10;
    let num2 = n2 % 10;
    let total = num1 + num2;
    let digit = total > 9 ? total % 10 : total;
    sum = digit.toString() + sum;
    n1 = parseInt(n1 / 10);
    n2 = parseInt(n2 / 10);
    max = max / 10;
  }
  return Number(sum);
}

// Sample test cases
function testBuggyCalculator() {
  let tests = [
    { n1: 12, n2: 9, expected: 11 },
    { n1: 25, n2: 25, expected: 40 },
    { n1: 11, n2: 9, expected: 10 },
    { n1: 793, n2: 5142314, expected: 5142007 },
  ];
  for (let { n1, n2, expected } of tests) {
    let result = buggyCalculator(n1, n2);
    let pass = result === expected;
    console.log(`Test n1=${n1}, n2=${n2}: ${pass ? "Success" : "Fail"}`);
  }
}
testBuggyCalculator();

module.exports = buggyCalculator;
