// Alternatively Merge Two Different Arrays

// O(n1 + n2) time, O(n1 + n2) space
function alternateMerge(arr1, arr2, n1 = arr1.length, n2 = arr2.length) {
  // Write your solution here
  // Hint: use two pointers i = 0, j = 0, result = []
  // While i < n1 && j < n2: push arr1[i] and arr2[j], advance both
  // Append remaining arr1 elements (while i < n1)
  // Append remaining arr2 elements (while j < n2)
  // Return result
}

// Sample test cases
function testAlternateMerge() {
  const tests = [
    {
      arr1: [1, 2, 3, 4, 5, 6, 7, 8], arr2: [11, 22, 33, 44],
      expected: [1, 11, 2, 22, 3, 33, 4, 44, 5, 6, 7, 8],
      label: 'first array longer'
    },
    {
      arr1: [1, 2],                    arr2: [10, 20, 30, 40],
      expected: [1, 10, 2, 20, 30, 40],
      label: 'second array longer'
    },
    {
      arr1: [1, 3, 5],                 arr2: [2, 4, 6],
      expected: [1, 2, 3, 4, 5, 6],
      label: 'equal length'
    },
    {
      arr1: [1, 2, 3],                 arr2: [],
      expected: [1, 2, 3],
      label: 'second array empty'
    },
    {
      arr1: [],                        arr2: [7, 8, 9],
      expected: [7, 8, 9],
      label: 'first array empty'
    },
    {
      arr1: [],                        arr2: [],
      expected: [],
      label: 'both empty'
    },
  ];

  for (let { arr1, arr2, expected, label } of tests) {
    const result = alternateMerge([...arr1], [...arr2]);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  // Verify originals not mutated
  const a = [1, 2], b = [3, 4];
  alternateMerge(a, b);
  const notMutated = JSON.stringify(a) === '[1,2]' && JSON.stringify(b) === '[3,4]';
  console.log(`Originals not mutated: ${notMutated ? "Pass" : "Fail"}`);
}
testAlternateMerge();

module.exports = { alternateMerge };
