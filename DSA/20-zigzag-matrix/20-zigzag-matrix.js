// Print matrix in zigzag format
function zigzagMatrix(arr) {
  const rows = arr.length;
  const cols = arr[0]?.length || 0;

  let flag = true;
  for (let i = 0; i < rows; i++) {
    if (flag == true) {
      for (let j = 0; j < cols; j++) {
        console.log(arr[i][j]);
      }
      flag = false;
    } else {
      for (let j = cols - 1; j >= 0; j--) {
        console.log(arr[i][j]);
      }
      flag = true;
    }
  }
}

//Sample test cases
function testZigzagMatrix() {
  let tests = [
    {
      arr: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 0, 1, 2],
      ],
      expected: [1, 2, 3, 4, 8, 7, 6, 5, 9, 0, 1, 2],
    },
    {
      arr: [
        [1, 2],
        [3, 4],
      ],
      expected: [1, 2, 4, 3],
    },
    {
      arr: [[5], [6]],
      expected: [5, 6],
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
    zigzagMatrix(arr);
    console.log = originalLog;
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `Test arr=${JSON.stringify(arr)}: ${pass ? "Success" : "Fail"}`,
    );
  }
}
testZigzagMatrix();

module.exports = zigzagMatrix;
