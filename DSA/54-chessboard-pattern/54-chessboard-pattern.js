// Print the chess board pattern

function chessboard(row, column) {
  let ans = "";
  for (let i = 0; i < row; i++) {
    ans = "";
    for (let j = 0; j < column; j++) {
      if ((i + j) % 2 == 0) {
        ans += " ";
      } else {
        ans += "#";
      }
    }

    console.log(ans);
  }
}

// Sample test cases
function testChessboard() {
  let tests = [
    {
      row: 3,
      column: 5,
      expected: [" # # ", "# # #", " # # "],
    },
    {
      row: 8,
      column: 8,
      expected: [
        " # # # #",
        "# # # # ",
        " # # # #",
        "# # # # ",
        " # # # #",
        "# # # # ",
        " # # # #",
        "# # # # ",
      ],
    },
    {
      row: 1,
      column: 1,
      expected: [" "],
    },
    {
      row: 2,
      column: 4,
      expected: [" # #", "# # "],
    },
    {
      row: 2,
      column: 2,
      expected: [" #", "# "],
    },
  ];

  for (let { row, column, expected } of tests) {
    let result = [];
    const originalLog = console.log;
    console.log = (val) => result.push(val);
    chessboard(row, column);
    console.log = originalLog;

    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`chessboard(${row}, ${column}): ${pass ? "Success" : "Fail"}`);
    if (!pass) {
      console.log("  got:     ", result);
      console.log("  expected:", expected);
    }
  }
}
testChessboard();

module.exports = { chessboard };
