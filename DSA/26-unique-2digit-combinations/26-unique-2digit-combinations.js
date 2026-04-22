// Print all the unique 2 digit combinations of given numbers
function combinations(arr) {
  arr.sort();
  let set = new Set(arr);
  arr = [...set];
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}

// Sample test cases
function testCombinations() {
  let tests = [
    {
      arr: [1, 2, 3],
      expected: [
        [1, 2],
        [1, 3],
        [2, 3],
      ],
    },
    {
      arr: [1, 2, 3, 4, 5],
      expected: [
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 4],
        [2, 5],
        [3, 4],
        [3, 5],
        [4, 5],
      ],
    },
    {
      arr: [2, 2, 2],
      expected: [],
    },
    {
      arr: [5, 4, 3, 2, 1],
      expected: [
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 4],
        [2, 5],
        [3, 4],
        [3, 5],
        [4, 5],
      ],
    },
  ];
  for (let { arr, expected } of tests) {
    let result = [];
    // Capture console.log output
    const originalLog = console.log;
    console.log = (a, b) => result.push([a, b]);
    combinations(arr);
    console.log = originalLog;
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test arr=[${arr}]: ${pass ? "Success" : "Fail"}`);
  }
}
testCombinations();

module.exports = combinations;
