// Reverse an array

function reverseArray(arr) {
  if (arr.length == 0) {
    return [];
  }
  return [arr.pop()].concat(reverseArray(arr));
}

// Sample test cases
function testReverseArray() {
  let tests = [
    { arr: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] }, // standard odd-length
    { arr: [1, 2, 3, 4], expected: [4, 3, 2, 1] }, // even-length
    { arr: [1, 2], expected: [2, 1] }, // two elements
    { arr: [7], expected: [7] }, // single element
    { arr: [], expected: [] }, // empty array
    { arr: [-1, 0, 1], expected: [1, 0, -1] }, // negative numbers
    { arr: [5, 5, 5], expected: [5, 5, 5] }, // all same elements
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    let result = reverseArray(input);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `reverseArray([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testReverseArray();

module.exports = { reverseArray };
