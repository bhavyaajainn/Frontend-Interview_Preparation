// Find the correct position to insert an element in the array

// Linear scan O(n)
function searchInsertLinear(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == target || nums[i] > target) {
      return i;
    }
  }
  return nums.length;
}

// Binary search O(log n)
function searchInsertBinary(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// Sample test cases
function testSearchInsert() {
  let tests = [
    { nums: [1, 3, 5, 6], target: 5, expected: 2 },
    { nums: [1, 3, 5, 6], target: 2, expected: 1 },
    { nums: [1, 3, 5, 6], target: 7, expected: 4 },
    { nums: [1, 3, 5, 6], target: 0, expected: 0 },
    { nums: [1], target: 0, expected: 0 },
    { nums: [1], target: 2, expected: 1 },
  ];

  for (let { nums, target, expected } of tests) {
    let r1 = searchInsertLinear(nums, target);
    console.log(
      `linear: nums=[${nums}], target=${target}: ${r1 === expected ? "Success" : "Fail"} (got ${r1}, expected ${expected})`,
    );

    let r2 = searchInsertBinary(nums, target);
    console.log(
      `binary: nums=[${nums}], target=${target}: ${r2 === expected ? "Success" : "Fail"} (got ${r2}, expected ${expected})`,
    );
  }
}
testSearchInsert();

module.exports = { searchInsertLinear, searchInsertBinary };
