// Program to check if the given number is prime or not
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

// Sample test cases
function testIsPrime() {
  let tests = [
    { n: 1, expected: false },
    { n: 2, expected: true },
    { n: 3, expected: true },
    { n: 4, expected: false },
    { n: 31, expected: true },
    { n: 37, expected: true },
    { n: 100, expected: false },
    { n: 97, expected: true },
  ];
  for (let { n, expected } of tests) {
    let result = isPrime(n);
    let pass = result === expected;
    console.log(`isPrime: Test n=${n}: ${pass ? "Success" : "Fail"}`);
  }
}
testIsPrime();

module.exports = { isPrime };
