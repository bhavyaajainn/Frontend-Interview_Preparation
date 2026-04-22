// Form the smallest possible number from the given number
function smallestPossibleNumber(num) {
  let arr = num.split("").map(Number);
  arr.sort((a, b) => a - b);
  // console.log("check", arr);
  let temp = 0;
  let i = 0;
  if (arr[i] == 0) {
    while (arr[i] == 0) {
      i++;
    }
    // console.log("check", i);
    temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
  }
  // console.log("check", arr.join(""));
  return arr.join("");
}

// Sample test cases
function testSmallestPossibleNumber() {
  let tests = [
    { num: "55010", expected: "10055" },
    { num: "7652634", expected: "2345667" },
    { num: "000001", expected: "100000" },
    { num: "000000", expected: "000000" },
  ];
  for (let { num, expected } of tests) {
    let result = smallestPossibleNumber(num);
    let pass = result === expected;
    console.log(`Test num='${num}': ${pass ? "Success" : "Fail"}`);
  }
}
testSmallestPossibleNumber();

module.exports = smallestPossibleNumber;
