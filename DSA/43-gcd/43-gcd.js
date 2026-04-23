// Program to find the GCD of two numbers

// Iterative approach (subtraction-based Euclidean)
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

// Recursive approach (modulo-based Euclidean)
function gcdRecursive(num1, num2) {
  if (num1 == num2) {
    return num1;
  }
  if (num1 > num2) {
    return gcdRecursive(num1 - num2, num2);
  } else {
    return gcdRecursive(num1, num2 - num1);
  }
}

// Sample test cases
function testGcd() {
  let tests = [
    { num1: 60, num2: 15, expected: 15 },
    { num1: 36, num2: 60, expected: 12 },
    { num1: 7, num2: 5, expected: 1 },
    { num1: 100, num2: 100, expected: 100 },
    { num1: 48, num2: 18, expected: 6 },
    { num1: 1, num2: 999, expected: 1 },
  ];

  for (let { num1, num2, expected } of tests) {
    let r1 = gcdIterative(num1, num2);
    console.log(
      `iterative: gcd(${num1}, ${num2}): ${r1 === expected ? "Success" : "Fail"} (got ${r1}, expected ${expected})`,
    );

    let r2 = gcdRecursive(num1, num2);
    console.log(
      `recursive: gcd(${num1}, ${num2}): ${r2 === expected ? "Success" : "Fail"} (got ${r2}, expected ${expected})`,
    );
  }
}
testGcd();

module.exports = { gcdIterative, gcdRecursive };
