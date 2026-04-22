// Find the largest prime factor
function largestPrimeFactor(num) {
  let i = 2;
  while (i * i < num) {
    while (num % i === 0) {
      num = num / i;
    }
    i++;
  }
  return num;
}

// Sample test cases
function testLargestPrimeFactor() {
  let tests = [
    { num: 600851475143, expected: 6857 },
    { num: 151, expected: 151 },
    { num: 256987513645261, expected: 36712501949323 },
    { num: 231412151232312, expected: 9642172968013 },
  ];
  for (let { num, expected } of tests) {
    let result = largestPrimeFactor(num);
    let pass = result === expected;
    console.log(`Test num=${num}: ${pass ? "Success" : "Fail"}`);
  }
}
testLargestPrimeFactor();

module.exports = largestPrimeFactor;
