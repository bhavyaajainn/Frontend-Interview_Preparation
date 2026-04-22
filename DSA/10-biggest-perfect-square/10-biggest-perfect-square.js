// Find the biggest perfect square in an array
function perfectSquare(arr) {
  arr.sort((a, b) => b - a);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0 && Math.sqrt(arr[i]) % 1 == 0) {
      return arr[i];
    }
  }
  return -1;
}

// Example usage:
console.log(perfectSquare([1, 10, 19, 27, 25, 23])); // 25
console.log(perfectSquare([7, 33, 55, 26, 18])); // -1
console.log(perfectSquare([17, 20, 27, 2, 3, 10])); // -1
console.log(perfectSquare([16, 20, 25, 2, 3, 10])); // 25

// Sample test cases
function testPerfectSquare() {
  let tests = [
    { arr: [1, 10, 19, 27, 25, 23], expected: 25 },
    { arr: [7, 33, 55, 26, 18], expected: -1 },
    { arr: [17, 20, 27, 2, 3, 10], expected: -1 },
    { arr: [16, 20, 25, 2, 3, 10], expected: 25 },
  ];
  for (let { arr, expected } of tests) {
    let result = perfectSquare(arr);
    let pass = result === expected;
    console.log(`Test arr=[${arr}]: ${pass ? "Success" : "Fail"}`);
  }
}
testPerfectSquare();

module.exports = perfectSquare;
