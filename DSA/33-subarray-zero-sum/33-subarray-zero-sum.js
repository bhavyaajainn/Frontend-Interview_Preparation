// Algorithm to check if a subarray with 0 sum exists

// Using Set (prefix sum) O(n)
function subWithZeroSet(arr) {
  let set = new Set();
  set.add(0);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
    if (set.has(sum)) {
      return true;
    }
    set.add(sum);
  }

  return false;
}

// Sample test cases
function testSubWithZero() {
  let tests = [
    { arr: [3, 4, -7, 3, 1, 3, 1, -4, -2, -2], expected: true },
    { arr: [3, 5], expected: false },
    { arr: [0, 1, 2], expected: true },
    { arr: [1, -1, 3, 2], expected: true },
    { arr: [1, 2, 3, 4], expected: false },
    { arr: [-3, 2, 3, 1, 6], expected: false },
  ];

  for (let { arr, expected } of tests) {
    let r2 = subWithZeroSet(arr);
    console.log(
      `set:   arr=[${arr}]: ${r2 === expected ? "Success" : "Fail"} (got ${r2}, expected ${expected})`,
    );
  }
}
testSubWithZero();

module.exports = { subWithZeroSet };
