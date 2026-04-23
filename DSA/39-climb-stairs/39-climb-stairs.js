// Find distinct ways to climb the stairs

// Recursive (naive) - O(2^n)
function climbStairsRecursive(n, count = 0) {
  if (count > n) {
    return 0;
  }
  if (count == n) {
    return 1;
  }
  return (
    climbStairsRecursive(n, count + 1) + climbStairsRecursive(n, count + 2)
  );
}

// Recursive + Memoization (DP) - O(n)
function climbStairsMemo(n, count = 0, memo = []) {
  if (count > n) {
    return 0;
  }
  if (count == n) {
    return 1;
  }
  if (memo[count] > 0) {
    return memo[count];
  }
  memo[count] =
    climbStairsMemo(n, count + 1, memo) + climbStairsMemo(n, count + 2, memo);
  return memo[count];
}

// Sample test cases
function testClimbStairs() {
  let tests = [
    { n: 2, expected: 2 },
    { n: 3, expected: 3 },
    { n: 5, expected: 8 },
    { n: 1, expected: 1 },
    { n: 6, expected: 13 },
    { n: 10, expected: 89 },
  ];

  for (let { n, expected } of tests) {
    let r1 = climbStairsRecursive(n);
    console.log(
      `recursive: n=${n}: ${r1 === expected ? "Success" : "Fail"} (got ${r1}, expected ${expected})`,
    );

    let r2 = climbStairsMemo(n);
    console.log(
      `memo:      n=${n}: ${r2 === expected ? "Success" : "Fail"} (got ${r2}, expected ${expected})`,
    );
  }
}
testClimbStairs();

module.exports = { climbStairsRecursive, climbStairsMemo };
