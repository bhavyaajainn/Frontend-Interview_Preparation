// Print all subarrays with a given sum k in an array
function printSubArrays(arr, k) {
  let n = arr.length;
  let ans = [];
  for (let i = 0; i < n; i++) {
    let tempArr = [];
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += arr[j];
      tempArr.push(arr[j]);
      if (sum == k) {
        ans.push([...tempArr]);
      }
    }
  }
  return ans;
}

// Example usage:
// printSubArrays([3, 4, -7, 1, 3, 3, 1, -4], 7);

// Sample test cases
function testPrintSubArrays() {
  let tests = [
    {
      arr: [3, 4, -7, 1, 3, 3, 1, -4],
      k: 7,
      expected: [
        [3, 4],
        [3, 4, -7, 1, 3, 3],
        [1, 3, 3],
        [3, 3, 1],
      ],
    },
    {
      arr: [1, 2, 3, 4, 5],
      k: 5,
      expected: [[2, 3], [5]],
    },
    {
      arr: [1, 1, 1, 1],
      k: 2,
      expected: [
        [1, 1],
        [1, 1],
        [1, 1],
      ],
    },
    {
      arr: [5, -1, 2, 3],
      k: 4,
      expected: [
        [5, -1],
        [-1, 2, 3],
      ],
    },
  ];

  for (let { arr, k, expected } of tests) {
    let result = printSubArrays(arr, k);

    let pass = JSON.stringify(result) === JSON.stringify(expected);

    console.log(
      `Test arr=[${arr}], k=${k}: ${pass ? "Success ✅" : "Fail ❌"}`
    );

    if (!pass) {
      console.log("Expected:", expected);
      console.log("Got     :", result);
    }
  }
}

testPrintSubArrays();

module.exports = printSubArrays;
