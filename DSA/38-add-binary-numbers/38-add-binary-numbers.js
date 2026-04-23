// Program to add two binary numbers

function addBinary(a, b) {
  let ans = "";
  let sum = 0;
  let carry = 0;
  let aSize = a.length - 1;
  let bSize = b.length - 1;
  while (aSize >= 0 || bSize >= 0) {
    let tempa = a[aSize] || 0;
    let tempb = b[bSize] || 0;
    sum = carry + Number(tempa) + Number(tempb);
    if (sum > 1) {
      sum = sum % 2;
      carry = 1;
    } else {
      carry = 0;
    }
    ans = sum + ans;
    aSize--;
    bSize--;
  }
  if (carry) {
    ans = carry + ans;
  }
  return ans;
}

// Sample test cases
function testAddBinary() {
  let tests = [
    { a: "1010", b: "1011", expected: "10101" },
    { a: "1", b: "1", expected: "10" },
    { a: "111", b: "1", expected: "1000" },
    { a: "1101", b: "101", expected: "10010" },
    { a: "0", b: "0", expected: "0" },
    { a: "1111", b: "1111", expected: "11110" },
  ];

  for (let { a, b, expected } of tests) {
    let result = addBinary(a, b);
    let pass = result === expected;
    console.log(
      `addBinary: a="${a}", b="${b}": ${pass ? "Success" : "Fail"} (got "${result}", expected "${expected}")`,
    );
  }
}
testAddBinary();

module.exports = { addBinary };
