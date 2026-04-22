// Check if given number is Armstrong number in Javascript
function isArmstrong(num) {
  let summ = 0;
  let rem = 0;
  let temp = num;
  while (num > 0) {
    rem = parseInt(num % 10);
    summ = summ + rem * rem * rem;
    num = parseInt(num / 10);
  }
  return summ == temp;
}

// Sample test cases
function testIsArmstrong() {
  let tests = [
    { num: 407, expected: true },
    { num: 370, expected: true },
    { num: 371, expected: true },
    { num: 153, expected: true },
    { num: 154, expected: false },
    { num: 152514214, expected: false },
    { num: 127, expected: false },
  ];
  for (let { num, expected } of tests) {
    let result = isArmstrong(num);
    let pass = result === expected;
    console.log(`Test num=${num}: ${pass ? "Success" : "Fail"}`);
  }
}
testIsArmstrong();

module.exports = isArmstrong;
