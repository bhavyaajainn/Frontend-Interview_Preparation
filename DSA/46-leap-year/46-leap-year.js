// Leap Year

function isLeapYear(year) {
  if (year % 400 == 0) {
    return true;
  }
  if (year % 4 == 0 && year % 100 !== 0) {
    return true;
  }
  return false;
}

// Sample test cases
function testIsLeapYear() {
  let tests = [
    { year: 2000, expected: true }, // divisible by 400
    { year: 1900, expected: false }, // divisible by 100 but not 400
    { year: 2020, expected: true }, // divisible by 4, not by 100
    { year: 2019, expected: false }, // not divisible by 4
    { year: 1888, expected: true }, // divisible by 4, not by 100
    { year: 1885, expected: false }, // not divisible by 4
    { year: 400, expected: true }, // exactly divisible by 400
    { year: 100, expected: false }, // divisible by 100 but not 400
    { year: 1, expected: false }, // not divisible by 4
  ];

  for (let { year, expected } of tests) {
    let result = isLeapYear(year);
    let pass = result === expected;
    console.log(
      `isLeapYear(${year}): ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testIsLeapYear();

module.exports = { isLeapYear };
