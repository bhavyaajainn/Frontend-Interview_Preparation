// Convert Roman numeral to an integer
function romanToInteger(roman) {
  let arr = ["I", "V", "X", "L", "C", "D", "M"];
  let values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let sum = 0;
  let prevIndex = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    if (arr.indexOf(roman[i]) >= prevIndex) {
      sum = sum + values[roman[i]];
    } else {
      sum = sum - values[roman[i]];
    }
    prevIndex = arr.indexOf(roman[i]);
  }
  return sum;
}

// Sample test cases
function testRomanToInteger() {
  let tests = [
    { roman: "IV", expected: 4 },
    { roman: "XXIX", expected: 29 },
    { roman: "XVII", expected: 17 },
    { roman: "I", expected: 1 },
    { roman: "VI", expected: 6 },
    { roman: "XVI", expected: 16 },
    { roman: "XIV", expected: 14 },
  ];
  for (let { roman, expected } of tests) {
    let result = romanToInteger(roman);
    let pass = result === expected;
    console.log(`Test roman='${roman}': ${pass ? "Success" : "Fail"}`);
  }
}
testRomanToInteger();

module.exports = romanToInteger;
