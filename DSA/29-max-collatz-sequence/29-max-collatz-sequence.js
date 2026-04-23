// Maximum Collatz sequence under 1,000,000
function maxCollatzSequence(limit) {
  let dict = {};
  let max = 0;
  let index = 0;
  for (j = 1; j <= limit; j++) {
    let i = j;
    let count = 1;

    while (i > 1) {
      if (!dict[i]) {
        i = i % 2 == 0 ? parseInt(i / 2) : parseInt(3 * i + 1);
        count++;
      } else {
        count = count + dict[i] - 1;
        break;
      }
    }
    dict[j] = count;
    if (max < count) {
      max = count;
      index = j;
    }
  }
  return index;
}

// Sample test cases
function testMaxCollatzSequence() {
  let tests = [
    { limit: 10, expected: 9 },
    { limit: 20, expected: 18 },
    { limit: 100, expected: 97 },
    { limit: 1000, expected: 871 },
    { limit: 1000000, expected: 837799 },
  ];

  for (let { limit, expected } of tests) {
    let result = maxCollatzSequence(limit);
    let pass = result === expected;
    console.log(
      `maxCollatzSequence: limit=${limit}: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testMaxCollatzSequence();

module.exports = { maxCollatzSequence };
