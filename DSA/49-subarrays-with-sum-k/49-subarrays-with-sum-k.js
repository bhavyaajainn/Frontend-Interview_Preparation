// Number of subarrays with given sum k

function countSubArrays(arr, k) {
  let prevSum = new Map();
  let currSum = 0;
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    currSum += arr[i];
    if (currSum == k) {
      ans++;
    }
    if (prevSum.has(currSum - k)) {
      ans += prevSum.get(currSum - k);
    }
    if (!prevSum.get(currSum)) {
      prevSum.set(currSum, 1);
    } else {
      prevSum.set(currSum, prevSum.get(currSum) + 1);
    }
  }
  return ans;
}

// Sample test cases
function testCountSubArrays() {
  let tests = [
    { arr: [3, 4, -7, 1, 3, 3, 1, -4], k: 7, expected: 4 }, // mixed with negatives
    { arr: [1, 1, 1], k: 2, expected: 2 }, // overlapping subarrays
    { arr: [1, 2, 3], k: 3, expected: 2 }, // [1,2] and [3]
    { arr: [1, -1, 1], k: 0, expected: 2 }, // negatives cancelling
    { arr: [1], k: 1, expected: 1 }, // single element match
    { arr: [1], k: 2, expected: 0 }, // single element no match
    { arr: [0, 0, 0], k: 0, expected: 6 }, // all zeros
    { arr: [-1, -1, 1, 1], k: 0, expected: 2 }, // negative prefix sums
  ];

  for (let { arr, k, expected } of tests) {
    let result = countSubArrays(arr, k);
    let pass = result === expected;
    console.log(
      `countSubArrays([${arr}], ${k}): ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testCountSubArrays();

module.exports = { countSubArrays };
