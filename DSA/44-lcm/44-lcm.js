// Find the LCM of two numbers
function gcdIterative(num1, num2) {
  while (num1 != num2) {
    if (num1 > num2) {
      num1 = num1 - num2;
    } else {
      num2 = num2 - num1;
    }
  }
  return num2;
}
// Using GCD: LCM(a, b) = (a * b) / GCD(a, b)
function lcmWithGcd(n1, n2) {
  let gcd = gcdIterative(n1, n2);
  return (n1 * n2) / gcd;
}

// Without GCD: repeated addition of the larger number
function lcmWithoutGcd(n1, n2) {
  const largest = Math.max(n1, n2);
  const smallest = Math.min(n1, n2);
  let temp = largest;
  while (temp % smallest != 0) {
    temp += largest;
  }
  return temp;
}

// Sample test cases
function testLcm() {
  let tests = [
    { n1: 15, n2: 20, expected: 60 },
    { n1: 5, n2: 7, expected: 35 },
    { n1: 4, n2: 6, expected: 12 },
    { n1: 12, n2: 12, expected: 12 },
    { n1: 1, n2: 100, expected: 100 },
    { n1: 21, n2: 6, expected: 42 },
  ];

  for (let { n1, n2, expected } of tests) {
    let r1 = lcmWithGcd(n1, n2);
    console.log(
      `withGcd:    lcm(${n1}, ${n2}): ${r1 === expected ? "Success" : "Fail"} (got ${r1}, expected ${expected})`,
    );

    let r2 = lcmWithoutGcd(n1, n2);
    console.log(
      `withoutGcd: lcm(${n1}, ${n2}): ${r2 === expected ? "Success" : "Fail"} (got ${r2}, expected ${expected})`,
    );
  }
}
testLcm();

module.exports = { lcmWithGcd, lcmWithoutGcd };
