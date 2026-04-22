// Print matrix in L pattern
function printMatrixInLShape(
  arr,
  rows = arr.length,
  cols = arr[0]?.length || 0,
) {
  visited_rows = rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < visited_rows; j++) {
      console.log(arr[j][i]);
    }
    for (let k = i + 1; k < cols; k++) {
      console.log(arr[visited_rows - 1][k]);
    }
    visited_rows -= 1;
  }
}

// Sample test cases
function testPrintMatrixInLShape() {
  let tests = [
    {
      arr: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
        [17, 18, 19, 20],
      ],
      expected: [
        1, 5, 9, 13, 17, 18, 19, 20, 2, 6, 10, 14, 15, 16, 3, 7, 11, 12, 4, 8,
      ],
    },
    {
      arr: [
        [1, 2],
        [3, 4],
      ],
      expected: [1, 3, 4, 2],
    },
    {
      arr: [[1], [2], [3]],
      expected: [1, 2, 3],
    },
    {
      arr: [],
      expected: [],
    },
  ];
  for (let { arr, expected } of tests) {
    let result = [];
    // Capture console.log output
    const originalLog = console.log;
    console.log = (val) => result.push(val);
    printMatrixInLShape(arr);
    console.log = originalLog;
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `Test arr=${JSON.stringify(arr)}: ${pass ? "Success" : "Fail"}`,
    );
  }
}
testPrintMatrixInLShape();

module.exports = printMatrixInLShape;
