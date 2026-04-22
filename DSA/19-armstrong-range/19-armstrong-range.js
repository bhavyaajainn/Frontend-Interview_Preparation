// Find all the Armstrong numbers between two numbers and return them

function isArmstrong(num) {
  let temp = num;
  let digits = num.toString().length;
  let sum = 0;

  while (temp > 0) {
    let rem = temp % 10;
    sum += Math.pow(rem, digits);
    temp = Math.floor(temp / 10);
  }

  return sum === num;
}

function printArmstrong(start, end) {
  let ans = [];

  for (let i = start; i < end; i++) {
    if (isArmstrong(i)) {
      ans.push(i);
    }
  }

  return ans;
}

// Sample test cases
function testPrintArmstrong() {
  let tests = [
    { start: 100, end: 200, expected: [153] },
    { start: 100, end: 400, expected: [153, 370, 371] },
    { start: 0, end: 100, expected: [0, 1] },
    { start: 300, end: 700, expected: [370, 371, 407] },
  ];

  for (let { start, end, expected } of tests) {
    let result = printArmstrong(start, end);

    let pass = JSON.stringify(result) === JSON.stringify(expected);

    console.log(
      `Test start=${start}, end=${end}: ${pass ? "Success" : "Fail"}`,
    );

    if (!pass) {
      console.log("Expected:", expected);
      console.log("Got     :", result);
    }
  }
}

testPrintArmstrong();

module.exports = printArmstrong;
