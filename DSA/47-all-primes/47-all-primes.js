// Print all prime numbers up to N (Sieve of Eratosthenes)

function allPrimes(n) {
  let isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  let primes = [];

  for (let i = 2; i <= n; i++) {
    if (isPrime[i] == true) {
      primes.push(i);
    }
    let next = i * i;
    while (next <= n) {
      isPrime[next] = false;
      next += i;
    }
  }
  return primes;
}

// Sample test cases
function testAllPrimes() {
  let tests = [
    { n: 10, expected: [2, 3, 5, 7] },
    { n: 20, expected: [2, 3, 5, 7, 11, 13, 17, 19] },
    { n: 2, expected: [2] },
    { n: 1, expected: [] },
    {
      n: 50,
      expected: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47],
    },
    {
      n: 100,
      expected: [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
        71, 73, 79, 83, 89, 97,
      ],
    },
  ];

  for (let { n, expected } of tests) {
    let result = allPrimes(n);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `allPrimes(${n}): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testAllPrimes();

module.exports = { allPrimes };
