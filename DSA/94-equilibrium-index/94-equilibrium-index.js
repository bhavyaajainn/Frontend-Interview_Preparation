// Find an Element Where Sum of Left Array Equals Sum of Right Array

// Method 1: Brute Force — O(n²) time, O(1) space
function solution1(arr, n = arr.length) {
  // Write your solution here
  // If arr.length === 1, return arr[0]
  // Outer loop i from 1 to n-1:
  //   leftSum = sum of arr[0..i-1]
  //   rightSum = sum of arr[i+1..n-1]
  //   if leftSum === rightSum → return arr[i]
  // return -1
}

// Method 2: Prefix + Suffix Arrays — O(n) time, O(n) space
function solution2(arr, n = arr.length) {
  // Write your solution here
  // Build prefixSum[i] = sum of arr[0..i]
  // Build suffixSum[i] = sum of arr[i..n-1]
  // For each i: if prefixSum[i-1] === suffixSum[i+1] → return arr[i]
  // (treat out-of-bounds as 0)
  // return -1
}

// Method 3: Running Sum — O(n) time, O(1) space (best)
function solution3(arr, n = arr.length) {
  // Write your solution here
  // If arr.length === 1, return arr[0]
  // rightSum = sum of arr[1..n-1], leftSum = 0
  // Loop i from 0, j from 1 while j < n:
  //   rightSum -= arr[j]
  //   leftSum  += arr[i]
  //   if rightSum === leftSum → return arr[i + 1]
  // return -1
}

// Sample test cases
function testEquilibrium() {
  const tests = [
    { input: [2, 1, 9, 3],       expected: 9,  label: 'general case' },
    { input: [1, 2, 3],           expected: -1, label: 'no equilibrium' },
    { input: [2, 3, 4, 1, 4, 5], expected: 1,  label: 'equilibrium in middle' },
    { input: [7],                 expected: 7,  label: 'single element' },
    { input: [2, 7, 3, 5, 2, 2], expected: 3,  label: 'equilibrium at index 2' },
    { input: [2, 3, 4, 1, 4],    expected: 4,  label: 'equilibrium near end' },
  ];

  const methods = [
    { fn: solution1, name: 'Brute Force' },
    { fn: solution2, name: 'Prefix + Suffix' },
    { fn: solution3, name: 'Running Sum' },
  ];

  for (let { fn, name } of methods) {
    console.log(`\n--- ${name} ---`);
    for (let { input, expected, label } of tests) {
      const result = fn([...input]);
      const pass = result === expected;
      console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`);
    }
  }
}
testEquilibrium();

module.exports = { solution1, solution2, solution3 };
