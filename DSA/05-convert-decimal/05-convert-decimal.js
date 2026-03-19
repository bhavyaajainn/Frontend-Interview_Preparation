// Convert Decimal to Binary, Octal or Hexadecimal
function convertDecimal(n, b) {
  const digits = "0123456789ABCDEF";
  let rem = 0;
  ans = "";
  let stack = [];
  while (n > 0) {
    rem = Math.floor(n % b);
    stack.push(rem);
    n = Math.floor(n / b);
  }
  while (stack.length != 0) {
    ans += digits[stack.pop()];
  }
  return ans;
}

// Sample test cases
function testConvertDecimal() {
  let tests = [
    { n: 1021313, b: 2, expected: "11111001010110000001" },
    { n: 1021313, b: 8, expected: "3712601" },
    { n: 1021313, b: 16, expected: "F9581" },
    { n: 255, b: 16, expected: "FF" },
    { n: 10, b: 2, expected: "1010" },
  ];
  for (let { n, b, expected } of tests) {
    let result = convertDecimal(n, b);
    let pass = result === expected;
    console.log(`Test n=${n}, b=${b}: ${pass ? "Success" : "Fail"}`);
  }
}
testConvertDecimal();

module.exports = convertDecimal;
