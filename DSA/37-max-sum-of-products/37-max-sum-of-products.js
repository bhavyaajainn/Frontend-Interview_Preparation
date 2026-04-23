// Find the maximum sum of products of two arrays

function productSum(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += arr1[i] * arr2[i];
  }
  return sum;
}

// Sample test cases
function testProductSum() {
  let tests = [
    { arr1: [1, 2, 3], arr2: [5, 4, 3], expected: 26 },
    { arr1: [4, 7, 5, 2], arr2: [2, 3, 2, 1], expected: 41 },
    { arr1: [1, 1, 1], arr2: [1, 1, 1], expected: 3 },
    { arr1: [10, 2], arr2: [5, 1], expected: 52 },
    { arr1: [3], arr2: [7], expected: 21 },
  ];

  for (let { arr1, arr2, expected } of tests) {
    let result = productSum([...arr1], [...arr2]);
    let pass = result === expected;
    console.log(
      `productSum: arr1=[${arr1}], arr2=[${arr2}]: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testProductSum();

module.exports = { productSum };
