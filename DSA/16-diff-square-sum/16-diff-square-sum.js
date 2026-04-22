// Difference between square of sum of numbers and sum of square of numbers
function diff(num) {
  let sum_of_num = (num * (num + 1)) / 2;
  let sum_of_sq_num = (num * (num + 1) * (num * 2 + 1)) / 6;
  let sum_of_num_sq = sum_of_num * sum_of_num;
  return sum_of_num_sq - sum_of_sq_num;
}

// Sample test cases
function testDiff() {
  let tests = [
    { num: 10, expected: 2640 },
    { num: 25, expected: 100100 },
    { num: 97, expected: 22282064 },
  ];
  for (let { num, expected } of tests) {
    let result = diff(num);
    let pass = result === expected;
    console.log(`Test num=${num}: ${pass ? "Success" : "Fail"}`);
  }
}
testDiff();

module.exports = diff;
