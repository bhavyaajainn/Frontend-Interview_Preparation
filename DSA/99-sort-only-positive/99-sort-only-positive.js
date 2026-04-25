// Program to Sort Only Positive Numbers of the Array

// O(n log n) time, O(n) space
function sortOnlyPositive(arr) {
  // Write your solution here
  // Step 1: filter positive numbers → arr.filter(e => e > 0)
  // Step 2: sort filtered array numerically → .sort((a, b) => a - b)
  // Step 3: iterate original array:
  //   if arr[i] > 0 → push next from sorted positives (use pointer j)
  //   else → push arr[i] as-is (negative stays in place)
  // Return new sorted array
}

// Sample test cases
function testSortOnlyPositive() {
  const tests = [
    {
      input: [2, -6, -3, -8, 4, 1],  expected: [1, -6, -3, -8, 2, 4],
      label: 'general case'
    },
    {
      input: [9, -2, 3, -1, 1, 5],   expected: [1, -2, 3, -1, 5, 9],
      label: 'multiple positives'
    },
    {
      input: [-3, -1, -4, -2],        expected: [-3, -1, -4, -2],
      label: 'all negative'
    },
    {
      input: [5, 3, 1, 4, 2],         expected: [1, 2, 3, 4, 5],
      label: 'all positive'
    },
    {
      input: [0, -1, 3, 0, 1],        expected: [0, -1, 1, 0, 3],
      label: 'with zeros (zero stays in place)'
    },
    {
      input: [1],                     expected: [1],
      label: 'single positive'
    },
  ];

  for (let { input, expected, label } of tests) {
    const result = sortOnlyPositive([...input]);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  // Verify original not mutated
  const orig = [2, -1, 3];
  sortOnlyPositive(orig);
  const notMutated = JSON.stringify(orig) === '[2,-1,3]';
  console.log(`Original not mutated: ${notMutated ? "Pass" : "Fail"}`);
}
testSortOnlyPositive();

module.exports = { sortOnlyPositive };
