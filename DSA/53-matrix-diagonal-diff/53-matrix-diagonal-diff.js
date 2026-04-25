// Absolute difference between diagonals of a matrix

function matrixDiff(arr) {
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = arr.length - 1;

  for (let i = 0; i < arr[0].length; i++) {
    left += arr[top++][i];
    right += arr[bottom--][i];
  }
  return Math.abs(left - right);
}

// Sample test cases
function testMatrixDiff() {
  let tests = [
    {
      arr: [
        [1, 2, 2],
        [4, 25, 6],
        [7, 8, 9],
      ],
      expected: 1,
    },
    {
      arr: [
        [1, 2],
        [3, 4],
      ],
      expected: 0, // primary: 1+4=5, secondary: 2+3=5
    },
    {
      arr: [[5]],
      expected: 0, // single element — same diagonal
    },
    {
      arr: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
      expected: 0, // 4x4 — primary: 1+6+11+16=34, secondary: 4+7+10+13=34
    },
    {
      arr: [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 5],
      ],
      expected: 6, // primary: 1+0+5=6, secondary: 0+0+0=0
    },
    {
      arr: [
        [-1, 2],
        [3, -4],
      ],
      expected: 10, // primary: -1+(-4)=-5, secondary: 2+3=5, |-5-5|=10
    },
  ];

  for (let { arr, expected } of tests) {
    let result = matrixDiff(arr);
    let pass = result === expected;
    console.log(
      `matrixDiff: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testMatrixDiff();

module.exports = { matrixDiff };
